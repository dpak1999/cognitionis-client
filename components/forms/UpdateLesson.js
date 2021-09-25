/** @format */

import { Button, Progress, Tooltip } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

const UpdateLesson = ({
  current,
  setCurrent,
  handleVideo,
  handleUpdateLesson,
  uploadVideoButtonText,
  progress,
  uploading,
}) => {
  return (
    <div className="container pt-3">
      <form onSubmit={handleUpdateLesson}>
        <input
          type="text"
          className="form-control square"
          onChange={(e) => setCurrent({ ...current, title: e.target.value })}
          value={current.title}
          required
          autoFocus
        />

        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={(e) => setCurrent({ ...current, content: e.target.value })}
          value={current.content}
        ></textarea>

        <div className="d-flex justify-content-center">
          <label className="btn btn-dark text-left mt-3 flex-grow-1">
            {uploadVideoButtonText}
            <input type="file" accept="video/*" hidden onChange={handleVideo} />
          </label>

          {!uploading && current.video && current.video.Location && (
            <div className="pt-2 d-flex justify-content-center">
              show video player
            </div>
          )}
        </div>

        {progress > 0 && (
          <Progress
            className="d-flex justify-content-center pt-2"
            percent={progress}
            steps={10}
          />
        )}

        <div className="d-flex justify-content-between ">
          <span className="pt-3 ">Preview</span>
        </div>

        <div className="d-grid gap-2">
          <Button
            onClick={handleUpdateLesson}
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
