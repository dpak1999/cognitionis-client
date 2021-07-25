/** @format */

import { Button, Select } from "antd";

const CreateCourse = ({
  handleChange,
  handleImageUpload,
  handleSubmit,
  values,
  setValues,
}) => {
  const children = [];
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(
      <Select.Option key={i.toFixed(2)}>$ {i.toFixed(2)}</Select.Option>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Course Name"
            value={values.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mt-3">
          <textarea
            name="description"
            className="form-control"
            placeholder="Course Description"
            cols="7"
            rows="7"
            value={values.description}
            onChange={handleChange}
          />
        </div>

        <div className="row mt-3">
          <div className="col">
            <div className="form-group">
              <Select
                onChange={(v) => setValues({ ...values, paid: !values.paid })}
                value={values.paid}
                style={{ width: "100%" }}
                size="large"
              >
                <Select.Option value={true}>Paid</Select.Option>
                <Select.Option value={false}>Free</Select.Option>
              </Select>
            </div>
          </div>

          {values.paid && (
            <div className="col-md-6">
              <div className="form-group">
                <Select
                  defaultValue="$9.99"
                  style={{ width: "100%" }}
                  onChange={(v) => setValues({ ...values, price: v })}
                  tokenSeparators={[,]}
                  size="large"
                >
                  {children}
                </Select>
              </div>
            </div>
          )}
        </div>

        <div className="form-group mt-3">
          <input
            type="text"
            name="category"
            className="form-control"
            placeholder="Category"
            value={values.category}
            onChange={handleChange}
          />
        </div>

        <div className="form-row mt-3">
          <div className="col">
            <div className="form-group d-grid gap-2">
              <label className="btn btn-outline-secondary text-start">
                {values.loading ? "Uploading" : "Upload Image"}
                <input
                  type="file"
                  name="image"
                  onChange={handleImageUpload}
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <Button
              onClick={handleSubmit}
              disabled={values.loading || values.uploading}
              className="btn btn-primary"
              loading={values.loading}
              type="primary"
              size="large"
              shape="round"
            >
              {values.loading ? "Saving.." : "Save and continue"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateCourse;
