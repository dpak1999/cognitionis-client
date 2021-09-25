/** @format */

import { Button, Progress, Tooltip } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

const UpdateLesson = ({
  values,
  setValues,
  uploading,
  handleAddLesson,
  uploadButtonText,
  handleVideo,
  progress,
  handleVideoRemove,
}) => {
  return (
    <div className="container pt-3">
      <form onSubmit={handleAddLesson}>
        <input
          type="text"
          className="form-control square"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
          placeholder="Title"
          required
          autoFocus
        />

        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          value={values.content}
          placeholder="Content"
        ></textarea>

        <div className="d-flex justify-content-center">
          <label className="btn btn-dark text-left mt-3 flex-grow-1">
            {uploadButtonText}
            <input type="file" accept="video/*" hidden onChange={handleVideo} />
          </label>

          {!uploading && values.video.Location && (
            <Tooltip title="Remove video">
              <span onClick={handleVideoRemove} className="pt-1 ps-3">
                <CloseCircleFilled className="text-danger d-flex justify-content-center pt-4 pointer" />
              </span>
            </Tooltip>
          )}
        </div>

        {progress > 0 && (
          <Progress
            className="d-flex justify-content-center pt-2"
            percent={progress}
            steps={10}
          />
        )}
        <div className="d-grid gap-2">
          <Button
            onClick={handleAddLesson}
            className="col mt-3"
            size="large"
            type="primary"
            loading={uploading}
            shape="square"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLesson;
