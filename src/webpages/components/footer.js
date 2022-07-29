import {Link} from 'react-router-dom';

export default function Footer() {

    return (
        
<footer className="p-4 shadow md:flex md:items-center md:justify-between md:p-6 ">
    <span className="text-sm t sm:text-center ">© 2022 <a href="https://flowbite.com/" className="hover:underline">Adil Aziz</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm  sm:mt-0">
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
        </li>
        <li>
            <a href="#" className="hover:underline">Contact</a>
        </li>
    </ul>
</footer>

    );
}