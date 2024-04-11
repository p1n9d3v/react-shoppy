import { uploadToStorage } from 'apis/storage';
import Button from 'components/ui/Button';
import { useState } from 'react';

function NewProduct() {
    const [product, setProduct] = useState({});
    const [file, setFile] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !product.title) return;

        const uploadResult = await uploadToStorage(
            file,
            `products/${product.title}.${file.type.split('/')[1]}`
        );
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setFile(files && files[0]);
            return;
        }
        setProduct((product) => ({
            ...product,
            [name]: value
        }));
    };

    return (
        <section>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="file"
                    accept="image/*"
                    name="file"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="title"
                    value={product.title ?? ''}
                    placeholder="제품명"
                    required
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="category"
                    value={product.category ?? ''}
                    placeholder="카테고리"
                    required
                    onChange={handleChange}
                />
                <textarea
                    type="text"
                    name="description"
                    value={product.description ?? ''}
                    placeholder="제품 설명"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="options"
                    value={product.options ?? ''}
                    placeholder="옵션(,로 구분)"
                    required
                    onChange={handleChange}
                />
                <Button size="full">등록</Button>
            </form>
        </section>
    );
}

export default NewProduct;
