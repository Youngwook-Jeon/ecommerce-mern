import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PaginationComponent = ({
  categoryName,
  searchQuery,
  paginationLinksNumber,
  pageNumParam,
}) => {
  const category = categoryName ? `category/${categoryName}/` : "";
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const url = `/product-list/${category}${search}`;

  return (
    <Pagination>
      <LinkContainer to={`${url}${pageNumParam - 1}`}>
        <Pagination.Prev disabled={pageNumParam === 1} />
      </LinkContainer>
      {[...Array(paginationLinksNumber).keys()].map((x) => (
        <LinkContainer key={x + 1} to={`${url}${x + 1}`}>
          <Pagination.Item active={x + 1 === pageNumParam}>
            {x + 1}
          </Pagination.Item>
        </LinkContainer>
      ))}
      <LinkContainer
        disabled={pageNumParam === paginationLinksNumber}
        to={`${url}${pageNumParam + 1}`}
      >
        <Pagination.Next />
      </LinkContainer>
    </Pagination>
  );
};

export default PaginationComponent;
