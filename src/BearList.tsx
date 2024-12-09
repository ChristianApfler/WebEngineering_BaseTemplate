import React from 'react';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

interface BearListProps {
  bears: Bear[];
}

const BearList: React.FC<BearListProps> = ({ bears }) => {
  return (
    <section className="more-bears">
      {bears.map((bear, index) => (
        <div key={index}>
          <h3>
            {bear.name} ({bear.binomial})
          </h3>
          <img
            src={bear.image}
            alt={bear.name}
            style={{ width: '200px', height: 'auto' }}
          />
          <p>
            <strong>Range:</strong> {bear.range}
          </p>
        </div>
      ))}
    </section>
  );
};

export default BearList;
