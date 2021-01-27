import React from 'react';
import '../../assets/stylesheets/TableRow.css'

const TableRow = ({img, title, action}) => {
  return (
    <div className="TableRow row">
      <div className="ImgTableRow col-2">
        <div className="ImgDish">

        </div>
      </div>
      <div className="BodyTableRow col-8">{title}</div>
      <div className="ActionTableRow col-2">edit</div>
    </div>
  );
};

export default TableRow;