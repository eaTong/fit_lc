import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { exercisesApi, type Exercise } from '../api/exercises';
import Card from '../components/ui/Card';

const EQUIPMENTS: Record<string, string> = {
  barbell: '杠铃',
  dumbbell: '哑铃',
  cable: '绳索',
  machine: '器械',
  bodyweight: '自重',
  kettlebell: '壶铃',
  bands: '弹力带',
  other: '其他',
};

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-600 text-white',
  intermediate: 'bg-yellow-600 text-white',
  advanced: 'bg-red-600 text-white',
};

const EXERCISE_TYPE_LABELS: Record<string, string> = {
  compound: '复合动作',
  isolation: '孤立动作',
};

const VARIANT_TYPE_LABELS: Record<string, string> = {
  equipment: '器械变体',
  difficulty: '难度变体',
  posture: '姿势变体',
};

interface ConversionGuide {
  '变体'?: string;
  '替代动作'?: string;
  '降级选项'?: string;
}

interface ExerciseVariant {
  id: number;
  variantId: number;
  variantType: string | null;
  differenceNotes: string | null;
  variant: { id: number; name: string };
}

interface ExerciseResponse extends Exercise {
  steps: string | null;
  safetyNotes: string | null;
  commonMistakes: string | null;
  exerciseType: string | null;
  variantType: string | null;
  tags: string[] | null;
  variants: ExerciseVariant[];
}

