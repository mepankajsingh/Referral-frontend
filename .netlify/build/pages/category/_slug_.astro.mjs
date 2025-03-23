/* empty css                                    */
import { e as createComponent, f as createAstro, i as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_Ct226vxg.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../../chunks/Layout_Bm93SrEs.mjs';
import { $ as $$ReferralCard } from '../../chunks/ReferralCard_p6AdQwcc.mjs';
import { s as supabase } from '../../chunks/supabase_DccqxBou.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const { searchParams } = Astro2.url;
  const page = parseInt(searchParams.get("page") || "1");
  const { data: category } = await supabase.from("categories").select("*").eq("slug", slug).single();
  if (!category) {
    return Astro2.redirect("/404");
  }
  const pageSize = 12;
  const offset = (page - 1) * pageSize;
  const { data: referrals, count } = await supabase.from("referral_codes").select("*", { count: "exact" }).eq("category_id", category.id).order("created_at", { ascending: false }).range(offset, offset + pageSize - 1);
  const totalPages = count ? Math.ceil(count / pageSize) : 0;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${category.name} Referral Codes - ReferralHub`, "description": category.description || `Find and share referral codes for ${category.name} apps and services.` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-7xl mx-auto"> <div class="mb-8"> <h1 class="text-3xl font-bold text-gray-900">${category.name} Referral Codes</h1> ${category.description && renderTemplate`<p class="mt-2 text-lg text-gray-600">${category.description}</p>`} </div> ${referrals && referrals.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${referrals.map((referral) => renderTemplate`${renderComponent($$result2, "ReferralCard", $$ReferralCard, { "id": referral.id, "appName": referral.app_name, "code": referral.code, "description": referral.description, "url": referral.url, "userBenefit": referral.user_benefit, "referrerBenefit": referral.referrer_benefit })}`)} </div>` : renderTemplate`<div class="text-center py-12"> <p class="text-xl text-gray-600">No referral codes found in this category yet.</p> <a href="/categories" class="mt-4 inline-block text-primary-600 hover:underline">Browse other categories</a> </div>`}  ${totalPages > 1 && renderTemplate`<div class="mt-8 flex justify-center"> <nav class="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">  <a${addAttribute(page > 1 ? `/category/${slug}?page=${page - 1}` : "#", "href")}${addAttribute(`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${page === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"}`, "class")}${addAttribute(page === 1, "aria-disabled")}> <span class="sr-only">Previous</span> <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> </a>  ${Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => renderTemplate`<a${addAttribute(`/category/${slug}?page=${pageNum}`, "href")}${addAttribute(`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === pageNum ? "z-10 bg-primary-50 border-primary-500 text-primary-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"}`, "class")}> ${pageNum} </a>`)}  <a${addAttribute(page < totalPages ? `/category/${slug}?page=${page + 1}` : "#", "href")}${addAttribute(`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${page === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"}`, "class")}${addAttribute(page === totalPages, "aria-disabled")}> <span class="sr-only">Next</span> <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path> </svg> </a> </nav> </div>`} </div> ` })}`;
}, "/home/project/src/pages/category/[slug].astro", void 0);

const $$file = "/home/project/src/pages/category/[slug].astro";
const $$url = "/category/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
