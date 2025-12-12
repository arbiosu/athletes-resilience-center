'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

import { editPost } from '@/lib/supabase/model';
import type { Post } from '@/lib/supabase/types';
import { isValidSlug } from '@/lib/utils';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface EditPostFormData {
  id: string;
  category: string;
  content: string;
  excerpt: string;
  is_published: boolean;
  published_at: string;
  slug: string;
  tags: string[] | null;
  title: string;
  updated_at: string | null;
}

interface FormStatus {
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

const INITIAL_STATUS: FormStatus = {
  isLoading: false,
  error: null,
  success: null,
};

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export function EditPostForm({ post }: { post: Post }) {
  const [formData, setFormData] = useState<EditPostFormData>({
    id: post.id,
    category: post.category ?? '',
    content: post.content ?? '',
    excerpt: post.excerpt ?? '',
    is_published: post.is_published,
    published_at: post.published_at ?? '',
    slug: post.slug,
    tags: post.tags,
    title: post.title,
    updated_at: post.updated_at,
  });
  const [status, setStatus] = useState<FormStatus>(INITIAL_STATUS);

  const handleFieldChange = useCallback(
    (field: keyof EditPostFormData, value: string | boolean) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      if (status.error || status.success) {
        setStatus(INITIAL_STATUS);
      }
    },
    [status.error, status.success]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ isLoading: true, error: null, success: null });

    const trimmedTitle = formData.title.trim();
    if (!trimmedTitle) {
      setStatus({
        isLoading: false,
        error: 'Title is required',
        success: null,
      });
      return;
    }

    const trimmedSlug = formData.slug.trim();
    if (!trimmedSlug) {
      setStatus({
        isLoading: false,
        error: 'Title is required',
        success: null,
      });
      return;
    }

    if (!isValidSlug(trimmedSlug)) {
      setStatus({
        isLoading: false,
        error: 'This slug is not valid is required',
        success: null,
      });
      return;
    }
    try {
      const data = {
        id: formData.id,
        category: formData.category,
        content: formData.content,
        excerpt: formData.excerpt,
        is_published: formData.is_published,
        published_at: formData.published_at,
        slug: trimmedSlug,
        tags: formData.tags,
        title: trimmedTitle,
        updated_at: formData.updated_at,
      };
      const { data: insertData, error } = await editPost(data);
      if (insertData) {
        setStatus({
          isLoading: false,
          error: null,
          success: `Post edited with ID ${insertData.id} ${'\n'} Title: ${trimmedTitle}`,
        });
      } else {
        setStatus({ isLoading: false, error: error, success: null });
      }
    } catch (e) {
      let errorMessage =
        'Could not edit Post. Please try again or contact an admin.';
      if (e instanceof Error) {
        errorMessage = `Failed to create content: ${e.message}`;
      }
      setStatus({ isLoading: false, error: errorMessage, success: null });
    }
  };

  const isSubmitDisabled = status.isLoading || !formData.title.trim();

  return (
    <section id='form'>
      <div className='flex justify-center'>
        <h1 className='mb-4 text-xl'>Edit Post Form</h1>
      </div>

      <div className='max-w-full'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Label htmlFor='title'>Title* - cAsE SeNsItivE</Label>
            <Input
              id='title'
              type='text'
              name='title'
              value={formData.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              disabled={status.isLoading}
              required
              placeholder='(e.g., How to Become An Athlete)'
            />
          </div>
          <div>
            <Label htmlFor='slug'>Slug*</Label>
            <Input
              id='slug'
              type='text'
              name='slug'
              value={formData.slug}
              onChange={(e) => handleFieldChange('slug', e.target.value)}
              disabled={status.isLoading}
              required
              placeholder='(e.g., hello-example-slug)'
            />
          </div>
          <div>
            <Label htmlFor='content' className='text-xl'>
              Content*
            </Label>
            <MDEditor
              value={formData.content}
              onChange={(value = '') =>
                setFormData((prev) => ({ ...prev, content: value }))
              }
              height={500}
              preview='edit'
              textareaProps={{
                name: 'content',
                id: 'content',
                required: true,
              }}
            />
          </div>
          <div>
            <Label htmlFor='published'>Published Status*</Label>
            <Select
              onValueChange={(value) =>
                handleFieldChange('is_published', value === 'true')
              }
              value={formData.is_published ? 'true' : 'false'}
              disabled={status.isLoading}
              name='published'
              required
            >
              <SelectTrigger id='published'>
                <SelectValue placeholder='Select status...' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'true'}>Published</SelectItem>
                <SelectItem value={'false'}>Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor='published_at'>
              Publication Date* - {formData.published_at}
            </Label>
            <Input
              id='published_at'
              type='date'
              name='published_at'
              value={formData.published_at}
              onChange={(e) =>
                handleFieldChange('published_at', e.target.value)
              }
            />
          </div>
          <div>
            <Label htmlFor='category'>Category*</Label>
            <Input
              id='category'
              type='text'
              name='category'
              value={formData.category}
              onChange={(e) => handleFieldChange('category', e.target.value)}
              disabled={status.isLoading}
              required
              placeholder='(e.g., )'
            />
          </div>
          <div>
            <Label htmlFor='excerpt'>Excerpt*</Label>
            <Input
              id='excerpt'
              type='text'
              name='excerpt'
              value={formData.excerpt}
              onChange={(e) => handleFieldChange('excerpt', e.target.value)}
              disabled={status.isLoading}
              required
              placeholder='(e.g., )'
            />
          </div>

          <div className='mt-4 min-h-[20px]'>
            {' '}
            {status.error && (
              <p className='text-red-600'>ERROR: {status.error}</p>
            )}
            {status.success && (
              <p className='text-green-600'>SUCCESS: {status.success}</p>
            )}
          </div>
          <Button
            type='submit'
            variant={'outline'}
            size='lg'
            disabled={isSubmitDisabled}
            className='bg-emerald-600 disabled:bg-emerald-600/10'
          >
            {status.isLoading ? 'Processing...' : 'Edit Post'}
          </Button>
        </form>
      </div>
    </section>
  );
}
