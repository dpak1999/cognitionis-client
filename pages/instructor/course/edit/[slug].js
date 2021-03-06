/** @format */

import { useState, useEffect } from 'react';
import Resizer from 'react-image-file-resizer';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Avatar, List, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import CreateCourse from '../../../../components/forms/CreateCourse';
import InstructorRoute from '../../../../components/routes/InstructorRoute';
import UpdateLesson from '../../../../components/forms/UpdateLesson';

const CourseEdit = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    uploading: false,
    paid: true,
    loading: false,
    category: '',
    lessons: [],
  });

  const [image, setImage] = useState({});
  const [preview, setPreview] = useState('');
  const [uploadButtonText, setUploadButtonText] = useState('Upload Image');
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadVideoButtonText, setUploadVideoButtonText] =
    useState('Upload Video');

  const router = useRouter();
  const { slug } = router.query;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImageRemove = async () => {
    try {
      setValues({ ...values, loading: true });
      const res = await axios.post('/api/course/remove-image', { image });
      setImage({});
      setPreview('');
      setUploadButtonText('Upload Image');
      setValues({ ...values, loading: false });
    } catch (error) {
      setValues({ ...values, loading: false });
      toast('Image upload failed. Try again');
    }
  };

  const handleImageUpload = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });

    Resizer.imageFileResizer(file, 720, 500, 'JPEG', 100, 0, async (uri) => {
      try {
        let { data } = await axios.post('/api/course/upload-image', {
          image: uri,
        });
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (error) {
        setValues({ ...values, loading: false });
        toast('Image upload failed. Try again');
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`/api/course/${slug}`, {
        ...values,
        image,
      });
      toast('Course updated');
      // router.push('/instructor');
    } catch (error) {
      toast(error.response.data);
    }
  };

  const handleDrag = (e, index) => {
    e.dataTransfer.setData('itemIndex', index);
  };

  const handleDrop = async (e, index) => {
    const movingItemIndex = e.dataTransfer.getData('itemIndex');
    const targetItemIndex = index;
    let allLessons = values.lessons;

    let movingItem = allLessons[movingItemIndex]; // dragged item
    allLessons.splice(movingItemIndex, 1); //remove 1 item from the given index
    allLessons.splice(targetItemIndex, 0, movingItem); //push item after target item index

    setValues({ ...values, lessons: [...allLessons] });

    // save new lesson order in db
    const { data } = await axios.put(`/api/course/${slug}`, {
      ...values,
      image,
    });

    toast('Lessons rearranged successfully');
  };

  const handleDelete = async (index) => {
    const answer = window.confirm('Are you sure you want to delete?');
    if (!answer) return;

    let allLessons = values.lessons;
    const removed = allLessons.splice(index, 1);
    setValues({ ...values, lessons: allLessons });
    toast('Lesson deleted');

    const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`);
  };

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    if (data) setValues(data);
    if (data && data.image) setImage(data.image);
  };

  // lesson update

  const handleVideo = async (e) => {
    // remove previous video
    if (current.video && current.video.Location) {
      const response = await axios.post(
        `/api/course/remove-video/${values.instructor._id}`,
        current.video
      );
    }

    // start uploading a new one
    const file = e.target.files[0];
    setUploadVideoButtonText(file.name);
    setUploading(true);

    // send video
    const videoData = new FormData();
    videoData.append('video', file);
    videoData.append('courseId', values._id);

    // save progress bar and send video as form data to backend
    const { data } = await axios.post(
      `/api/course/video-upload/${values.instructor._id}`,
      videoData,
      {
        onUploadProgress: (e) =>
          setProgress(Math.round((100 * e.loaded) / e.total)),
      }
    );
    setCurrent({ ...current, video: data });
    setUploading(false);
  };

  const handleUpdateLesson = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      `/api/course/lesson/${slug}/${current._id}`,
      current
    );
    setUploadVideoButtonText('Upload Video');
    setVisible(false);

    if (data.ok) {
      let arr = values.lessons;
      const index = arr.findIndex((el) => el._id === current._id);
      arr[index] = current;
      setValues({ ...values, lessons: arr });
      toast('Lesson updated');
    }
  };

  return (
    <InstructorRoute>
      <div className="p-5 mb-4 bg-primary bg-gradient">
        <div className="container-fluid py-5">
          <h1 className="text-center text-white">Edit course</h1>
        </div>
      </div>

      <div className="py-3">
        <CreateCourse
          handleSubmit={handleSubmit}
          handleImageUpload={handleImageUpload}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          handleImageRemove={handleImageRemove}
          editPage={true}
        />
      </div>
      {/* <pre>{JSON.stringify(values, null, 4)}</pre>
      <pre>{JSON.stringify(image, null, 4)}</pre> */}

      <hr />
      <div className="row pb-5">
        <div className="col lesson-list">
          <h4>
            {values && values.lessons && values.lessons.length}{' '}
            {values && values.lessons && values.lessons.length > 1
              ? 'Lessons'
              : 'Lesson'}
            <span>
              &nbsp;(Note : You can drag and drop lessons to rearrange them)
            </span>
          </h4>
          <List
            onDragOver={(e) => e.preventDefault()}
            itemLayout="horizontal"
            dataSource={values && values.lessons}
            renderItem={(item, index) => (
              <List.Item
                draggable
                onDragStart={(e) => handleDrag(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <List.Item.Meta
                  onClick={() => {
                    setVisible(true);
                    setCurrent(item);
                  }}
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                ></List.Item.Meta>
                <DeleteOutlined
                  onClick={() => handleDelete(index)}
                  className="text-danger float-right"
                />
              </List.Item>
            )}
          />
        </div>
      </div>

      <Modal
        title="Update Lesson"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <UpdateLesson
          current={current}
          setCurrent={setCurrent}
          handleVideo={handleVideo}
          handleUpdateLesson={handleUpdateLesson}
          uploadVideoButtonText={uploadVideoButtonText}
          progress={progress}
          uploading={uploading}
        />
      </Modal>
    </InstructorRoute>
  );
};

export default CourseEdit;
