/** @format */

import { Button } from 'antd';

const AddLesson = ({
  values,
  setValues,
  uploading,
  handleAddLesson,
  uploadButtonText,
  handleVideo,
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

        <div className="d-grid gap-2">
          <label className="btn btn-dark  text-left mt-3">
            {uploadButtonText}
            <input type="file" accept="video/*" hidden onChange={handleVideo} />
          </label>
        </div>
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

export default AddLesson;
