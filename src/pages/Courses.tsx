import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuthStore } from '../store/authStore';
import { useCoursesStore } from '../store/coursesStore';
import { SEO } from '../components/SEO';

const LOADING_SKELETON_COUNT = 6;

interface CourseCardProps {
  registered: boolean;
  canRegister: boolean;
}

interface PrereqBadgeProps {
  completed: boolean;
}

interface RegisterButtonProps {
  registered: boolean;
  canRegister: boolean;
}

interface MessageProps {
  type: 'success' | 'error' | '';
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.backgroundLight} 100%);
`;

const Header = styled.header`
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: ${({ theme }) => theme.colors.backgroundLight}ee;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: 1.5rem;
  font-weight: bold;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: flex-start;
  }
`;

const UserName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const TermBadge = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const LogoutButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.error};
    border-color: ${({ theme }) => theme.colors.error};
    transform: translateY(-2px);
  }
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  font-size: 1.1rem;
`;

const CoursesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  animation: ${fadeIn} 0.6s ease-out;
`;

const CourseCard = styled.div<CourseCardProps>`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${(props) =>
    props.registered
      ? 'rgba(34, 197, 94, 0.3)'
      : props.canRegister
      ? 'rgba(99, 102, 241, 0.3)'
      : 'rgba(255, 255, 255, 0.1)'};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.lg};
  transition: all ${(props) => props.theme.transitions.normal};
  animation: ${fadeIn} 0.5s ease-out forwards;
  opacity: 0;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.lg};

  &:hover {
    transform: translateY(-2px);
    border-color: ${(props) =>
      props.registered
        ? 'rgba(34, 197, 94, 0.5)'
        : props.canRegister
        ? 'rgba(99, 102, 241, 0.5)'
        : 'rgba(255, 255, 255, 0.2)'};
    box-shadow: ${(props) => props.theme.shadows.lg};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.spacing.md};
    flex-direction: column;
  }
`;

const CourseTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.3rem;
  }
`;

const CourseInfo = styled.div`
  flex: 1;
`;

const CourseActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-width: 100%;
    align-items: stretch;
  }
`;

const CourseId = styled.div`
  display: inline-block;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PrereqSection = styled.div`
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const PrereqLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
`;

const PrereqList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PrereqBadge = styled.span<PrereqBadgeProps>`
  display: inline-block;
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  margin-right: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.xs};
  background: ${(props) =>
    props.completed ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  border: 1px solid
    ${(props) => (props.completed ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)')};
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-size: 0.875rem;
  color: ${(props) => (props.completed ? '#4ade80' : '#f87171')};
  transition: all ${(props) => props.theme.transitions.normal};

  &:hover {
    transform: scale(1.05);
  }
`;

