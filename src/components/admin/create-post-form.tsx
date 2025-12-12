'use client';

import { useState, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';

import { createPost, editPost } from '@/lib/supabase/model';
import { generateSignedUploadUrl } from '@/lib/supabase/storage';
import { createClient } from '@/lib/supabase/client';
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

interface CreatePostFormData {
  category: string;
  content: string;
  excerpt: string;
  is_published: boolean;
  published_at: string;
  slug: string;
  tags: string[] | null;
  title: string;
  updated_at: string | null;
  image: File | null;
}

interface FormStatus {
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

const INITIAL_FORM_DATA: CreatePostFormData = {
  category: '',
  content: '',
  excerpt: '',
  is_published: false,
  published_at: new Date().toLocaleDateString(),
  slug: '',
  tags: [],
  title: 'New Post',
  updated_at: null,
  image: null,
};

const INITIAL_STATUS: FormStatus = {
  isLoading: false,
  error: null,
  success: null,
};

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export function CreatePostForm() {
  const [formData, setFormData] =
    useState<CreatePostFormData>(INITIAL_FORM_DATA);
  const [status, setStatus] = useState<FormStatus>(INITIAL_STATUS);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFieldChange = useCallback(
    (field: keyof CreatePostFormData, value: string | boolean) => {
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

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentFile = e.target.files?.[0] || null;
      if (!currentFile) return;
      if (currentFile.size > 2 * 1024 * 1024) {
        setStatus({
          isLoading: false,
          error: 'File too large. Max allowed size is 2 MB.',
          success: null,
        });

        e.target.value = '';
        setFormData((prev) => ({ ...prev, image: null }));
        return;
      }
      setFormData((prevData) => ({
        ...prevData,
        image: currentFile,
      }));
      if (status.error || status.success) {
        setStatus(INITIAL_STATUS);
      }
    },
    [status.error, status.success]
  );

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ isLoading: true, error: null, success: null });
    // todo: make validate function
    if (!formData.image) {
      setStatus({
        isLoading: false,
        error: 'No image selected. Please select an image.',
        success: null,
      });
      return;
    }
    const filename = formData.image.name;

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
      const { data: insertData, error } = await createPost(data);
      if (insertData) {
        setStatus({
          isLoading: false,
          error: null,
          success: `Post added to issue with ID ${insertData.id} ${'\n'} Title: ${trimmedTitle}. Uploading image...`,
        });
        const finalFilename = `post-${insertData.id}-${filename}`;
        const { data: signedUrl, error: signedUrlError } =
          await generateSignedUploadUrl(`blog/${finalFilename}`);
        if (signedUrlError) {
          setStatus({
            isLoading: false,
            error: signedUrlError,
            success: null,
          });
          return;
        }
        if (signedUrl) {
          setStatus({
            isLoading: true,
            error: null,
            success: `URL Generated for Image. Uploading...`,
          });
          const supabase = createClient();
          const { data: uploadData, error: uploadError } =
            await supabase.storage
              .from('images')
              .uploadToSignedUrl(
                signedUrl.path,
                signedUrl.token,
                formData.image,
                {
                  cacheControl: '31536000',
                }
              );
          if (uploadError) {
            setStatus({
              isLoading: false,
              error: `Upload failed: ${uploadError}`,
              success: null,
            });
            return;
          }
          if (uploadData) {
            setStatus({
              isLoading: false,
              error: null,
              success: `Image has been uploaded! PATH: ${uploadData.path}. Adding to blog post...`,
            });
            const p = {
              ...insertData,
              img_path: uploadData.path,
            };
            const { data: imageData, error: imageError } = await editPost(p);
            if (imageError || !imageData) {
              setStatus({
                isLoading: false,
                error: `Failed to add image to post. Contact a dev. ${uploadError}`,
                success: null,
              });
              return;
            }
            resetForm();
            return;
          }
        }
      } else {
        setStatus({ isLoading: false, error: error, success: null });
      }
    } catch (e) {
      let errorMessage =
        'Could not create Post. Please try again or contact an admin.';
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
        <h1 className='mb-4 text-4xl'>New Post Form</h1>
      </div>

      <div className='max-w-full'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Label htmlFor='image' className='text-xl'>
              Image*
            </Label>
            <Input
              id='image'
              name='image'
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              ref={fileInputRef}
              disabled={status.isLoading}
              required
            />
            <p className='mt-1 text-sm text-gray-500'>2 MB file size limit</p>
          </div>
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
              placeholder='(e.g., How to Become an Athlete)'
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
              placeholder='(e.g., hello-this-is-an-example-slug)'
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
              placeholder='(e.g., Episode Recap, Story, etc)'
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
              placeholder='(e.g., The ARC team dive into Episode 45)'
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
            {status.isLoading ? 'Processing...' : 'Create Post'}
          </Button>
        </form>
      </div>
    </section>
  );
}
