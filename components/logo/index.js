import Image from "next/image";

export default function Logo() {
    return (
        <>
            <Image
                width={300}
                height={50}
                src="/logo/logo.png" />
        </>
    )
}