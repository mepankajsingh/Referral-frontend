/* empty css                                 */
import { e as createComponent, f as createAstro, i as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_Ct226vxg.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_Bm93SrEs.mjs';
import { $ as $$ReferralCard } from '../chunks/ReferralCard_p6AdQwcc.mjs';
import { s as supabase } from '../chunks/supabase_DccqxBou.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Referrals = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Referrals;
  const { searchParams } = Astro2.url;
  const page = parseInt(searchParams.get("page") || "1");
  const categoryId = searchParams.get("category");
  const search = searchParams.get("search");
  const pageSize = 12;
  const offset = (page - 1) * pageSize;
  let query = supabase.from("referral_codes").select("*, categories(name)", { count: "exact" });
  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }
  if (search) {
    query = query.ilike("app_name", `%${search}%`);
  }
  const { data: referrals, count } = await query.order("created_at", { ascending: false }).range(offset, offset + pageSize - 1);
  const totalPages = count ? Math.ceil(count / pageSize) : 0;
  const { data: categories } = await supabase.from("categories").select("id, name, slug").order("name");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "All Referral Codes - ReferralHub" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-7xl mx-auto"> <h1 class="text-3xl font-bold text-gray-900 mb-8">All Referral Codes</h1> <div class="mb-8"> <form action="/referrals" method="get" class="flex flex-col md:flex-row gap-4"> <div class="flex-grow"> <input type="text" name="search" placeholder="Search by app name..."${addAttribute(search || "", "value")} class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"> </div> <div class="w-full md:w-64"> <select name="category" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"> <option value="">All Categories</option> ${categories && categories.map((category) => renderTemplate`<option${addAttribute(category.id, "value")}${addAttribute(categoryId === category.id.toString(), "selected")}> ${category.name} </option>`)} </select> </div> <button type="submit" class="px-6 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700">
Filter
</button> </form> </div> ${referrals && referrals.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${referrals.map((referral) => renderTemplate`${renderComponent($$result2, "ReferralCard", $$ReferralCard, { "id": referral.id, "appName": referral.app_name, "code": referral.code, "description": referral.description, "url": referral.url, "userBenefit": referral.user_benefit, "referrerBenefit": referral.referrer_benefit })}`)} </div>` : renderTemplate`<div class="text-center py-12"> <p class="text-xl text-gray-600">No referral codes found matching your criteria.</p> <a href="/referrals" class="mt-4 inline-block text-primary-600 hover:underline">View all referral codes</a> </div>`}  ${totalPages > 1 && renderTemplate`<div class="mt-8 flex justify-center"> <nav class="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">  <a${addAttribute(page > 1 ? `/referrals?page=${page - 1}${categoryId ? `&category=${categoryId}` : ""}${search ? `&search=${search}` : ""}` : "#", "href")}${addAttribute(`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${page === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"}`, "class")}${addAttribute(page === 1, "aria-disabled")}> <span class="sr-only">Previous</span> <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> </a>  ${Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => renderTemplate`<a${addAttribute(`/referrals?page=${pageNum}${categoryId ? `&category=${categoryId}` : ""}${search ? `&search=${search}` : ""}`, "href")}${addAttribute(`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === pageNum ? "z-10 bg-primary-50 border-primary-500 text-primary-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"}`, "class")}> ${pageNum} </a>`)}  <a${addAttribute(page < totalPages ? `/referrals?page=${page + 1}${categoryId ? `&category=${categoryId}` : ""}${search ? `&search=${search}` : ""}` : "#", "href")}${addAttribute(`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${page === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"}`, "class")}${addAttribute(page === totalPages, "aria-disabled")}> <span class="sr-only">Next</span> <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path> </svg> </a> </nav> </div>`} </div> ` })}`;
}, "/home/project/src/pages/referrals.astro", void 0);

const $$file = "/home/project/src/pages/referrals.astro";
const $$url = "/referrals";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Referrals,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
