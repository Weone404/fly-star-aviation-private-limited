import { BLOG_POSTS } from './blogData.js'
import type { BlogPost } from '@/types/blog'

/**
 * Topic clusters for the blog.
 *
 * The blog had four categories that were really just labels: one of them held a
 * single post, and none of them had a URL. A reader who wanted "everything about
 * the DGCA papers" had a filter chip and nothing to link to; a crawler had
 * nothing at all. These clusters give the three substantial groups a page each,
 * an ordered reading sequence, and a place for the internal links to point.
 *
 * `category` on a post is the cluster name — one taxonomy, so the two cannot
 * drift. Membership is derived from it rather than listed twice; `order` fixes
 * the reading sequence, which is not the publication order.
 *
 * A cluster earns a hub page only if it has three or more indexable posts.
 * Careers holds two, one of which is deliberately kept out of the sitemap, so it
 * stays a label on the listing until there is enough behind it. A hub page over
 * one post is a thin page with a nice name.
 */

export type Topic = {
  slug: string
  /** Must match the `category` value on the posts in this cluster. */
  category: string
  name: string
  /**
   * The on-page H1. Deliberately not the same string as `name`: `name` is the
   * short label a breadcrumb and a nav chip need, while the H1 has to carry the
   * terms people actually search for.
   */
  h1: string
  /** <title> for the hub page. */
  title: string
  /** Meta description for the hub page. */
  description: string
  /** One-sentence answer to "what is this cluster". Rendered as the lede. */
  summary: string
  /** Orientation prose. Navigational — it states no figure of its own. */
  intro: string[]
  /** Reading order, by slug. Anything not listed sorts after, by date. */
  order: string[]
}

export const TOPICS: Topic[] = [
  {
    slug: 'dgca-exams',
    category: 'DGCA Exams',
    name: 'DGCA exams',
    h1: 'DGCA Exam Guide: Subjects, Fees, Validity and Attempts',
    title: 'DGCA Exams: Fees, Subjects, Validity and Attempts',
    description:
      'Everything the DGCA theory examinations involve — subjects by licence, the fee, how long a pass stays valid, and the claims that are wrong.',
    summary:
      'The DGCA Flight Crew theory papers, taken one question at a time: who may appear, what each licence is examined on, what a paper costs, and how long a pass lasts.',
    intro: [
      'Almost everything published about the DGCA papers is second-hand, and a surprising amount of it is wrong. The pages in this cluster each answer one question, and every figure on them is checked against DGCA’s own Civil Aviation Requirements or its Pariksha Flight Crew FAQ before it is published.',
      'If you are starting from zero, read them in the order below. Fees and subjects settle what you are signing up for; validity and attempts settle how long you have; the misconceptions page exists because four of the claims it corrects cost candidates real money.',
    ],
    order: [
      'dgca-exam-subjects-by-licence',
      'dgca-exam-fees',
      'dgca-exam-attempts-and-validity',
      'dgca-olode-vs-regular-exams',
      'dgca-exam-misconceptions',
      'dgca-board-verification-certificate',
    ],
  },
  {
    slug: 'licences-and-eligibility',
    category: 'Licences & Eligibility',
    name: 'Licences and eligibility',
    h1: 'Pilot Licence Eligibility in India: CPL, ATPL and Foreign Conversion',
    title: 'Pilot Licence Eligibility in India: CPL, ATPL and Conversions',
    description:
      'What DGCA requires before you can appear for CPL and ATPL theory papers, and what converting a foreign licence actually involves.',
    summary:
      'What each Indian pilot licence requires of you before you can appear at all — schooling, an existing licence, or currency on a rating earned abroad.',
    intro: [
      'Eligibility is the question people get wrong earliest and pay for longest: candidates prepare for the wrong licence, assume a subject combination they do not have, or return from training abroad to find a currency clause has already run out.',
      'These pages state the requirement as the regulation states it, and say plainly where a figure could not be sourced rather than repeating the number everyone else prints.',
    ],
    order: ['cpl-eligibility-after-12th', 'atpl-eligibility-india', 'foreign-licence-conversion-checklist'],
  },
  {
    slug: 'choosing-training',
    category: 'Choosing Training',
    name: 'Choosing training',
    h1: 'DGCA Ground Classes and Flying Schools in India: How to Choose',
    title: 'Choosing Ground Classes and a Flying School in India',
    description:
      'How to judge DGCA ground classes and a flying training organisation before you pay — what to verify, what to ask, and what ends the conversation.',
    summary:
      'How to judge a ground school or a flying training organisation before money changes hands, and what the regulator does and does not certify about either.',
    intro: [
      'We run ground classes, which is exactly why these pages carry no ranking and no recommendation. They carry the checks you can make yourself: what to verify with the regulator, what to ask a school, and which answers should end the conversation.',
      'Start with whether you need classes at all. The answer is not obvious, and it is not the one an institute is likely to give you.',
    ],
    order: [
      'dgca-ground-classes-vs-self-study',
      'how-to-choose-dgca-ground-classes',
      'how-to-choose-a-flying-school-in-india',
    ],
  },
]

const BY_CATEGORY = new Map(TOPICS.map((t) => [t.category, t]))
const BY_SLUG = new Map(TOPICS.map((t) => [t.slug, t]))

export function topicBySlug(slug?: string): Topic | undefined {
  return slug ? BY_SLUG.get(slug) : undefined
}

/** The cluster a post belongs to, or undefined for a post in a labelled group. */
export function topicOf(post?: Pick<BlogPost, 'category'> | null): Topic | undefined {
  return post?.category ? BY_CATEGORY.get(post.category) : undefined
}

/** Posts in a cluster, in reading order rather than publication order. */
export function postsInTopic(topic: Topic, all: BlogPost[] = BLOG_POSTS as BlogPost[]): BlogPost[] {
  const members = all.filter((p) => p.category === topic.category && p.slug)
  const rank = (p: BlogPost) => {
    const i = topic.order.indexOf(p.slug as string)
    return i === -1 ? topic.order.length : i
  }
  return members.sort((a, b) => rank(a) - rank(b))
}

/** Previous and next post within the cluster, for in-article navigation. */
export function neighboursInTopic(post: BlogPost, all: BlogPost[] = BLOG_POSTS as BlogPost[]) {
  const topic = topicOf(post)
  if (!topic) return { topic: undefined, prev: undefined, next: undefined, position: 0, total: 0 }
  const list = postsInTopic(topic, all)
  const i = list.findIndex((p) => p.slug === post.slug)
  return {
    topic,
    prev: i > 0 ? list[i - 1] : undefined,
    next: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined,
    position: i + 1,
    total: list.length,
  }
}

/** Every distinct source named across a post's key facts, in first-seen order. */
export function sourcesOf(post: BlogPost): { source: string; href?: string }[] {
  const seen = new Map<string, { source: string; href?: string }>()
  for (const f of post.keyFacts || []) {
    if (!seen.has(f.source)) seen.set(f.source, { source: f.source, href: f.href })
  }
  return Array.from(seen.values())
}
