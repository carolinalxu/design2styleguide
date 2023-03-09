import Image from "next/image";


export default function Male({
    img = "",
    tag = ""
}) {
    return (
        <div>
            < Image
                src={img}
                width={100}
                height={100}
            />
            <div>
                {tag}
            </div>
        </div>
    )
}
