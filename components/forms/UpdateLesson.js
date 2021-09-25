/** @format */

import { Button, Progress, Switch } from 'antd';
import ReactPlayer from 'react-player';

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

        <div className="d-flex justify-content-center flex-column">
          {!uploading && current.video && current.video.Location && (
            <div className="pt-2 d-flex justify-content-center">
              <ReactPlayer
                url={current.video.Location}
                width="440px"
                height="240px"
                controls
              />
            </div>
          )}
          <label className="btn btn-dark text-left mt-3 flex-grow-1">
            {uploadVideoButtonText}
            <input type="file" accept="video/*" hidden onChange={handleVideo} />
          </label>
        </div>

        {progress > 0 && (
          <Progress
            className="d-flex justify-content-center pt-2"
            percent={progress}
            steps={10}
          />
        )}

        <div className="d-flex justify-content-between ">
          <span className="pt-3 ">Free Preview</span>
          <Switch
            className="float-right mt-2"
            disabled={uploading}
            defaultChecked={current.free_preview}
            name="free_preview"
            onChange={(v) => setCurrent({ ...current, free_preview: v })}
          />
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
