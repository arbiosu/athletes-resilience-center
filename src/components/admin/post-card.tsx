'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { deletePostById } from '@/lib/supabase/model';
import type { Post } from '@/lib/supabase/types';

import { Card, CardContent, CardTitle, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function AdminPostCard({ post }: { post: Post }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleDelete = async () => {
    await deletePostById(post.id);
    setShowDeleteConfirm(false);
  };
  return (
    <Card className='mx-auto w-full max-w-sm border-2 border-zinc-300'>
      <CardHeader>
        <CardTitle className='text-center text-2xl'>{post.title}</CardTitle>
        <div className='mx-auto'>
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${post.img_path}`}
            alt={`${post.title}-${post.excerpt}-${post.category}`}
            width={64}
            height={64}
            unoptimized
          />
        </div>
      </CardHeader>
      <CardContent>
        <p>• URL Slug: /blog/{post.slug}</p>
        <p>• Created on {new Date(post.created_at).toLocaleString()}</p>
        <p className='font-bold'>
          • {post.is_published ? 'Published' : 'Draft'}
        </p>
      </CardContent>
      <Button asChild className='mx-auto bg-purple-500'>
        <Link href={`/admin/posts/edit/${post.id}`}>Edit Post</Link>
      </Button>
      <Button
        onClick={() => setShowDeleteConfirm(true)}
        className='mx-auto bg-red-500'
      >
        Delete Post
      </Button>
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the article: {post.title}. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className='bg-rose-600 hover:bg-rose-700'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
