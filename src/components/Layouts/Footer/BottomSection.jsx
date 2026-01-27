import Image from "next/image";
import Link from "next/link";

const BottomSection = ({socialMediaLinks}) => {
    return (
        <div className="flex flex-row flex-wrap gap-4 justify-between items-center">
            
            <p className="text-gray-500 text-sm"> © {new Date().getFullYear()}. All rights reserved.</p>

            <div className="flex items-center gap-5">
                {
                    socialMediaLinks.map((social) => (
                        <div key={social.name} className="flex items-center gap-2">
                            <Link href={social.url} target="_blank">
                                <Image
                                    src={social.img}
                                    alt={`${social.name} Logo`}
                                    width={20}
                                    height={20}
                                    className="opacity-65 hover:opacity-100 transition-opacity duration-300"
                                />
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default BottomSection;