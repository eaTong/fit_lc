import { describe, it, expect } from '@jest/globals';
import { roleRepository } from '../../../src/repositories/roleRepository';

describe('RoleRepository', () => {
  it('should be importable', () => {
    expect(roleRepository).toBeDefined();
  });

  it('should have findByUserId method', () => {
    expect(typeof roleRepository.findByUserId).toBe('function');
  });

  it('should have findByName method', () => {
    expect(typeof roleRepository.findByName).toBe('function');
  });

  it('should have createUserRole method', () => {
    expect(typeof roleRepository.createUserRole).toBe('function');
  });

  it('should have deleteUserRoles method', () => {
    expect(typeof roleRepository.deleteUserRoles).toBe('function');
  });
});