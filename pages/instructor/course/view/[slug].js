/** @format */

import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Avatar, Button, Modal, Tooltip, List, Badge } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  QuestionOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { toast } from 'react-toastify';
import InstructorRoute from '../../../../components/routes/InstructorRoute';
import AddLesson from '../../../../components/forms/AddLesson';

const CourseView = () => {
  const [students, setStudents] = useState(0);
  const [course, setCourse] = useState({});
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState('Upload Video');
  const [progress, setProgress] = useState(0);
  const [values, setValues] = useState({
    title: '',
    content: '',
    video: {},
  });

  const router = useRouter();
  const { slug } = router.query;

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      );
      setValues({ ...values, title: '', content: '', video: {} });
      setVisible(false);
      setUploadButtonText('Upload video');
      setCourse(data);
      setProgress(0);
      toast('Lesson added');
    } catch (error) {
      console.log(error);
      toast('Could not add Lesson');
    }
  };

  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadButtonText(file.name);
      setUploading(true);

      const videoData = new FormData();
      videoData.append('video', file);

      const { data } = await axios.post(
        `/api/course/video-upload/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );

      console.log(data);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
      toast('Video upload failed');
    }
  };

  const handleVideoRemove = async (e) => {
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/course/remove-video/${course.instructor._id}`,
        values.video
      );
      console.log(data);
      setValues({ ...values, video: {} });
      setUploading(false);
      setProgress(0);
      setUploadButtonText('Upload video');
    } catch (error) {
      console.log(error);
      setUploading(false);
      toast('Cannot remove video');
    }
  };

  const handlePublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        'Once you publish the course it will be live for users to enroll.'
      );
      if (!answer) return;

      const { data } = await axios.put(`/api/course/publish/${courseId}`);
      setCourse(data);

      toast('Congrats your course is now live.');
    } catch (error) {
      toast('Something went wrong please try again');
    }
  };

  const handleUnpublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        'Once you unpublish the course users will not be able to enroll in it.'
      );
      if (!answer) return;

      const { data } = await axios.put(`/api/course/unpublish/${courseId}`);
      setCourse(data);

      toast('Your course is now unpublished.');
    } catch (error) {
      toast('Something went wrong please try again');
    }
  };

  const studentCount = async () => {
    const { data } = await axios.post(`/api/instructor/student-count`, {
      courseId: course._id,
    });
    setStudents(data.length);
  };

  useEffect(() => {
    loadCourse();
  }, [slug]);

  useEffect(() => {
    course && studentCount();
  }, [course]);

  return (
    <InstructorRoute>
      <div className="container-fluid pt-3">
        {course && (
          <div className="container-fluid pt-2">
            <div className="d-flex pt-2">
              <Avatar
                size={80}
                src={course.image ? course.image.Location : '/def.jpg'}
              />

              <div className="flex-grow-1 pl-2">
                <div className="row">
                  <div className="col">
                    <h5 className="mt-2 text-primary">
                      {course.name}{' '}
                      <Badge
                        count={`${students} enrolled`}
                        className="mb-1 ml-1"
                      />
                    </h5>
                    <p style={{ marginTop: '-10px' }}>
                      {course.lessons && course.lessons.length} Lessons
                    </p>
                    <p style={{ marginTop: '-15px', fontSize: '10px' }}>
                      {course.category}
                    </p>
                  </div>
                </div>
              </div>

              <div className="d-flex mt-4">
                <Tooltip title="Edit">
                  <EditOutlined
                    onClick={() =>
                      router.push(`/instructor/course/edit/${slug}`)
                    }
                    className="h5 pointer text-warning mr-4"
                  />
                </Tooltip>

                {course.lessons && course.lessons.length < 5 ? (
                  <Tooltip title="Minimum five lessons required to publish">
                    <QuestionOutlined className="h5 pointer text-danger" />
                  </Tooltip>
                ) : course.published ? (
                  <Tooltip title="Unpublish">
                    <CloseOutlined
                      onClick={(e) => handleUnpublish(e, course._id)}
                      className="h5 pointer text-danger"
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Publish">
                    <CheckOutlined
                      onClick={(e) => handlePublish(e, course._id)}
                      className="h5 pointer text-success"
                    />
                  </Tooltip>
                )}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">{course.description}</div>
            </div>
            <div className="row">
              <Button
                className="col-md-6 offset-md-3 text-center"
                type="primary"
                shape="round"
                icon={<UploadOutlined />}
                size="large"
                onClick={() => setVisible(true)}
              >
                Add Lesson
              </Button>
            </div>

            <br />

            <Modal
              title="+ Add Lesson"
              centered
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <AddLesson
                values={values}
                setValues={setValues}
                handleAddLesson={handleAddLesson}
                uploading={uploading}
                uploadButtonText={uploadButtonText}
                handleVideo={handleVideo}
                progress={progress}
                handleVideoRemove={handleVideoRemove}
              />
            </Modal>

            <div className="row pb-5">
              <div className="col lesson-list">
                <h4>
                  {course && course.lessons && course.lessons.length}{' '}
                  {course && course.lessons && course.lessons.length > 1
                    ? 'Lessons'
                    : 'Lesson'}
                </h4>
                <List
                  itemLayout="horizontal"
                  dataSource={course && course.lessons}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar>{index + 1}</Avatar>}
                        title={item.title}
                      ></List.Item.Meta>
                    </List.Item>
                  )}
                ></List>
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