const RegisterButton = styled.button<RegisterButtonProps>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ registered, canRegister, theme }) =>
    registered
      ? theme.colors.success
      : canRegister
      ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%)`
      : theme.colors.surface};
  border: ${({ canRegister, theme }) =>
    canRegister ? 'none' : `1px solid ${theme.colors.border}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ registered, canRegister, theme }) =>
    registered || canRegister ? theme.colors.white : theme.colors.textSecondary};
  font-weight: 600;
  font-size: 1rem;
  cursor: ${({ canRegister, registered }) =>
    canRegister && !registered ? 'pointer' : 'not-allowed'};
  transition: all ${({ theme }) => theme.transitions.normal};
  white-space: nowrap;

  &:hover {
    transform: ${({ canRegister, registered }) =>
      canRegister && !registered ? 'translateY(-2px)' : 'none'};
    box-shadow: ${({ canRegister, registered, theme }) =>
      canRegister && !registered ? theme.shadows.glow : 'none'};
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const LoadingCard = styled.div`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.backgroundLight} 0%,
    ${({ theme }) => theme.colors.surface} 50%,
    ${({ theme }) => theme.colors.backgroundLight} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  min-height: 250px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Message = styled.div<MessageProps>`
  background: ${({ type, theme }) =>
    type === 'error' ? `${theme.colors.error}22` : `${theme.colors.success}22`};
  border: 1px solid ${({ type, theme }) =>
    type === 'error' ? theme.colors.error : theme.colors.success};
  color: ${({ type, theme }) =>
    type === 'error' ? theme.colors.error : theme.colors.success};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  animation: ${fadeIn} 0.3s ease-out;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textSecondary};

  h3 {
    font-size: 1.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

function Courses() {
  // Auth store
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  // Courses store
  const courses = useCoursesStore((state) => state.courses);
  const currentTerm = useCoursesStore((state) => state.currentTerm);
  const loading = useCoursesStore((state) => state.loading);
  const message = useCoursesStore((state) => state.message);
  const studentCompletedCourses = useCoursesStore((state) => state.studentCompletedCourses);
  
  const loadData = useCoursesStore((state) => state.loadData);
  const registerForCourse = useCoursesStore((state) => state.registerForCourse);
  const isRegistered = useCoursesStore((state) => state.isRegistered);
  const canRegister = useCoursesStore((state) => state.canRegister);
  const getCourseName = useCoursesStore((state) => state.getCourseName);
  const reset = useCoursesStore((state) => state.reset);

  useEffect(() => {
    if (user && token) {
      // Pequeño delay para asegurar que MSW esté listo
      const timer = setTimeout(() => {
        loadData(user.id, token);
      }, 100);

      return () => {
        clearTimeout(timer);
        reset();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, token]);

  const handleRegister = async (courseId: number) => {
    if (!user || !currentTerm || !token) return;
    await registerForCourse(user.id, courseId, currentTerm.id, token);
  };

  const handleLogout = () => {
    reset();
    logout();
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <Logo>
              📚 <span>Course Registration</span>
            </Logo>
          </HeaderContent>
        </Header>
        <Main>
          <Title>Available Courses</Title>
          <CoursesGrid>
            {Array.from({ length: LOADING_SKELETON_COUNT }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </CoursesGrid>
        </Main>
      </Container>
    );
  }

  return (
    <Container>
      <SEO 
        title="Available Courses"
        description="Browse and register for university courses. Check prerequisites, view course details, and manage your academic schedule for next semester."
        keywords="available courses, course catalog, prerequisites, course registration, academic planning"
        url="https://courses-projext.vercel.app/courses"
      />
      <Header>
        <HeaderContent>
          <Logo>
            📚 <span>Course Registration</span>
          </Logo>
          <UserInfo>
            <UserDetails>
              <UserName>{user?.username}</UserName>
              {currentTerm && <TermBadge>{currentTerm.name}</TermBadge>}
            </UserDetails>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </UserInfo>
        </HeaderContent>
      </Header>

      <Main>
        <Title>Available Courses</Title>
        <Subtitle>Select courses for the next semester</Subtitle>

        {message.text && (
          <Message type={message.type}>
            {message.text}
          </Message>
        )}

        {courses.length === 0 ? (
          <EmptyState>
            <h3>No courses available</h3>
            <p>There are no courses available for registration at this time.</p>
          </EmptyState>
        ) : (
          <CoursesGrid>
            {courses.map((course) => {
              const registered = isRegistered(course.id);
              const meetsPrereqs = canRegister(course);

              return (
                <CourseCard
                  key={course.id}
                  registered={registered}
                  canRegister={meetsPrereqs}
                >
                  <CourseInfo>
                    <CourseId>Course ID: {course.id}</CourseId>
                    <CourseTitle>{course.name}</CourseTitle>

                    {course.prereqs.length > 0 && (
                      <PrereqSection>
                        <PrereqLabel>Prerequisites:</PrereqLabel>
                        <PrereqList>
                          {course.prereqs.map((prereqId) => (
                            <PrereqBadge
                              key={prereqId}
                              completed={studentCompletedCourses.includes(prereqId)}
                            >
                              {getCourseName(prereqId)}
                            </PrereqBadge>
                          ))}
                        </PrereqList>
                      </PrereqSection>
                    )}
                  </CourseInfo>

                  <CourseActions>
                    <RegisterButton
                      registered={registered}
                      canRegister={meetsPrereqs}
                      onClick={() => handleRegister(course.id)}
                      disabled={registered || !meetsPrereqs}
                    >
                      {registered
                        ? '✓ Registered'
                        : meetsPrereqs
                        ? 'Register'
                        : 'Prerequisites Incomplete'}
                    </RegisterButton>
                  </CourseActions>
                </CourseCard>
              );
            })}
          </CoursesGrid>
        )}
      </Main>
    </Container>
  );
}

export default Courses;
