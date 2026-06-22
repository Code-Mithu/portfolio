'use client';

import React, { useState } from 'react';
import { blogPosts } from '@/lib/blogPosts';

export const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  return (
    <section className="py-16 bg-surface" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground mb-6 border-b border-border pb-2 uppercase tracking-wider">
          Blog & Insights
        </h2>
        <p className="text-center text-secondary mb-12 max-w-2xl mx-auto">
          Insights, tutorials, and stories from my journey bridging finance and technology.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-background rounded-lg border border-border hover:border-primary/50 transition-colors overflow-hidden flex flex-col cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {post.title}
                </h3>
                <p className="text-secondary text-sm mb-4 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                <time className="text-xs text-muted block mb-4">
                  {post.date}
                </time>
                <button
                  className="mt-auto inline-flex items-center text-primary font-medium hover:underline text-left"
                >
                  Read more →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal for displaying full article */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-background max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-background border-b border-border p-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-foreground">{selectedPost.title}</h2>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-muted hover:text-foreground transition-colors"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {selectedPost.image && (
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-64 object-cover"
              />
            )}
            
            <div className="p-8">
              <time className="text-sm text-muted block mb-6">
                {selectedPost.date}
              </time>
              
              <div className="prose prose-lg max-w-none text-secondary">
                {selectedPost.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('#')) {
                    const level = paragraph.match(/^#+/)?.[0].length || 1;
                    const text = paragraph.replace(/^#+\s*/, '');
                    const HeadingTag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;
                    return <HeadingTag key={index} className="text-foreground font-bold mt-8 mb-4">{text}</HeadingTag>;
                  }
                  if (paragraph.startsWith('```')) {
                    return <pre key={index} className="bg-surface p-4 rounded-lg overflow-x-auto my-4 text-sm">{paragraph.replace(/```\w*/, '')}</pre>;
                  }
                  if (paragraph.trim() === '') {
                    return <br key={index} />;
                  }
                  if (paragraph.startsWith('-') || paragraph.startsWith('*')) {
                    return <li key={index} className="ml-4">{paragraph.replace(/^[-*]\s*/, '')}</li>;
                  }
                  return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
