import styled from 'styled-components';
import { useThemeStore } from '../store/themeStore';

const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 32px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  transition: all ${({ theme }) => theme.transitions.normal};
  z-index: 1000;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ToggleThumb = styled.div<{ $isLight: boolean }>`
  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform ${({ theme }) => theme.transitions.normal};
  transform: translateX(${({ $isLight }) => ($isLight ? '28px' : '0')});
  font-size: 14px;
`;

export function ThemeToggle() {
  const { mode, toggleTheme } = useThemeStore();
  const isLight = mode === 'light';

  return (
    <ToggleButton onClick={toggleTheme} aria-label="Toggle theme">
      <ToggleThumb $isLight={isLight}>{isLight ? '☀️' : '🌙'}</ToggleThumb>
    </ToggleButton>
  );
}
