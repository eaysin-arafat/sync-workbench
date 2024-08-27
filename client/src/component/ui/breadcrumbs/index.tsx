import { Link } from "react-router-dom";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="flex flex-col gap-3 items-start justify-start">
      <h2 className="text-title-md font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium text-sm text-[#696969]" to="/">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-sm ">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
