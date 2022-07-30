import {Link} from 'react-router-dom';

export default function Footer() {

    return (
<footer className="bg-white border-gray-200 p-4 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-900">
    <span className="text-sm t sm:text-center dark:text-white">© 2022 <Link to="/" className="hover:underline">Adil Aziz</Link>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm  sm:mt-0">
        <li>
            <Link to="/about" className="mr-4 hover:underline md:mr-6 dark:text-white">About</Link>
        </li>
        <li>
            <Link to="/blog" className="mr-4 hover:underline md:mr-6 dark:text-white">Writings</Link>
        </li>
        <li>
            <Link to="#" className="mr-4 hover:underline md:mr-6 dark:text-white">Licensing</Link>
        </li>
        <li>
            <Link to="/contact" className="hover:underline dark:text-white">Contact</Link>
        </li>
    </ul>
</footer>

    );
}