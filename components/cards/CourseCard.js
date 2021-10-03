/** @format */

import { Badge, Card } from 'antd';
import Link from 'next/link';
import { currencyFormatter } from '../../utils/helper';

const CourseCard = ({ course }) => {
  const { slug, name, instructor, price, image, paid, category } = course;

  return (
    <Link href={`/course/${slug}`}>
      <a>
        <Card
          className="mb-4"
          cover={
            <img
              src={image.Location}
              alt={name}
              style={{ height: '200px', objectFit: 'cover' }}
              className="p-1"
            />
          }
        >
          <h2 className="font-weight-bold">{name}</h2>
          <p>By {instructor.name}</p>
          <Badge
            count={category}
            style={{ backgroundColor: '#03a9f4' }}
            className="me-2 pb-2"
          />
          <h4 className="pt-2">
            {paid
              ? currencyFormatter({ amount: price, currency: 'USD' })
              : 'Free'}
          </h4>
        </Card>
      </a>
    </Link>
  );
};

export default CourseCard;
