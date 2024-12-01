import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from '../../../../Services/operations/getUserProfileApi';
import ProgressBar from "@ramonak/react-progress-bar"
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';

const EnrollCourses = () => {

    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate();

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (err) {
            console.log("Unable to get Enrolled Courses", err);
        }
    }
    useEffect(() => {
        getEnrolledCourses();
    }, [])


    return (
        <div className='text-white'>
            <div className="text-3xl text-richblack-50">Enroll Courses</div>

            {
                !enrolledCourses ? (
                    <div className='mx-auto flex justify-center items-center'>
                        <ClipLoader
                            color="blue"
                            size={150}
                            aria-label='Loading...' />
                    </div>
                )
                    : !enrolledCourses.length ? (
                        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">You Have not enrolled in any course yet</p>
                    ) : (
                        <div className="my-8 text-richblack-5">
                            <div className="flex rounded-t-lg bg-richblack-500 ">
                                <p className="w-[45%] px-5 py-3">Course Name</p>
                                <p className="w-1/4 px-2 py-3">Durations</p>
                                <p className="flex-1 px-2 py-3">Progress</p>
                            </div>

                            {
                                enrolledCourses.map((course, index, arr) => (
                                    <div key={index} className={`flex items-center border border-richblack-700 ${index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                                        }`}>
                                            
                                        <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                            onClick={() => navigate(`/view-course/${course._id}/section/${course?.CourseContent[0]._id}/sub-section/${course?.CourseContent[0].SubSection[0]?._id}`)}
                                        >
                                            <img src={course.Thumbnail} className="h-14 w-14 rounded-lg object-cover" />
                                            <div className="flex max-w-xs flex-col gap-2">
                                                <p className="font-semibold">{course.CourseName}</p>
                                                <p className="text-xs text-richblack-300">
                                                    {course.CourseDescription.length > 50
                                                        ? `${course.CourseDescription.slice(0, 50)}...`
                                                        : course.CourseDescription}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="w-1/4 px-2 py-3">
                                            {course.totalDuration}
                                        </div>
                                        {console.log("course percentage", course.progressPercentage)}

                                        <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                            <p>Progress: {course.progressPercentage || 0}%</p>
                                            <ProgressBar
                                                completed={course.progressPercentage || 0}
                                                height='8px'
                                                isLabelVisible={false} 
                                            />

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
            }
        </div>
    )
}

export default EnrollCourses
