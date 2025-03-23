/* empty css                                 */
import { e as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CrNoV3M9.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DCOM5V2o.mjs';
import { $ as $$CategoryCard } from '../chunks/CategoryCard_VPvERSic.mjs';
import { s as supabase } from '../chunks/supabase_DccqxBou.mjs';
export { renderers } from '../renderers.mjs';

const $$Categories = createComponent(async ($$result, $$props, $$slots) => {
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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Categories - ReferralHub" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-7xl mx-auto"> <h1 class="text-3xl font-bold text-gray-900 mb-6">Browse Categories</h1> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"> ${categories && categories.map((category) => renderTemplate`${renderComponent($$result2, "CategoryCard", $$CategoryCard, { "id": category.id, "name": category.name, "slug": category.slug, "description": category.description, "count": category.count })}`)} </div> </div> ` })}`;
}, "/home/project/src/pages/categories.astro", void 0);

const $$file = "/home/project/src/pages/categories.astro";
const $$url = "/categories";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Categories,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
