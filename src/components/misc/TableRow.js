import React from 'react';
import '../../assets/stylesheets/TableRow.css'

const TableRow = ({img, body, action}) => {
  return (
    <div className="TableRow row">
      <div className="ImgTableRow col-2">
        <div className="ImgDish">

        </div>
      </div>
      <div className="BodyTableRow col-8">Description of the product</div>
      <div className="ActionTableRow col-2">edit</div>
    </div>
  );
};

export default TableRow;