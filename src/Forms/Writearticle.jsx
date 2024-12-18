import { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
];

function Writearticle() {
    const [content, setContent] = useState("");

    const addCustomPublishButton = (handlePublish) => {
        const publishButton = document.querySelector(".ql-publish");

        if (!publishButton) {
            const toolbar = Quill.import("modules/toolbar");
            toolbar.DEFAULTS.handlers.publish = handlePublish;

            const span = document.createElement("div");
            span.className = "ql-formats ql-subcontainer";

            const button = document.createElement("button");
            button.innerHTML = "Publish";
            button.className = "ql-publish";
            button.onclick = handlePublish;

            const toolbarElement = document.querySelector(".ql-toolbar");
            if (toolbarElement) {
                toolbarElement.appendChild(span);
                span.appendChild(button);
            }
        }
    };

    useEffect(() => {
        addCustomPublishButton(handlePublish);
    }, []);

    const handlePublish = () => {

        // console.log(content);
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ align: [] }],
            ["clean"],
        ],
    };

    return (
        <div className="pt-16 mt-[2px] h-[94vh] relative">
            <ReactQuill
                className="w-full h-full"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                placeholder="Write Details about the job..."
            />
        </div>
    );
}

export default Writearticle;
