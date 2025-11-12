import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuthStore } from '../store/authStore';
import { useCoursesStore } from '../store/coursesStore';
import { SEO } from '../components/SEO';
import { PageHeader } from '../components/PageHeader';
import {
  Badge,
  PageContainer,
  ContentWrapper
} from '../components/common';

const LOADING_SKELETON_COUNT = 6;

interface CourseCardProps {
  registered: boolean;
  canRegister: boolean;
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
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) =>
    props.registered
      ? props.theme.colors.success
      : props.canRegister
      ? props.theme.colors.primary
      : props.theme.colors.border};
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
        ? props.theme.colors.success
        : props.canRegister
        ? props.theme.colors.primary
        : props.theme.colors.border};
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
      <PageContainer>
        <PageHeader showLogo />
        <ContentWrapper>
          <Title>Available Courses</Title>
          <CoursesGrid>
            {Array.from({ length: LOADING_SKELETON_COUNT }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </CoursesGrid>
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SEO 
        title="Available Courses"
        description="Browse and register for university courses. Check prerequisites, view course details, and manage your academic schedule for next semester."
        keywords="available courses, course catalog, prerequisites, course registration, academic planning"
        url="https://courses-projext.vercel.app/courses"
      />
      <PageHeader 
        user={user || undefined}
        term={currentTerm?.name}
        onLogout={handleLogout}
      />

      <ContentWrapper>
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
                          {course.prereqs.map((prereqId) => {
                            const completed = studentCompletedCourses.includes(prereqId);
                            return (
                              <Badge
                                key={prereqId}
                                variant={completed ? 'success' : 'error'}
                                size="sm"
                              >
                                {getCourseName(prereqId)}
                              </Badge>
                            );
                          })}
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
      </ContentWrapper>
    </PageContainer>
  );
}

export default Courses;
