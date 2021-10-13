type BreadcrumbsProps = {
  filmName: string | undefined
  id: number | undefined
}

function Breadcrumbs({filmName, id}: BreadcrumbsProps): JSX.Element {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <a href={`/films/${id}`} className="breadcrumbs__link">
            {filmName}
          </a>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