export default function ExerciseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<ExerciseResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    exercisesApi.getById(Number(id))
      .then(({ exercise }) => setExercise(exercise as ExerciseResponse))
      .catch(() => setError('加载失败'))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">加载中...</div>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-accent-red">{error || '动作不存在'}</div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-primary-secondary border-2 border-border text-text-primary hover:border-accent-orange transition-colors"
        >
          返回
        </button>
      </div>
    );
  }

  const primaryMuscles = exercise.muscles?.filter((m) => m.role === 'primary').map((m) => m.muscle.name) || [];
  const secondaryMuscles = exercise.muscles?.filter((m) => m.role === 'secondary').map((m) => m.muscle.name) || [];

  // Parse conversionGuide if it's a string (from JSON storage)
  const parsedGuide = typeof exercise.conversionGuide === 'string'
    ? JSON.parse(exercise.conversionGuide) as ConversionGuide
    : exercise.conversionGuide as ConversionGuide | null;

  const guideEntries = [
    { key: '变体', label: '变体' },
    { key: '替代动作', label: '替代动作' },
    { key: '降级选项', label: '降级选项' },
  ].filter(({ key }) => parsedGuide?.[key as keyof ConversionGuide]);

  return (
    <div className="min-h-screen bg-primary">
      <main className="p-4 max-w-2xl mx-auto">
        {/* Video Section */}
        {exercise.videoUrl && (
          <div className="mb-6">
            <div className="relative aspect-video bg-primary-tertiary rounded overflow-hidden">
              <iframe
                src={exercise.videoUrl.replace('watch?v=', 'embed/')}
                title={exercise.name}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <Card className="mb-4">
          <div className="space-y-4">
            {/* Title and badges */}
            <div className="flex items-start gap-3">
              <h1 className="font-heading text-2xl font-bold flex-1">{exercise.name}</h1>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 text-xs font-semibold rounded ${DIFFICULTY_COLORS[exercise.difficulty] || ''}`}>
                {DIFFICULTY_LABELS[exercise.difficulty] || exercise.difficulty}
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold rounded bg-primary-tertiary text-text-secondary">
                {EQUIPMENTS[exercise.equipment] || exercise.equipment}
              </span>
              {exercise.exerciseType && (
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-primary-tertiary text-text-secondary">
                  {EXERCISE_TYPE_LABELS[exercise.exerciseType] || exercise.exerciseType}
                </span>
              )}
              {exercise.variantType && (
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-primary-tertiary text-text-secondary">
                  {VARIANT_TYPE_LABELS[exercise.variantType] || exercise.variantType}
                </span>
              )}
            </div>

            {/* Tags */}
            {exercise.tags && exercise.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {exercise.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 text-xs rounded bg-primary-tertiary text-text-muted">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Parent/Variant info */}
            {exercise.parent && (
              <div className="text-sm">
                <span className="text-text-muted">母动作：</span>
                <button
                  onClick={() => navigate(`/exercises/${exercise.parent!.id}`)}
                  className="text-accent-orange hover:underline"
                >
                  {exercise.parent.name}
                </button>
              </div>
            )}

            {/* Variants */}
            {exercise.variants && exercise.variants.length > 0 && (
              <div className="text-sm">
                <span className="text-text-muted">变体：</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {exercise.variants.map((v) => (
                    <div key={v.id} className="flex flex-col">
                      <button
                        onClick={() => navigate(`/exercises/${v.variant.id}`)}
                        className="px-2 py-1 text-xs rounded bg-primary-tertiary text-text-secondary hover:text-accent-orange transition-colors"
                      >
                        {v.variant.name}
                      </button>
                      {v.differenceNotes && (
                        <span className="text-xs text-text-muted mt-0.5 px-1">{v.differenceNotes}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Muscles */}
            {primaryMuscles.length > 0 && (
              <div className="text-sm">
                <span className="text-text-muted">主肌肉：</span>
                <span className="text-accent-orange">{primaryMuscles.join(', ')}</span>
              </div>
            )}
            {secondaryMuscles.length > 0 && (
              <div className="text-sm">
                <span className="text-text-muted">辅助肌肉：</span>
                <span className="text-text-secondary">{secondaryMuscles.join(', ')}</span>
              </div>
            )}

            {/* Steps */}
            {exercise.steps && (
              <div className="pt-2 border-t border-border">
                <h3 className="text-accent-orange font-semibold mb-2">动作步骤</h3>
                <p className="text-text-secondary whitespace-pre-line">{exercise.steps}</p>
              </div>
            )}

            {/* Description */}
            {exercise.description && (
              <div className="pt-2 border-t border-border">
                <h3 className="text-accent-orange font-semibold mb-2">动作描述</h3>
                <p className="text-text-secondary whitespace-pre-line">{exercise.description}</p>
              </div>
            )}

            {/* Safety Notes */}
            {exercise.safetyNotes && (
              <div className="pt-2 border-t border-border">
                <h3 className="text-accent-orange font-semibold mb-2">安全注意事项</h3>
                <p className="text-text-secondary whitespace-pre-line">{exercise.safetyNotes}</p>
              </div>
            )}

            {/* Common Mistakes */}
            {exercise.commonMistakes && (
              <div className="pt-2 border-t border-border">
                <h3 className="text-accent-orange font-semibold mb-2">常见错误</h3>
                <p className="text-text-secondary whitespace-pre-line">{exercise.commonMistakes}</p>
              </div>
            )}

            {/* Adjustment Notes */}
            {exercise.adjustmentNotes && (
              <div className="pt-2 border-t border-border">
                <h3 className="text-accent-orange font-semibold mb-2">调整说明</h3>
                <div className="text-text-secondary space-y-1">
                  {exercise.adjustmentNotes.split('\n').map((line, i) => {
                    const colonIndex = line.indexOf('：');
                    if (colonIndex > 0) {
                      const key = line.slice(0, colonIndex);
                      const value = line.slice(colonIndex + 1);
                      return (
                        <div key={i}>
                          <span className="font-bold text-accent-orange">{key}</span>
                          <span>：{value}</span>
                        </div>
                      );
                    }
                    return <p key={i}>{line}</p>;
                  })}
                </div>
              </div>
            )}

            {/* Conversion Guide */}
            {guideEntries.length > 0 && (
              <div className="pt-2 border-t border-border">
                <h3 className="text-accent-orange font-semibold mb-2">动作转换指南</h3>
                <div className="space-y-2">
                  {guideEntries.map(({ key, label }) => (
                    <div key={key} className="text-sm">
                      <span className="text-text-muted">{label}：</span>
                      <span className="text-text-primary">{parsedGuide?.[key as keyof ConversionGuide]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}