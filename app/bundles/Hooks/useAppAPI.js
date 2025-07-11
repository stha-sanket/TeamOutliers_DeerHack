const apiSlug = "http://localhost:2000"

function generateKey() {
    return new Date().getTime().toString(22)
}

export default function useAppAPIServer() {
    async function POST(slug, options, __file, __headers = {}) {
        slug = `${slug}${slug?.includes("?") ? "&" : "?"}key=${generateKey()}`
        __headers = __file ? __headers : { "Content-Type": "application/json", ...__headers }

        slug = apiSlug + slug

        let response = await fetch(slug, {
            method: "POST",
            headers: __headers,
            body: __file ? options : JSON.stringify(options)
        });

        response = await response.json();
        return response;
    }

    async function UPLOAD(slug, options, files, __headers = {}) {
        let formData = new FormData();
        if (options) {
            formData.append("form", JSON.stringify(options));
        }

        if (files) {
            if (Array.isArray(files)) {
                files.forEach((file) => {
                    formData.append(`file`, file);
                });
            } else {
                formData.append("file", files);
            }
        }

        return await POST(slug, formData, true, __headers);
    }

    async function GET(slug, __file, __headers = {}) {
        slug = `${slug}${slug?.includes("?") ? "&" : "?"}key=${generateKey()}`

        slug = apiSlug + slug

        let response = await fetch(slug, {
            method: "GET",
            headers: __headers,
        });

        response = __file ? await response.blob() : await response.json();
        return response;
    }

    async function DOWNLOAD(slug, expectedType = false, __headers = {}) {
        const blob = await GET(slug, true, __headers);

        if (expectedType && blob?.type !== expectedType) {
            return false;
        }

        return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    async function PUT(slug, options, __file, __headers = {}) {
        __headers = __file ? __headers : { "Content-Type": "application/json", ...__headers };

        slug = `${slug}${slug?.includes("?") ? "&" : "?"}key=${generateKey()}`

        slug = apiSlug + slug

        let response = await fetch(slug, {
            method: "PUT",
            headers: __headers,
            body: __file ? options : JSON.stringify(options),
        });

        response = await response.json();
        return response;
    }

    async function DELETE(slug, options = {}, __file = false, __headers = {}) {
        __headers = __file ? __headers : { "Content-Type": "application/json", ...__headers };

        slug = `${slug}${slug?.includes("?") ? "&" : "?"}key=${generateKey()}`

        slug = apiSlug + slug

        let response = await fetch(slug, {
            method: "DELETE",
            headers: __headers,
            body: __file ? options : JSON.stringify(options),
        });

        response = await response.json();
        return response;
    }

    return {
        POST,
        GET,
        DOWNLOAD,
        UPLOAD,
        PUT,
        DELETE,
    };
}
