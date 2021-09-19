/** @format */

import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Avatar, Button, Modal, Tooltip } from 'antd';
import { CheckOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import InstructorRoute from '../../../../components/routes/InstructorRoute';
import AddLesson from '../../../../components/forms/AddLesson';
import { toast } from 'react-toastify';

const CourseView = () => {
  const [course, setCourse] = useState({});
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState('Upload Video');
  const [progress, setProgress] = useState(0);
  const [values, setValues] = useState({
    title: '',
    content: '',
    video: '',
  });

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };

  const handleAddLesson = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadButtonText(file.name);
      setUploading(true);

      const videoData = new FormData();
      videoData.append('video', file);

      const { data } = await axios.post('/api/course/video-upload', videoData, {
        onUploadProgress: (e) => {
          setProgress(Math.round((100 * e.loaded) / e.total));
        },
      });

      console.log(data);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
      toast('Video upload failed');
    }
  };

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

              <div className="flex-grow-1 ps-2">
                <div className="row">
                  <div className="col">
                    <h5 className="mt-2 text-primary">{course.name}</h5>
                    <p style={{ marginTop: '-10px' }}>
                      {course.lessons && course.lessons.length} Lessons
                    </p>
                    <p style={{ marginTop: '-15px', fontSize: '10px' }}>
                      {course.category}
                    </p>
                  </div>
                </div>
              </div>

              <div className="d-flex">
                <Tooltip title="Edit">
                  <EditOutlined className="h5 pointer text-warning me-4" />
                </Tooltip>

                <Tooltip title="Publish">
                  <CheckOutlined className="h5 pointer text-danger" />
                </Tooltip>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <ReactMarkdown children={course.description} />
              </div>
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
              />
            </Modal>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
