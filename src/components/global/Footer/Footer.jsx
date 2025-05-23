const Footer = () => {
    return (
        <footer className="bg-white text-gray-700 mt-10 border-t">
            <div className="container items-center text-center mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-3">About Us</h2>
                    <p className="text-sm text-gray-600">
                        We connect people around the world. Explore categories,
                        connect globally.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-3">Socials</h2>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:text-blue-500">
                                Facebook
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-sky-500">
                                Twitter
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-pink-600">
                                Instagram
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-red-500">
                                YouTube
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-3">Categories</h2>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:underline">
                                Technology
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Education
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Health
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Entertainment
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-3">Countries</h2>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:underline">
                                United States
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                United Kingdom
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                New Zealand
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Bangladesh
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 py-4 border-t">
                © {new Date().getFullYear()} News Portal. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
