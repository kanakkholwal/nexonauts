import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { HiOutlineUpload } from "react-icons/hi";
import { MdOutlineCloudDone } from "react-icons/md";
import { product_types } from "src/lib/marketplace/item-types";
import { handleFiles } from "src/lib/marketplace/upload-image";
import type { newProductType } from "src/types/product";
import type { SessionUserType } from "src/types/user";

// import { Editor } from "./editor";

type ImagePreviewType = {
    file: File | null,
    preview: string,
    uploaded: boolean,
    error: boolean,
    uploading: boolean,
    uploaded_url: string,
    error_message: string,
}

export default function ProductForm({ user }: { user: SessionUserType }) {

    const [product, setProduct] = useState<newProductType>({
        title: "",
        short_description: "",
        description: "",
        price: {
            amount: 0,
            currency: "USD"
        },
        product_type: "",
        category: "",
        coverImage: "",
        creator: {
            userId: user._id,
            username: user.username,
            profilePicture: user.profilePicture.toString(),
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [coverImage, setCoverImage] = useState<ImagePreviewType>({
        file: null,
        preview: "",
        uploaded: false,
        error: false,
        uploading: false,
        uploaded_url: "",
        error_message: "",
    })

    return (<>
        <section className="w-full p-3  mt-4 ">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Add a new product
                    </CardTitle>
                    <CardDescription>
                        Add a new product to your store
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-1">
                            <Label>
                                Product title
                            </Label>
                            <Input placeholder="Product title"
                                variant="fluid"
                                minLength={5}
                                value={product.title}
                                onChange={(e) => setProduct({ ...product, title: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-1">
                            <Label>
                                Product short description
                            </Label>
                            <Textarea placeholder="Product short_description"
                                variant="fluid"
                                minLength={10}
                                maxLength={100}
                                rows={3}
                                value={product.short_description}
                                onChange={(e) => setProduct({ ...product, short_description: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-1">
                            <Label>
                                Product description
                            </Label>

                            <Textarea placeholder="Product description"
                                variant="fluid"
                                minLength={10}
                                rows={5}
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center flex-wrap gap-2  ">


                            <div className="grid grid-cols-1 max-w-xs">
                                <Label>
                                    Product price
                                </Label>
                                <div className="relative max-w-xs">
                                    <Input placeholder="Product price"
                                        variant="fluid"
                                        type="number"
                                        pattern="[0-9]*"
                                        className="pr-16 max-w-xs"
                                        value={product.price.amount}
                                        onChange={(e) => setProduct({
                                            ...product, price: {
                                                amount: parseFloat(e.target.value) < 0 ? 0 : parseFloat(e.target.value),
                                                currency: "USD"
                                            }
                                        })}
                                    />
                                    <span className="absolute top-0 bottom-0 right-0 flex items-center px-3 text-slate-900 text-sm font-medium  rounded-r-md">
                                        <span className="text-slate-900">USD</span>
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1">
                                <Label>
                                    Product Type
                                </Label>
                                <Select
                                    value={product.product_type}
                                    onValueChange={(value) => {
                                        setProduct({ ...product, product_type: value })
                                    }}>
                                    <SelectTrigger className="w-[180px] capitalize border border-solid border-transparent bg-slate-100 text-slate-900 focus:border-primary/70">
                                        <SelectValue placeholder="Select a Type" className="capitalize" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {product_types.map((type) => {
                                            return <SelectItem key={type} value={type} className="capitalize">{type}</SelectItem>
                                        })}

                                    </SelectContent>
                                </Select>

                            </div>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="coverImage">Cover Image
                                {coverImage.uploaded && <span className="text-green-500 font-semibold ml-2"><MdOutlineCloudDone className="h-5 w-5 ml-2 inline-block" /></span>}
                                {coverImage.uploading ? <span className="text-gray-500 animate-pulse"><CgSpinner className="animate-spin h-5 w-5 mr-2 inline-block" /> </span> : null}
                            </Label>
                            {coverImage.error && <p className="text-red-500">{coverImage.error_message}</p>}

                            {/* cover Image preview*/}
                            <div className="grid grid-cols-1 gap-2">
                                {coverImage.preview && <img src={coverImage.preview} alt="preview" className={"w-96 h-64 object-cover rounded-md shadow-lg shadow-slate-300" + (coverImage.uploading ? " animate-pulse" : "")} />}
                            </div>
                            <div className="flex items-center gap-2">

                                <Input id="coverImage" type="file"
                                    accept="image/*"
                                    variant={"fluid"}
                                    onChange={(e) => {
                                        const files = e.target.files;
                                        if (files && files.length > 0) {
                                            setCoverImage({
                                                ...coverImage,
                                                file: files[0],
                                                preview: URL.createObjectURL(files[0]),
                                                uploading: false,
                                            })
                                        }
                                    }}
                                />
                                <Button
                                    disabled={coverImage.uploading || coverImage.uploaded || coverImage.error || !coverImage.file}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (!coverImage.file) {
                                            toast.error("Please select an image");
                                            return;
                                        }
                                        setCoverImage({ ...coverImage, uploading: true });
                                        toast.promise(handleFiles([coverImage.file]).then((file: any) => {
                                            console.log(file);

                                            setCoverImage({
                                                ...coverImage,
                                                uploaded: true,
                                                uploaded_url: file.secure_url,
                                                uploading: false,
                                            })
                                            setProduct({ ...product, coverImage: file.secure_url })
                                        }).catch((err) => {
                                            console.log(err);
                                            setCoverImage({
                                                ...coverImage,
                                                uploaded_url: "",
                                                uploading: false,
                                                error: true,
                                                error_message: err.message,
                                            })
                                        }),
                                            {
                                                loading: 'Uploading image...',
                                                success: 'Image uploaded',
                                                error: 'Error uploading image',
                                            }
                                        );
                                    }}>
                                    {coverImage.uploading ? <CgSpinner className="animate-spin h-5 w-5 mr-2" /> : <HiOutlineUpload className="h-5 w-5 mr-2" />}
                                    {coverImage.uploading ? "Uploading..." : "Upload"}
                                </Button>
                            </div>
                        </div>

                        {/* image previews */}
                        {/* <div className="grid grid-cols-6 gap-2">
                            {imagesPreview.map((image) => {
                                return <img key={image} src={image} alt="preview" className="w-96 h-64 object-cover rounded-md" />
                            })}
                        </div> */}
                    </div>

                </CardContent>
                <CardFooter>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        console.log(product);
                        //  validate product
                        if (product.title.length < 5) {
                            toast.error("Product name should be at least 5 characters");
                            return;
                        }
                        if (product.short_description.length < 10) {
                            toast.error("Product short description should be at least 10 characters");
                            return;
                        }
                        if (product.description.length < 10) {
                            toast.error("Product description should be at least 10 characters");
                            return;
                        }
                        if (product.product_type === "") {
                            toast.error("Please select a product type");
                            return;
                        }
                        if (product.price.amount <= 0) {
                            toast.error("Please enter a valid price");
                            return;
                        }
                        if (product.coverImage === "") {
                            toast.error("Please upload a cover image");
                            return;
                        }
                        setIsLoading(true);
                        //  submit product
                        toast.promise(fetch("/api/marketplace/products", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(product),
                        }).then((res) => {
                            if (res.ok) {
                                return res.json();
                            }
                            throw new Error("Error creating product");
                        }).then((data) => {
                            console.log(data);
                            toast.success("Product created");
                            setIsLoading(false);
                        }).catch((err) => {
                            console.log(err);
                            toast.error("Error creating product");
                            setIsLoading(false);
                        }), {
                            loading: "Creating product...",
                            success: "Product created",
                            error: "Error creating product",
                        })

                    }} className="max-w-sm w-full mx-auto" disabled={isLoading}>
                        {isLoading ? <CgSpinner className="animate-spin h-5 w-5 mr-2" /> : "Create Product"}

                    </Button>
                </CardFooter>
            </Card>

        </section>
    </>)
}