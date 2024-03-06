"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { UploadImage } from "src/components/uploader"
import { z } from "zod"
async function isValidImageUrl(url: string): Promise<boolean> {
    try {
        const response = await fetch(url, {
            method: 'HEAD'
        });

        // Check if the response status is within the range of successful responses for images
        if (response.ok && response.headers.get('Content-Type')?.startsWith('image/')) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        // Any error during fetching or response handling will result in returning false
        console.error('Error while validating image URL:', error);
        return false;
    }
}

const formSchema = z.object({
    name: z.string().min(3).max(100),
    description: z.string().min(10).max(1000),
    published: z.boolean(),
    url: z.string().url(),
    preview_url: z.string().url().refine((value) => {

        isValidImageUrl(value)
            .then(isValid => {
                if (isValid) {
                    console.log('Valid image URL');
                    return true;
                } else {
                    console.log('Not a valid image URL');
                    return false;
                }
            }).catch(error => {
                console.error('Error while validating image URL:', error);
                return false;
            })
    }, {
        message: 'Preview URL must be a valid image URL'
    }),
    tags: z.array(z.string()),
    categories: z.array(z.string()),
    price: z.string(),
})
const defaultCategories = [
    "Design",
    "Course",
    "Productivity",
    "Themes",
    "Templates",
    "UI Kits",

] as const
interface Props {
    saveProduct: (product: z.infer<typeof formSchema>) => Promise<boolean>
}
export default function ProductForm(props: Props) {
    // ...
    // 1. Define your form.
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            published: false,
            url: "",
            preview_url: "",
            tags: [],
            categories: [],
            price: "0",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        setLoading(true)
        toast.promise(props.saveProduct(values), {
            loading: "Saving product...",
            success: "Product saved!",
            error: "Error saving product",
        })
            .then((result) => {
                if (result) {
                    form.reset()
                }
            })
            .finally(() => {
                setLoading(false)
            })


    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="My Product" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Description (Markdown preferred)
                            </FormLabel>
                            <FormControl>
                                <Textarea placeholder="Description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Buying URL
                                <span className="text-sm text-gray-500 ml-2">
                                    (Gumroad, Sellfy, etc.)
                                </span>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="https://username.gumroad.com/l/product" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="preview_url"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>
                                Preview URL
                                <span className="text-sm text-gray-500"> (preffered 16 / 9)</span>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/preview.png" {...field} />
                            </FormControl>
                            <UploadImage
                                key={"preview_url"}
                                onUpload={(fileUrl) => {
                                    field.onChange(fileUrl)
                                }}
                            />
                            {fieldState.isTouched && !fieldState.isDirty && fieldState.invalid === false && (<>
                                <div>
                                    <Image src={field.value} width={512} height={320} alt={"preview image"} />
                                </div>
                            </>)}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <Input placeholder="tag1, tag2, tag3" {...field}
                                    value={field.value?.join(", ") || ""}
                                    onChange={(e) => {
                                        field.onChange(e.target.value.split(","))
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="categories"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Categories</FormLabel>
                                <FormDescription>
                                    Select the categories that best describe your product.
                                </FormDescription>
                            </div>
                            {defaultCategories.map((item, index) => (
                                <FormField
                                    key={item + "_" + index}
                                    control={form.control}
                                    name="categories"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={item}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, item])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== item
                                                                    )
                                                                )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {item}
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price (USD)
                                <span className="text-sm text-gray-500"> (leave blank for Free)</span>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="10.00" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center gap-2">
                    <FormField
                        control={form.control}
                        name="published"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-2 space-y-0">
                                <FormLabel className="mb-0">Published</FormLabel>
                                <FormControl>
                                    <Switch checked={field.value}
                                        onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button type="reset"
                        variant="destructive_light"
                        onClick={(e) => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit">
                        Save Product
                    </Button>
                </div>
            </form>
        </Form>
    )
}
