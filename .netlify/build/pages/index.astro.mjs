/* empty css                                 */
import { e as createComponent, m as maybeRenderHead, r as renderTemplate, i as renderComponent } from '../chunks/astro/server_Ct226vxg.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_Bm93SrEs.mjs';
import { $ as $$ReferralCard } from '../chunks/ReferralCard_p6AdQwcc.mjs';
import { $ as $$CategoryCard } from '../chunks/CategoryCard_BzG57cfO.mjs';
import 'clsx';
import { s as supabase } from '../chunks/supabase_DccqxBou.mjs';
export { renderers } from '../renderers.mjs';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-primary-700 text-white rounded-lg shadow-md overflow-hidden"> <div class="px-6 py-8 md:px-8"> <h1 class="text-3xl font-bold mb-2">Find and Share Referral Codes</h1> <p class="text-primary-100 mb-6 max-w-2xl">
Discover referral codes for your favorite apps and services. Save money on your first purchase and help others do the same.
</p> <div class="flex flex-col sm:flex-row gap-3"> <a href="/referrals" class="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white">
Browse Referrals
</a> <a href="/categories" class="inline-flex justify-center items-center px-4 py-2 border border-white text-sm font-medium rounded-md shadow-sm text-white bg-transparent hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white">
View Categories
</a> </div> </div> </div>`;
}, "/home/project/src/components/Hero.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { data: featuredReferrals } = await supabase.from("referral_codes").select("*, categories(name)").order("created_at", { ascending: false }).limit(6);
  const { data: categoriesWithCounts } = await supabase.from("categories").select(`
    id,
    name,
    slug,
    description,
    referral_codes:referral_codes(count)
  `).order("name");
  const categories = categoriesWithCounts?.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    count: category.referral_codes.length
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "ReferralHub - Find and Share Referral Codes" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${maybeRenderHead()}<section class="mt-8"> <div class="flex justify-between items-center mb-4"> <h2 class="text-2xl font-bold text-gray-900">Featured Referral Codes</h2> <a href="/referrals" class="text-primary-600 hover:text-primary-800 text-sm font-medium">View all</a> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> ${featuredReferrals && featuredReferrals.map((referral) => renderTemplate`${renderComponent($$result2, "ReferralCard", $$ReferralCard, { "id": referral.id, "appName": referral.app_name, "code": referral.code, "description": referral.description, "url": referral.url, "userBenefit": referral.user_benefit, "referrerBenefit": referral.referrer_benefit })}`)} </div> </section> <section class="mt-10"> <div class="flex justify-between items-center mb-4"> <h2 class="text-2xl font-bold text-gray-900">Browse Categories</h2> <a href="/categories" class="text-primary-600 hover:text-primary-800 text-sm font-medium">View all</a> </div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> ${categories && categories.map((category) => renderTemplate`${renderComponent($$result2, "CategoryCard", $$CategoryCard, { "id": category.id, "name": category.name, "slug": category.slug, "description": category.description, "count": category.count })}`)} </div> </section> ` })}`;
}, "/home/project/src/pages/index.astro", void 0);

const $$file = "/home/project/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
