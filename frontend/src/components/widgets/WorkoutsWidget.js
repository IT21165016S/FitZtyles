import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkouts } from "../../store/actions/workout.action";
import PostWidget from "./PostWidget";
import WorkoutWidget from "./WorkoutWidget";

const WorkoutsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const workouts = useSelector((state) => state.workout.workouts);
  const token = localStorage.getItem("Authorization");

  // const getUserPosts = async () => {
  //   const response = await fetch(
  //     `http://localhost:3001/posts/${userId}/posts`,
  //     {
  //       method: "GET",
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   );
  //   const data = await response.json();
  //   dispatch(setPosts({ posts: data }));
  // };

  useEffect(() => {
    if (isProfile) {
      // getUserPosts();
    } else {
      dispatch(getWorkouts());
    }
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {workouts.map(
        ({
          id,
          userId,
          username,
          userImage,
          title,
          image,
          description,
          // likes,
          // comments,
        }) => (
          <WorkoutWidget
            key={id}
            workoutId={id}
            workoutUserId={userId}
            name={username}
            userImage={userImage}
            title={title}
            image={image}
            description={description}
            // likes={likes}
            // comments={comments}
          />
        )
      )}
    </>
  );
};

export default WorkoutsWidget;
