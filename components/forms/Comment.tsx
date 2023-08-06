"use client"

import { useForm } from 'react-hook-form';
import * as z from "zod"
import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import {Input} from '@/components/ui/input'
import {zodResolver} from '@hookform/resolvers/zod'

import { usePathname,useRouter } from 'next/navigation';
import {CommentValidation } from '@/lib/validations/thread';
import { Textarea } from '../ui/textarea';
import { createThread } from '@/lib/actions/thread.actions';
import Image from 'next/image';

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({threadId,currentUserImg,currentUserId}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
        thread: '',
    }
  })

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    // await createThread({
    //     text: values.thread,
    //     author: userId,
    //     communityId: null,
    //     path: pathname
    // });

    router.push("/")
  }

  return (
    <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="comment-form">
         <FormField
        control={form.control}
        name="thread"
        render={({ field }) => (
          <FormItem className='flex w-full items-center gap-3'>
            <FormLabel>
                <Image
                  src={currentUserImg}
                  alt='Profile image'
                  width={48}
                  height={48}
                  className='rounded-full object-cover'
                />
            </FormLabel>
            <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
              <Input
                type='Text'
                placeholder='Comment...'
                className='no-focus text-light-1 outline-none'
                {...field}
             />
            </FormControl>
            </FormItem>
        )}
      />
 
      <Button type='submit' className='comment-form_btn '>
            Reply
      </Button>
        </form>
    </Form>
  )
}

export default Comment