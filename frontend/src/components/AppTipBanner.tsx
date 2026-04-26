import { useAppTip } from '../hooks/useAppTip';

export default function AppTipBanner() {
  const { isVisible, tipState, dismiss } = useAppTip();

  if (!isVisible || !tipState.type) {
    return null;
  }

  const getIcon = (): string => {
    switch (tipState.type) {
      case 'suggestion':
        return '💡';
      case 'welcome':
        return '👋';
      default:
        return '📢';
    }
  };

  return (
    <div className="bg-gradient-to-r from-accent-orange/20 to-accent-red/20 border-b border-accent-orange/30">
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">{getIcon()}</span>
          <p className="text-text-primary font-medium">{tipState.content}</p>
        </div>
        <button
          onClick={dismiss}
          className="p-1 text-text-secondary hover:text-text-primary transition-colors"
          aria-label="关闭提示"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
