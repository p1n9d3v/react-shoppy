import { addProduct } from 'apis';
import { uploadToStorage } from 'apis/storage';
import Button from 'components/ui/Button';
import { useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { IoMdCloseCircleOutline } from 'react-icons/io';

function NewProduct() {
    const [product, setProduct] = useState({});
    const [file, setFile] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !file ||
            !product.title ||
            !product.description ||
            !product.categories ||
            !product.options
        )
            return;

        const categories = product.categories.split(',');
        const options = product.options.split(',');
        try {
            const result = await addProduct({
                title: product.title,
                description: product.description,
                categories,
                options,
                price: Number(product.price)
            });
            await uploadToStorage(
                file,
                `products/${result.id}.${file.type.split('/')[1]}`
            );
        } catch (error) {
            console.log(error);
            alert('상품 등록에 실패했습니다.');
        } finally {
            setFile(null);
            setProduct({});
        }
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
        <section className="p-12">
            <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                <div>
                    {file ? (
                        <div className="relative">
                            <img
                                src={file && URL.createObjectURL(file)}
                                className="w-full object-cover max-h-1200"
                                alt="preview"
                            />

                            <IoMdCloseCircleOutline
                                size={32}
                                className="absolute top-8 right-8 cursor-pointer"
                                onClick={() => setFile(null)}
                            />
                        </div>
                    ) : (
                        <>
                            <label
                                htmlFor="file"
                                className="cursor-pointer h-400 w-full border-4 border-dotted flex items-center justify-center"
                            >
                                <CiCirclePlus size={70} />
                            </label>
                            <input
                                id="file"
                                type="file"
                                accept="image/*"
                                name="file"
                                required
                                onChange={handleChange}
                                className="hidden"
                            />
                        </>
                    )}
                </div>
                <div>
                    <label htmlFor="title">제품명</label>
                    <input
                        type="text"
                        name="title"
                        value={product.title ?? ''}
                        placeholder="제품명"
                        required
                        onChange={handleChange}
                        className="w-full  border-2 border-gray-300 p-12 rounded-[8px]"
                    />
                </div>

                <div>
                    <label htmlFor="title">카테고리</label>
                    <input
                        type="text"
                        name="categories"
                        value={product.categories ?? ''}
                        placeholder="카테고리"
                        required
                        onChange={handleChange}
                        className="w-full  border-2 border-gray-300 p-12 rounded-[8px]"
                    />
                </div>

                <div>
                    <label htmlFor="title">설명</label>
                    <textarea
                        type="text"
                        name="description"
                        value={product.description ?? ''}
                        placeholder="제품 설명"
                        required
                        onChange={handleChange}
                        className="w-full  border-2 border-gray-300 p-12 rounded-[8px]  h-400"
                    />
                </div>

                <div>
                    <label htmlFor="title">옵션</label>
                    <input
                        type="text"
                        name="options"
                        value={product.options ?? ''}
                        placeholder="옵션(,로 구분)"
                        required
                        onChange={handleChange}
                        className="w-full  border-2 border-gray-300 p-12 rounded-[8px]"
                    />
                </div>

                <div>
                    <label htmlFor="title">가격</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price ?? 0}
                        placeholder="옵션(,로 구분)"
                        required
                        onChange={handleChange}
                        className="w-full  border-2 border-gray-300 p-12 rounded-[8px]"
                    />
                </div>
                <Button size="full">등록</Button>
            </form>
        </section>
    );
}

export default NewProduct;
