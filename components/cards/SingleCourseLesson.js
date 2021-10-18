/** @format */

import { Avatar, List } from 'antd';

const SingleCourseLesson = ({
  lessons,
  setPreview,
  showModal,
  setShowModal,
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col lesson-list">
          {lessons && (
            <h4>
              {lessons.length} {lessons.length > 1 ? 'Lessons' : 'Lesson'}
            </h4>
          )}
          <hr />
          <List
            itemLayout="horizontal"
            dataSource={lessons}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                />
                {item.video && item.video !== null && item.free_preview && (
                  <span
                    className="text-primary pointer"
                    onClick={() => {
                      setPreview(item.video.Location);
                      setShowModal(!showModal);
                    }}
                  >
                    Preview
                  </span>
                )}
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCourseLesson;
