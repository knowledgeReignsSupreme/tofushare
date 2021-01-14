import React from 'react';
import styled from 'styled-components';
import uuid from 'react-uuid';
import { FaTrash } from 'react-icons/fa';

const ListPreview = ({ list, setList, setNumb }) => {
  const deleteHandler = (item, i) => {
    const newList = list.filter((it) => it.name !== item.item.name);
    setList([...newList]);
    setNumb((prevNumb) => prevNumb - 1);
  };

  const deleteInstructionHander = (item, i) => {
    const newList = list.filter((it) => it !== item.item);
    setList([...newList]);
    setNumb((prevNumb) => prevNumb - 1);
  };

  return (
    <StyledPreview>
      {list.map((item, i) =>
        item.ammount ? (
          <StyledItem key={uuid()}>
            <h4>
              {item.ammount} {item.name}{' '}
              <FaTrash onClick={() => deleteHandler({ item }, i)} />
            </h4>
          </StyledItem>
        ) : (
          <StyledItem key={uuid()}>
            <h4>
              {' '}
              {i + 1}. {item}
              <FaTrash onClick={() => deleteInstructionHander({ item }, i)} />
            </h4>
          </StyledItem>
        )
      )}
    </StyledPreview>
  );
};

const StyledPreview = styled.div`
  div {
    width: 60%;
    border-radius: 15px;

    h4 {
      display: flex;
      justify-content: space-between;
      padding: 0.2rem 0;
      margin-right: 0.5rem;
    }
    svg {
      align-self: flex-end;
      margin-left: 3rem;
      vertical-align: middle;
      cursor: pointer;
    }
    &:not(:last-of-type) {
      margin-bottom: 0.4rem;
    }
    @media screen and (max-width: 600px) {
      width: 90%;
    }
    &:nth-child(even) {
      background-color: #8b8b8b;
      color: white;
    }
    &:nth-child(odd) {
      background-color: #f0f0f0;
    }
  }
`;

const StyledItem = styled.div``;

export default ListPreview;
