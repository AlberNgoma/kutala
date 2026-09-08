export default function FormatedDate() {
    const date = new Date();
    const formatedDate = date.toLocaleDateString("pt-PT")
    const formatedTime = date.toLocaleTimeString("pt-PT", {
        hour: "2-digit",
        minute: "2-digit"
    })

    return `${formatedDate} - ${formatedTime}`
}