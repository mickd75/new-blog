declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"1-better-everyday.md": {
	id: "1-better-everyday.md";
  slug: "1-better-everyday";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"10-examples-of-how-budgeting-can-help.md": {
	id: "10-examples-of-how-budgeting-can-help.md";
  slug: "10-examples-of-how-budgeting-can-help";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"10-exciting-sports-for-men-to-explore-and-excel.md": {
	id: "10-exciting-sports-for-men-to-explore-and-excel.md";
  slug: "10-exciting-sports-for-men-to-explore-and-excel";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"10-tips-to-help-in-developing-debt.md": {
	id: "10-tips-to-help-in-developing-debt.md";
  slug: "10-tips-to-help-in-developing-debt";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"15-quotes-to-help-you-start-2023.md": {
	id: "15-quotes-to-help-you-start-2023.md";
  slug: "15-quotes-to-help-you-start-2023";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"17-tips-to-save-money-when-traveling.md": {
	id: "17-tips-to-save-money-when-traveling.md";
  slug: "17-tips-to-save-money-when-traveling";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"20-common-money-mistakes-you-need-to.md": {
	id: "20-common-money-mistakes-you-need-to.md";
  slug: "20-common-money-mistakes-you-need-to";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"2026-budget-reset-a-30-day-plan-to-regain-control-of-your-money.md": {
	id: "2026-budget-reset-a-30-day-plan-to-regain-control-of-your-money.md";
  slug: "2026-budget-reset-a-30-day-plan-to-regain-control-of-your-money";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"2026-financial-reset-for-men-50-a-practical-plan-to-rebuild-confidence-and-contr.md": {
	id: "2026-financial-reset-for-men-50-a-practical-plan-to-rebuild-confidence-and-contr.md";
  slug: "2026-financial-reset-for-men-50-a-practical-plan-to-rebuild-confidence-and-contr";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"2026-personal-finance-guide-for-seniors.md": {
	id: "2026-personal-finance-guide-for-seniors.md";
  slug: "2026-personal-finance-guide-for-seniors";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"2026-retirement-planning-update-your-strategy-for-current-economic-conditions-2.md": {
	id: "2026-retirement-planning-update-your-strategy-for-current-economic-conditions-2.md";
  slug: "2026-retirement-planning-update-your-strategy-for-current-economic-conditions-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"2026-retirement-side-income-ideas-low-stress-ways-seniors-can-add-monthly-cash-f.md": {
	id: "2026-retirement-side-income-ideas-low-stress-ways-seniors-can-add-monthly-cash-f.md";
  slug: "2026-retirement-side-income-ideas-low-stress-ways-seniors-can-add-monthly-cash-f";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"2026-senior-money-blueprint-protect-income-reduce-risk-grow-confidence.md": {
	id: "2026-senior-money-blueprint-protect-income-reduce-risk-grow-confidence.md";
  slug: "2026-senior-money-blueprint-protect-income-reduce-risk-grow-confidence";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"25-tips-to-help-you-achieve-financial.md": {
	id: "25-tips-to-help-you-achieve-financial.md";
  slug: "25-tips-to-help-you-achieve-financial";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"5-neglected-aspects-of-personal-finance.md": {
	id: "5-neglected-aspects-of-personal-finance.md";
  slug: "5-neglected-aspects-of-personal-finance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"5-tips-for-investing-and-building.md": {
	id: "5-tips-for-investing-and-building.md";
  slug: "5-tips-for-investing-and-building";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"7-tips-for-saving-money-on-a-tight-budget.md": {
	id: "7-tips-for-saving-money-on-a-tight-budget.md";
  slug: "7-tips-for-saving-money-on-a-tight-budget";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"8-common-fitness-money-mistakes-that-cost-you-way-more-than-you-think.md": {
	id: "8-common-fitness-money-mistakes-that-cost-you-way-more-than-you-think.md";
  slug: "8-common-fitness-money-mistakes-that-cost-you-way-more-than-you-think";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"a-green-workout-the-fitness-benefits-of-home-and-garden-maintenance-for-seniors.md": {
	id: "a-green-workout-the-fitness-benefits-of-home-and-garden-maintenance-for-seniors.md";
  slug: "a-green-workout-the-fitness-benefits-of-home-and-garden-maintenance-for-seniors";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"a-high-salary-alone-wont-make-you-wealthy.md": {
	id: "a-high-salary-alone-wont-make-you-wealthy.md";
  slug: "a-high-salary-alone-wont-make-you-wealthy";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"achieving-financial-freedom-is-it.md": {
	id: "achieving-financial-freedom-is-it.md";
  slug: "achieving-financial-freedom-is-it";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"achieving-optimal-health-for-men-in-their-40s-and-50s.md": {
	id: "achieving-optimal-health-for-men-in-their-40s-and-50s.md";
  slug: "achieving-optimal-health-for-men-in-their-40s-and-50s";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"achieving-success-how-to-set-goals-that-stick.md": {
	id: "achieving-success-how-to-set-goals-that-stick.md";
  slug: "achieving-success-how-to-set-goals-that-stick";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"additional-insurance-coverage-do-you-need-them.md": {
	id: "additional-insurance-coverage-do-you-need-them.md";
  slug: "additional-insurance-coverage-do-you-need-them";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"advice-nobody-wants-to-hear-anymore-tough-truths-ahead.md": {
	id: "advice-nobody-wants-to-hear-anymore-tough-truths-ahead.md";
  slug: "advice-nobody-wants-to-hear-anymore-tough-truths-ahead";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"ageless-fitness-the-benefits-of-walking-for-seniors.md": {
	id: "ageless-fitness-the-benefits-of-walking-for-seniors.md";
  slug: "ageless-fitness-the-benefits-of-walking-for-seniors";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"aiming-beyond-the-mark-the-transformative-power-of-unreachable-goals.md": {
	id: "aiming-beyond-the-mark-the-transformative-power-of-unreachable-goals.md";
  slug: "aiming-beyond-the-mark-the-transformative-power-of-unreachable-goals";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"am-i-middle-class-navigating-the-socio-economic-landscape.md": {
	id: "am-i-middle-class-navigating-the-socio-economic-landscape.md";
  slug: "am-i-middle-class-navigating-the-socio-economic-landscape";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"an-examination-of-retirement-advice-should-you-really-save-more-2.md": {
	id: "an-examination-of-retirement-advice-should-you-really-save-more-2.md";
  slug: "an-examination-of-retirement-advice-should-you-really-save-more-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"an-examination-of-retirement-advice-should-you-really-save-more.md": {
	id: "an-examination-of-retirement-advice-should-you-really-save-more.md";
  slug: "an-examination-of-retirement-advice-should-you-really-save-more";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"an-overview-of-roth-ira-what-you-need-to-know.md": {
	id: "an-overview-of-roth-ira-what-you-need-to-know.md";
  slug: "an-overview-of-roth-ira-what-you-need-to-know";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"annuities-vs-other-retirement-income-sources-an-analysis.md": {
	id: "annuities-vs-other-retirement-income-sources-an-analysis.md";
  slug: "annuities-vs-other-retirement-income-sources-an-analysis";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"anti-aging-strategies-biohacking-your-way-to-youthfulness.md": {
	id: "anti-aging-strategies-biohacking-your-way-to-youthfulness.md";
  slug: "anti-aging-strategies-biohacking-your-way-to-youthfulness";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"are-you-overcomplicating-your-fitness.md": {
	id: "are-you-overcomplicating-your-fitness.md";
  slug: "are-you-overcomplicating-your-fitness";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"are-you-overpaying-for-housing-strategies-to-make-housing-more-affordable.md": {
	id: "are-you-overpaying-for-housing-strategies-to-make-housing-more-affordable.md";
  slug: "are-you-overpaying-for-housing-strategies-to-make-housing-more-affordable";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"are-you-ready-for-retirement-heres-how-to-find-out.md": {
	id: "are-you-ready-for-retirement-heres-how-to-find-out.md";
  slug: "are-you-ready-for-retirement-heres-how-to-find-out";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"asset-appreciation-and-building-equity-real-estate-as-a-wealth-building-strategy.md": {
	id: "asset-appreciation-and-building-equity-real-estate-as-a-wealth-building-strategy.md";
  slug: "asset-appreciation-and-building-equity-real-estate-as-a-wealth-building-strategy";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"avoid-the-high-income-trap-making-200k-and-still-broke.md": {
	id: "avoid-the-high-income-trap-making-200k-and-still-broke.md";
  slug: "avoid-the-high-income-trap-making-200k-and-still-broke";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"bad-sleep-bad-life-the-undeniable-impact-of-poor-sleep-on-well-being.md": {
	id: "bad-sleep-bad-life-the-undeniable-impact-of-poor-sleep-on-well-being.md";
  slug: "bad-sleep-bad-life-the-undeniable-impact-of-poor-sleep-on-well-being";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"balancing-act-embracing-the-present-while-securing-the-future.md": {
	id: "balancing-act-embracing-the-present-while-securing-the-future.md";
  slug: "balancing-act-embracing-the-present-while-securing-the-future";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"balancing-discipline-and-joy-finding.md": {
	id: "balancing-discipline-and-joy-finding.md";
  slug: "balancing-discipline-and-joy-finding";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"balancing-personal-finances-and-health-in-your-40s.md": {
	id: "balancing-personal-finances-and-health-in-your-40s.md";
  slug: "balancing-personal-finances-and-health-in-your-40s";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"be-honest-about-your-spending-the-first-step-to-financial-freedom.md": {
	id: "be-honest-about-your-spending-the-first-step-to-financial-freedom.md";
  slug: "be-honest-about-your-spending-the-first-step-to-financial-freedom";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"becoming-the-man-your-younger-self-wouldnt-recognize.md": {
	id: "becoming-the-man-your-younger-self-wouldnt-recognize.md";
  slug: "becoming-the-man-your-younger-self-wouldnt-recognize";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"becoming-your-own-boss-insights-on-starting-your-own-business.md": {
	id: "becoming-your-own-boss-insights-on-starting-your-own-business.md";
  slug: "becoming-your-own-boss-insights-on-starting-your-own-business";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"being-honest-with-ourselves-about-our-financial-situation.md": {
	id: "being-honest-with-ourselves-about-our-financial-situation.md";
  slug: "being-honest-with-ourselves-about-our-financial-situation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"benefits-of-travel-insurance.md": {
	id: "benefits-of-travel-insurance.md";
  slug: "benefits-of-travel-insurance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"benefits-of-traveling-for-seniors.md": {
	id: "benefits-of-traveling-for-seniors.md";
  slug: "benefits-of-traveling-for-seniors";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"benefits-of-using-amex-card-for.md": {
	id: "benefits-of-using-amex-card-for.md";
  slug: "benefits-of-using-amex-card-for";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"better-yourself.md": {
	id: "better-yourself.md";
  slug: "better-yourself";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"betting-against-your-own-obsolescence-staying-relevant.md": {
	id: "betting-against-your-own-obsolescence-staying-relevant.md";
  slug: "betting-against-your-own-obsolescence-staying-relevant";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"beyond-constraints-unleashing-your-true-desires-in-pursuit-of-success.md": {
	id: "beyond-constraints-unleashing-your-true-desires-in-pursuit-of-success.md";
  slug: "beyond-constraints-unleashing-your-true-desires-in-pursuit-of-success";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"beyond-survival-building-a-resilient-life-where-money-health-and-mindset-interse.md": {
	id: "beyond-survival-building-a-resilient-life-where-money-health-and-mindset-interse.md";
  slug: "beyond-survival-building-a-resilient-life-where-money-health-and-mindset-interse";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"beyond-the-paycheck-the-mechanics-of-long-term-wealth-generation-the-100-rule.md": {
	id: "beyond-the-paycheck-the-mechanics-of-long-term-wealth-generation-the-100-rule.md";
  slug: "beyond-the-paycheck-the-mechanics-of-long-term-wealth-generation-the-100-rule";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"beyond-the-surface-the-profound-cost-of-unhealthy-lifestyle-choices.md": {
	id: "beyond-the-surface-the-profound-cost-of-unhealthy-lifestyle-choices.md";
  slug: "beyond-the-surface-the-profound-cost-of-unhealthy-lifestyle-choices";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"beyond-the-walk-5-science-backed-ways-to-unstick-your-mind-especially-for-men-ov.md": {
	id: "beyond-the-walk-5-science-backed-ways-to-unstick-your-mind-especially-for-men-ov.md";
  slug: "beyond-the-walk-5-science-backed-ways-to-unstick-your-mind-especially-for-men-ov";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"blog-post-1.md": {
	id: "blog-post-1.md";
  slug: "blog-post-1";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"bodybuilder-miroslav-schmied.md": {
	id: "bodybuilder-miroslav-schmied.md";
  slug: "bodybuilder-miroslav-schmied";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"boost-your-energy-levels-practical-tips-to-stay-energized-all-day.md": {
	id: "boost-your-energy-levels-practical-tips-to-stay-energized-all-day.md";
  slug: "boost-your-energy-levels-practical-tips-to-stay-energized-all-day";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"bouncing-back-from-financial-setbacks-a-resilience-roadmap-for-2026.md": {
	id: "bouncing-back-from-financial-setbacks-a-resilience-roadmap-for-2026.md";
  slug: "bouncing-back-from-financial-setbacks-a-resilience-roadmap-for-2026";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"bowling-exercises-for-seniors-stay-active-and-social.md": {
	id: "bowling-exercises-for-seniors-stay-active-and-social.md";
  slug: "bowling-exercises-for-seniors-stay-active-and-social";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"brain-recharge-unplugging-and-indulging-in-mental-relaxation.md": {
	id: "brain-recharge-unplugging-and-indulging-in-mental-relaxation.md";
  slug: "brain-recharge-unplugging-and-indulging-in-mental-relaxation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"breaking-free-from-lifestyle-inflation-the-mindset-shift-that-changes-everything.md": {
	id: "breaking-free-from-lifestyle-inflation-the-mindset-shift-that-changes-everything.md";
  slug: "breaking-free-from-lifestyle-inflation-the-mindset-shift-that-changes-everything";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"budgeting-and-saving-techniques-for.md": {
	id: "budgeting-and-saving-techniques-for.md";
  slug: "budgeting-and-saving-techniques-for";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"build-muscle-after-40-the-science-backed-guide-for-men.md": {
	id: "build-muscle-after-40-the-science-backed-guide-for-men.md";
  slug: "build-muscle-after-40-the-science-backed-guide-for-men";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"building-a-6-month-emergency-fund-on-a-tight-budget-month-by-month-progress-2.md": {
	id: "building-a-6-month-emergency-fund-on-a-tight-budget-month-by-month-progress-2.md";
  slug: "building-a-6-month-emergency-fund-on-a-tight-budget-month-by-month-progress-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"building-a-resilient-mindset-through-physical-exercise-and-movement-2.md": {
	id: "building-a-resilient-mindset-through-physical-exercise-and-movement-2.md";
  slug: "building-a-resilient-mindset-through-physical-exercise-and-movement-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"career-longevity-plan-for-desk-job-men-a-10-year-blueprint-for-relevance-energy-.md": {
	id: "career-longevity-plan-for-desk-job-men-a-10-year-blueprint-for-relevance-energy-.md";
  slug: "career-longevity-plan-for-desk-job-men-a-10-year-blueprint-for-relevance-energy-";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"choosing-a-home-within-your-budget-a-step-towards-financial-freedom.md": {
	id: "choosing-a-home-within-your-budget-a-step-towards-financial-freedom.md";
  slug: "choosing-a-home-within-your-budget-a-step-towards-financial-freedom";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"choosing-right-health-insurance.md": {
	id: "choosing-right-health-insurance.md";
  slug: "choosing-right-health-insurance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"common-financial-mistakes-seniors-make-and-how-to-avoid-them.md": {
	id: "common-financial-mistakes-seniors-make-and-how-to-avoid-them.md";
  slug: "common-financial-mistakes-seniors-make-and-how-to-avoid-them";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"common-mistakes-to-avoid-when-managing-your-401k-investments.md": {
	id: "common-mistakes-to-avoid-when-managing-your-401k-investments.md";
  slug: "common-mistakes-to-avoid-when-managing-your-401k-investments";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"common-personal-finance-mistakes-people-make-due-to-emotions.md": {
	id: "common-personal-finance-mistakes-people-make-due-to-emotions.md";
  slug: "common-personal-finance-mistakes-people-make-due-to-emotions";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"consumer-culture-and-materialism-the-illusion-of-success.md": {
	id: "consumer-culture-and-materialism-the-illusion-of-success.md";
  slug: "consumer-culture-and-materialism-the-illusion-of-success";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"crafting-your-financial-future-the-importance-of-personalized-finance.md": {
	id: "crafting-your-financial-future-the-importance-of-personalized-finance.md";
  slug: "crafting-your-financial-future-the-importance-of-personalized-finance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"credit-card-benefits-how-to-use-your.md": {
	id: "credit-card-benefits-how-to-use-your.md";
  slug: "credit-card-benefits-how-to-use-your";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"credit-cards-benefits-how-to-use-your.md": {
	id: "credit-cards-benefits-how-to-use-your.md";
  slug: "credit-cards-benefits-how-to-use-your";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"credit-cards-how-they-can-mask-your-overall-financial-situation.md": {
	id: "credit-cards-how-they-can-mask-your-overall-financial-situation.md";
  slug: "credit-cards-how-they-can-mask-your-overall-financial-situation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"credit-cards-overuse-debt-and-how-to-balance-it-all.md": {
	id: "credit-cards-overuse-debt-and-how-to-balance-it-all.md";
  slug: "credit-cards-overuse-debt-and-how-to-balance-it-all";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"critical-thinking-in-the-digital-age.md": {
	id: "critical-thinking-in-the-digital-age.md";
  slug: "critical-thinking-in-the-digital-age";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"cultivating-a-wealthy-mindset-key-steps-to-abundance.md": {
	id: "cultivating-a-wealthy-mindset-key-steps-to-abundance.md";
  slug: "cultivating-a-wealthy-mindset-key-steps-to-abundance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"cultivating-confidence-and-vision-insights-from-arnold-schwarzenegger.md": {
	id: "cultivating-confidence-and-vision-insights-from-arnold-schwarzenegger.md";
  slug: "cultivating-confidence-and-vision-insights-from-arnold-schwarzenegger";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"cutting-through-the-noise-key-questions-for-accelerated-growth.md": {
	id: "cutting-through-the-noise-key-questions-for-accelerated-growth.md";
  slug: "cutting-through-the-noise-key-questions-for-accelerated-growth";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"cutting-unnecessary-expenses-a-practical-guide.md": {
	id: "cutting-unnecessary-expenses-a-practical-guide.md";
  slug: "cutting-unnecessary-expenses-a-practical-guide";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"daily-financial-wisdom-7-tips-for-boosting-your-credit-score.md": {
	id: "daily-financial-wisdom-7-tips-for-boosting-your-credit-score.md";
  slug: "daily-financial-wisdom-7-tips-for-boosting-your-credit-score";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"daring-to-be-different-the-power-of-contrarian-thinking-in-success.md": {
	id: "daring-to-be-different-the-power-of-contrarian-thinking-in-success.md";
  slug: "daring-to-be-different-the-power-of-contrarian-thinking-in-success";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"dealing-with-financial-difficulties.md": {
	id: "dealing-with-financial-difficulties.md";
  slug: "dealing-with-financial-difficulties";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"debunking-the-myth-renting-is-always-throwing-away-money.md": {
	id: "debunking-the-myth-renting-is-always-throwing-away-money.md";
  slug: "debunking-the-myth-renting-is-always-throwing-away-money";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"deciphering-retirement-strategies-save-more-or-work-longer.md": {
	id: "deciphering-retirement-strategies-save-more-or-work-longer.md";
  slug: "deciphering-retirement-strategies-save-more-or-work-longer";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"deferred-annuities-a-key-component-for-retirement-security-2.md": {
	id: "deferred-annuities-a-key-component-for-retirement-security-2.md";
  slug: "deferred-annuities-a-key-component-for-retirement-security-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"deferred-annuities-a-key-component-for-retirement-security.md": {
	id: "deferred-annuities-a-key-component-for-retirement-security.md";
  slug: "deferred-annuities-a-key-component-for-retirement-security";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"desk-job-men-over-40-a-90-day-career-longevity-reset-to-protect-performance-and-.md": {
	id: "desk-job-men-over-40-a-90-day-career-longevity-reset-to-protect-performance-and-.md";
  slug: "desk-job-men-over-40-a-90-day-career-longevity-reset-to-protect-performance-and-";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"develop-growth-mindset-for-long-term.md": {
	id: "develop-growth-mindset-for-long-term.md";
  slug: "develop-growth-mindset-for-long-term";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"developing-a-rich-mindset-for-financial-independence-freedom.md": {
	id: "developing-a-rich-mindset-for-financial-independence-freedom.md";
  slug: "developing-a-rich-mindset-for-financial-independence-freedom";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"do-i-like-way-i-look.md": {
	id: "do-i-like-way-i-look.md";
  slug: "do-i-like-way-i-look";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"does-retiree-need-an-emergency-fund.md": {
	id: "does-retiree-need-an-emergency-fund.md";
  slug: "does-retiree-need-an-emergency-fund";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"embarking-on-transformation-top-10-weight-loss-tips-for-single-men.md": {
	id: "embarking-on-transformation-top-10-weight-loss-tips-for-single-men.md";
  slug: "embarking-on-transformation-top-10-weight-loss-tips-for-single-men";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"embracing-exercise-the-key-to-healthy-aging.md": {
	id: "embracing-exercise-the-key-to-healthy-aging.md";
  slug: "embracing-exercise-the-key-to-healthy-aging";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"embracing-responsibility-a-crucial-step-to-owning-your-financial-situation.md": {
	id: "embracing-responsibility-a-crucial-step-to-owning-your-financial-situation.md";
  slug: "embracing-responsibility-a-crucial-step-to-owning-your-financial-situation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"embracing-technology-enhancing-senior-living-and-fostering-joyful-experiences.md": {
	id: "embracing-technology-enhancing-senior-living-and-fostering-joyful-experiences.md";
  slug: "embracing-technology-enhancing-senior-living-and-fostering-joyful-experiences";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"embracing-the-art-of-being-wrong-the-power-of-risk-management.md": {
	id: "embracing-the-art-of-being-wrong-the-power-of-risk-management.md";
  slug: "embracing-the-art-of-being-wrong-the-power-of-risk-management";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"embracing-the-detours-the-constructive-power-of-failure.md": {
	id: "embracing-the-detours-the-constructive-power-of-failure.md";
  slug: "embracing-the-detours-the-constructive-power-of-failure";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"embracing-the-joy-of-living-in-the-moment.md": {
	id: "embracing-the-joy-of-living-in-the-moment.md";
  slug: "embracing-the-joy-of-living-in-the-moment";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"embracing-your-40s-a-holistic-approach-to-health-and-fitness.md": {
	id: "embracing-your-40s-a-holistic-approach-to-health-and-fitness.md";
  slug: "embracing-your-40s-a-holistic-approach-to-health-and-fitness";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"emotional-spending-how-to-over-come.md": {
	id: "emotional-spending-how-to-over-come.md";
  slug: "emotional-spending-how-to-over-come";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"employer-sponsored-retirement-plans-how.md": {
	id: "employer-sponsored-retirement-plans-how.md";
  slug: "employer-sponsored-retirement-plans-how";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"employer-sponsored-retirement-plans-why.md": {
	id: "employer-sponsored-retirement-plans-why.md";
  slug: "employer-sponsored-retirement-plans-why";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"empower-your-future-why-you-need-to-educate-yourself-about-personal-finance.md": {
	id: "empower-your-future-why-you-need-to-educate-yourself-about-personal-finance.md";
  slug: "empower-your-future-why-you-need-to-educate-yourself-about-personal-finance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"empowering-men-at-every-age-the-remarkable-benefits-of-meditation-and-yoga.md": {
	id: "empowering-men-at-every-age-the-remarkable-benefits-of-meditation-and-yoga.md";
  slug: "empowering-men-at-every-age-the-remarkable-benefits-of-meditation-and-yoga";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"empowering-seniors-how-technology-can-improve-overall-health-and-wellness.md": {
	id: "empowering-seniors-how-technology-can-improve-overall-health-and-wellness.md";
  slug: "empowering-seniors-how-technology-can-improve-overall-health-and-wellness";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"engineering-the-future-advanced-mechanics-of-long-term-wealth-generation.md": {
	id: "engineering-the-future-advanced-mechanics-of-long-term-wealth-generation.md";
  slug: "engineering-the-future-advanced-mechanics-of-long-term-wealth-generation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"enjoying-the-holidays-on-a-budget-10-tips-for-stress-free-festivities.md": {
	id: "enjoying-the-holidays-on-a-budget-10-tips-for-stress-free-festivities.md";
  slug: "enjoying-the-holidays-on-a-budget-10-tips-for-stress-free-festivities";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"enjoying-your-golden-years-without-breaking-the-bank.md": {
	id: "enjoying-your-golden-years-without-breaking-the-bank.md";
  slug: "enjoying-your-golden-years-without-breaking-the-bank";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"examples-of-exercises-to-do-at-home.md": {
	id: "examples-of-exercises-to-do-at-home.md";
  slug: "examples-of-exercises-to-do-at-home";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"exercise-after-50-in-2026-a-practical-weekly-plan-for-energy-mobility-and-longev.md": {
	id: "exercise-after-50-in-2026-a-practical-weekly-plan-for-energy-mobility-and-longev.md";
  slug: "exercise-after-50-in-2026-a-practical-weekly-plan-for-energy-mobility-and-longev";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"exercise-training-for-longevity-not-aesthetics-results.md": {
	id: "exercise-training-for-longevity-not-aesthetics-results.md";
  slug: "exercise-training-for-longevity-not-aesthetics-results";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"exploring-the-benefits-of-biohacking.md": {
	id: "exploring-the-benefits-of-biohacking.md";
  slug: "exploring-the-benefits-of-biohacking";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"exploring-the-link-between-your-savings-rate-and-retirement-age.md": {
	id: "exploring-the-link-between-your-savings-rate-and-retirement-age.md";
  slug: "exploring-the-link-between-your-savings-rate-and-retirement-age";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"faith-and-belief-the-hidden-engines-of-success.md": {
	id: "faith-and-belief-the-hidden-engines-of-success.md";
  slug: "faith-and-belief-the-hidden-engines-of-success";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"financial-freedoms-second-act-rethinking-retirement-at-55-65.md": {
	id: "financial-freedoms-second-act-rethinking-retirement-at-55-65.md";
  slug: "financial-freedoms-second-act-rethinking-retirement-at-55-65";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"financial-identity-and-cognitive-biases-in-wealth-accumulation.md": {
	id: "financial-identity-and-cognitive-biases-in-wealth-accumulation.md";
  slug: "financial-identity-and-cognitive-biases-in-wealth-accumulation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"financial-independence-in-2026-is-fire-still-achievable-2.md": {
	id: "financial-independence-in-2026-is-fire-still-achievable-2.md";
  slug: "financial-independence-in-2026-is-fire-still-achievable-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"financial-independence-in-2026-is-fire-still-achievable.md": {
	id: "financial-independence-in-2026-is-fire-still-achievable.md";
  slug: "financial-independence-in-2026-is-fire-still-achievable";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"financial-independence-through-discipline-my-5-year-plan-2.md": {
	id: "financial-independence-through-discipline-my-5-year-plan-2.md";
  slug: "financial-independence-through-discipline-my-5-year-plan-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"financial-literacy-a-cornerstone-for-wealth-preservation.md": {
	id: "financial-literacy-a-cornerstone-for-wealth-preservation.md";
  slug: "financial-literacy-a-cornerstone-for-wealth-preservation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"financial-literacy-a-key-to-wealth-building.md": {
	id: "financial-literacy-a-key-to-wealth-building.md";
  slug: "financial-literacy-a-key-to-wealth-building";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"financial-planning-beyond-wealth-accumulation-embracing-lifes-potential.md": {
	id: "financial-planning-beyond-wealth-accumulation-embracing-lifes-potential.md";
  slug: "financial-planning-beyond-wealth-accumulation-embracing-lifes-potential";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"financial-priorities-for-men-50-60-smart-planning-for-retirement.md": {
	id: "financial-priorities-for-men-50-60-smart-planning-for-retirement.md";
  slug: "financial-priorities-for-men-50-60-smart-planning-for-retirement";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"finding-happiness-outside-of-material-possessions.md": {
	id: "finding-happiness-outside-of-material-possessions.md";
  slug: "finding-happiness-outside-of-material-possessions";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"finding-true-happiness-the-wisdom-of-limiting-your-desires.md": {
	id: "finding-true-happiness-the-wisdom-of-limiting-your-desires.md";
  slug: "finding-true-happiness-the-wisdom-of-limiting-your-desires";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"first-time-home-buyers-tips.md": {
	id: "first-time-home-buyers-tips.md";
  slug: "first-time-home-buyers-tips";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-influencer-brayan-lopez.md": {
	id: "fitness-influencer-brayan-lopez.md";
  slug: "fitness-influencer-brayan-lopez";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-influencer-ricardo.md": {
	id: "fitness-influencer-ricardo.md";
  slug: "fitness-influencer-ricardo";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-aaron_16.md": {
	id: "fitness-inspiration-aaron_16.md";
  slug: "fitness-inspiration-aaron_16";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-alberto.md": {
	id: "fitness-inspiration-alberto.md";
  slug: "fitness-inspiration-alberto";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-alex.md": {
	id: "fitness-inspiration-alex.md";
  slug: "fitness-inspiration-alex";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-andre.md": {
	id: "fitness-inspiration-andre.md";
  slug: "fitness-inspiration-andre";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-austin.md": {
	id: "fitness-inspiration-austin.md";
  slug: "fitness-inspiration-austin";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-baptiste.md": {
	id: "fitness-inspiration-baptiste.md";
  slug: "fitness-inspiration-baptiste";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-benno-peters.md": {
	id: "fitness-inspiration-benno-peters.md";
  slug: "fitness-inspiration-benno-peters";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-billy.md": {
	id: "fitness-inspiration-billy.md";
  slug: "fitness-inspiration-billy";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-brady-ervin.md": {
	id: "fitness-inspiration-brady-ervin.md";
  slug: "fitness-inspiration-brady-ervin";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-brandon.md": {
	id: "fitness-inspiration-brandon.md";
  slug: "fitness-inspiration-brandon";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-breno-2.md": {
	id: "fitness-inspiration-breno-2.md";
  slug: "fitness-inspiration-breno-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-cem.md": {
	id: "fitness-inspiration-cem.md";
  slug: "fitness-inspiration-cem";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-chase-calvit.md": {
	id: "fitness-inspiration-chase-calvit.md";
  slug: "fitness-inspiration-chase-calvit";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-christian.md": {
	id: "fitness-inspiration-christian.md";
  slug: "fitness-inspiration-christian";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-daniel-p-2.md": {
	id: "fitness-inspiration-daniel-p-2.md";
  slug: "fitness-inspiration-daniel-p-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-danijel-svec.md": {
	id: "fitness-inspiration-danijel-svec.md";
  slug: "fitness-inspiration-danijel-svec";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-dejan.md": {
	id: "fitness-inspiration-dejan.md";
  slug: "fitness-inspiration-dejan";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-diego.md": {
	id: "fitness-inspiration-diego.md";
  slug: "fitness-inspiration-diego";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-dimos-laliotis.md": {
	id: "fitness-inspiration-dimos-laliotis.md";
  slug: "fitness-inspiration-dimos-laliotis";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-dominic-c.md": {
	id: "fitness-inspiration-dominic-c.md";
  slug: "fitness-inspiration-dominic-c";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-dominic.md": {
	id: "fitness-inspiration-dominic.md";
  slug: "fitness-inspiration-dominic";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-dominik-2.md": {
	id: "fitness-inspiration-dominik-2.md";
  slug: "fitness-inspiration-dominik-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-dominik.md": {
	id: "fitness-inspiration-dominik.md";
  slug: "fitness-inspiration-dominik";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-donizete.md": {
	id: "fitness-inspiration-donizete.md";
  slug: "fitness-inspiration-donizete";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-ezra.md": {
	id: "fitness-inspiration-ezra.md";
  slug: "fitness-inspiration-ezra";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-geo.md": {
	id: "fitness-inspiration-geo.md";
  slug: "fitness-inspiration-geo";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-gian-2.md": {
	id: "fitness-inspiration-gian-2.md";
  slug: "fitness-inspiration-gian-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-gian.md": {
	id: "fitness-inspiration-gian.md";
  slug: "fitness-inspiration-gian";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-ig-perez-3.md": {
	id: "fitness-inspiration-ig-perez-3.md";
  slug: "fitness-inspiration-ig-perez-3";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-ig-perez.md": {
	id: "fitness-inspiration-ig-perez.md";
  slug: "fitness-inspiration-ig-perez";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-jake-channing.md": {
	id: "fitness-inspiration-jake-channing.md";
  slug: "fitness-inspiration-jake-channing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-jamie.md": {
	id: "fitness-inspiration-jamie.md";
  slug: "fitness-inspiration-jamie";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-jason.md": {
	id: "fitness-inspiration-jason.md";
  slug: "fitness-inspiration-jason";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-joan-araiz.md": {
	id: "fitness-inspiration-joan-araiz.md";
  slug: "fitness-inspiration-joan-araiz";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-joey-2.md": {
	id: "fitness-inspiration-joey-2.md";
  slug: "fitness-inspiration-joey-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-joey-3.md": {
	id: "fitness-inspiration-joey-3.md";
  slug: "fitness-inspiration-joey-3";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-joey.md": {
	id: "fitness-inspiration-joey.md";
  slug: "fitness-inspiration-joey";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-jt.md": {
	id: "fitness-inspiration-jt.md";
  slug: "fitness-inspiration-jt";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-leonardo.md": {
	id: "fitness-inspiration-leonardo.md";
  slug: "fitness-inspiration-leonardo";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-liete.md": {
	id: "fitness-inspiration-liete.md";
  slug: "fitness-inspiration-liete";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-lir.md": {
	id: "fitness-inspiration-lir.md";
  slug: "fitness-inspiration-lir";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-logan.md": {
	id: "fitness-inspiration-logan.md";
  slug: "fitness-inspiration-logan";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-luis.md": {
	id: "fitness-inspiration-luis.md";
  slug: "fitness-inspiration-luis";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-luke.md": {
	id: "fitness-inspiration-luke.md";
  slug: "fitness-inspiration-luke";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-manuel-kornisiuk.md": {
	id: "fitness-inspiration-manuel-kornisiuk.md";
  slug: "fitness-inspiration-manuel-kornisiuk";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-marco-j.md": {
	id: "fitness-inspiration-marco-j.md";
  slug: "fitness-inspiration-marco-j";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-mardin.md": {
	id: "fitness-inspiration-mardin.md";
  slug: "fitness-inspiration-mardin";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-mario-h.md": {
	id: "fitness-inspiration-mario-h.md";
  slug: "fitness-inspiration-mario-h";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-matthew-c.md": {
	id: "fitness-inspiration-matthew-c.md";
  slug: "fitness-inspiration-matthew-c";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-max-murillo.md": {
	id: "fitness-inspiration-max-murillo.md";
  slug: "fitness-inspiration-max-murillo";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-max.md": {
	id: "fitness-inspiration-max.md";
  slug: "fitness-inspiration-max";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-michael.md": {
	id: "fitness-inspiration-michael.md";
  slug: "fitness-inspiration-michael";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-mischa.md": {
	id: "fitness-inspiration-mischa.md";
  slug: "fitness-inspiration-mischa";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-mix-18.md": {
	id: "fitness-inspiration-mix-18.md";
  slug: "fitness-inspiration-mix-18";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-mix-37.md": {
	id: "fitness-inspiration-mix-37.md";
  slug: "fitness-inspiration-mix-37";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-nathan-2.md": {
	id: "fitness-inspiration-nathan-2.md";
  slug: "fitness-inspiration-nathan-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-nic.md": {
	id: "fitness-inspiration-nic.md";
  slug: "fitness-inspiration-nic";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-nick-topel.md": {
	id: "fitness-inspiration-nick-topel.md";
  slug: "fitness-inspiration-nick-topel";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-niklas.md": {
	id: "fitness-inspiration-niklas.md";
  slug: "fitness-inspiration-niklas";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-oliver.md": {
	id: "fitness-inspiration-oliver.md";
  slug: "fitness-inspiration-oliver";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-patrick-birki.md": {
	id: "fitness-inspiration-patrick-birki.md";
  slug: "fitness-inspiration-patrick-birki";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-richard-h.md": {
	id: "fitness-inspiration-richard-h.md";
  slug: "fitness-inspiration-richard-h";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-richard.md": {
	id: "fitness-inspiration-richard.md";
  slug: "fitness-inspiration-richard";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-rom-jr.md": {
	id: "fitness-inspiration-rom-jr.md";
  slug: "fitness-inspiration-rom-jr";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-ruben-gomez.md": {
	id: "fitness-inspiration-ruben-gomez.md";
  slug: "fitness-inspiration-ruben-gomez";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-schuyler.md": {
	id: "fitness-inspiration-schuyler.md";
  slug: "fitness-inspiration-schuyler";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-sergi.md": {
	id: "fitness-inspiration-sergi.md";
  slug: "fitness-inspiration-sergi";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-sergio-al.md": {
	id: "fitness-inspiration-sergio-al.md";
  slug: "fitness-inspiration-sergio-al";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-siga.md": {
	id: "fitness-inspiration-siga.md";
  slug: "fitness-inspiration-siga";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-stepan.md": {
	id: "fitness-inspiration-stepan.md";
  slug: "fitness-inspiration-stepan";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-steven.md": {
	id: "fitness-inspiration-steven.md";
  slug: "fitness-inspiration-steven";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-toby.md": {
	id: "fitness-inspiration-toby.md";
  slug: "fitness-inspiration-toby";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-tyler.md": {
	id: "fitness-inspiration-tyler.md";
  slug: "fitness-inspiration-tyler";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-valeriy.md": {
	id: "fitness-inspiration-valeriy.md";
  slug: "fitness-inspiration-valeriy";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-vlad.md": {
	id: "fitness-inspiration-vlad.md";
  slug: "fitness-inspiration-vlad";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-vladislav-gerasimov.md": {
	id: "fitness-inspiration-vladislav-gerasimov.md";
  slug: "fitness-inspiration-vladislav-gerasimov";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-yoav.md": {
	id: "fitness-inspiration-yoav.md";
  slug: "fitness-inspiration-yoav";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-zaour-2.md": {
	id: "fitness-inspiration-zaour-2.md";
  slug: "fitness-inspiration-zaour-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-inspiration-zaour.md": {
	id: "fitness-inspiration-zaour.md";
  slug: "fitness-inspiration-zaour";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-isnt-just-about-looking-good-its-about-thriving.md": {
	id: "fitness-isnt-just-about-looking-good-its-about-thriving.md";
  slug: "fitness-isnt-just-about-looking-good-its-about-thriving";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-mix-avery.md": {
	id: "fitness-mix-avery.md";
  slug: "fitness-mix-avery";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-mix-brad.md": {
	id: "fitness-mix-brad.md";
  slug: "fitness-mix-brad";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-mix-eian.md": {
	id: "fitness-mix-eian.md";
  slug: "fitness-mix-eian";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-mix-lev.md": {
	id: "fitness-mix-lev.md";
  slug: "fitness-mix-lev";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-mix-petr.md": {
	id: "fitness-mix-petr.md";
  slug: "fitness-mix-petr";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fitness-model-david-toma.md": {
	id: "fitness-model-david-toma.md";
  slug: "fitness-model-david-toma";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"focusing-on-crafting-your-daily-routines.md": {
	id: "focusing-on-crafting-your-daily-routines.md";
  slug: "focusing-on-crafting-your-daily-routines";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"from-couch-to-10k-run-training-through-the-uncomfortable.md": {
	id: "from-couch-to-10k-run-training-through-the-uncomfortable.md";
  slug: "from-couch-to-10k-run-training-through-the-uncomfortable";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"from-income-trader-to-asset-owner-the-paradigm-shift-that-defines-true-wealth.md": {
	id: "from-income-trader-to-asset-owner-the-paradigm-shift-that-defines-true-wealth.md";
  slug: "from-income-trader-to-asset-owner-the-paradigm-shift-that-defines-true-wealth";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"from-provider-to-architect-how-men-over-40-should-redesign-family-wealth-in-2026.md": {
	id: "from-provider-to-architect-how-men-over-40-should-redesign-family-wealth-in-2026.md";
  slug: "from-provider-to-architect-how-men-over-40-should-redesign-family-wealth-in-2026";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"from-scarcity-to-abundance-rewiring-your-brain-for-financial-success-in-2026.md": {
	id: "from-scarcity-to-abundance-rewiring-your-brain-for-financial-success-in-2026.md";
  slug: "from-scarcity-to-abundance-rewiring-your-brain-for-financial-success-in-2026";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"from-zero-to-hero-how-to-save-and-invest-your-way-to-financial-success.md": {
	id: "from-zero-to-hero-how-to-save-and-invest-your-way-to-financial-success.md";
  slug: "from-zero-to-hero-how-to-save-and-invest-your-way-to-financial-success";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"full-body-mri-scan-pros-cons-and-when-you-might-need-it.md": {
	id: "full-body-mri-scan-pros-cons-and-when-you-might-need-it.md";
  slug: "full-body-mri-scan-pros-cons-and-when-you-might-need-it";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"getting-fit-is-about-more-than-looking-good-its-about-living-fully.md": {
	id: "getting-fit-is-about-more-than-looking-good-its-about-living-fully.md";
  slug: "getting-fit-is-about-more-than-looking-good-its-about-living-fully";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"golden-years-golden-budget-managing-leisure-money-wisely-in-senior-life.md": {
	id: "golden-years-golden-budget-managing-leisure-money-wisely-in-senior-life.md";
  slug: "golden-years-golden-budget-managing-leisure-money-wisely-in-senior-life";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"good-debt-vs-bad-debt-at-40-explained-the-financial-rep-you-need-to-build-real-w.md": {
	id: "good-debt-vs-bad-debt-at-40-explained-the-financial-rep-you-need-to-build-real-w.md";
  slug: "good-debt-vs-bad-debt-at-40-explained-the-financial-rep-you-need-to-build-real-w";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"good-things-come-to-those-who-sweat.md": {
	id: "good-things-come-to-those-who-sweat.md";
  slug: "good-things-come-to-those-who-sweat";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"happiness.md": {
	id: "happiness.md";
  slug: "happiness";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"hard-work-wont-make-you-rich.md": {
	id: "hard-work-wont-make-you-rich.md";
  slug: "hard-work-wont-make-you-rich";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"harnessing-technology-for-reverse-aging-innovative-solutions-for-a-youthful-futu.md": {
	id: "harnessing-technology-for-reverse-aging-innovative-solutions-for-a-youthful-futu.md";
  slug: "harnessing-technology-for-reverse-aging-innovative-solutions-for-a-youthful-futu";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"health-and-wellness-tips-for-2026-live-your-best-life.md": {
	id: "health-and-wellness-tips-for-2026-live-your-best-life.md";
  slug: "health-and-wellness-tips-for-2026-live-your-best-life";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"health-saving-account-for-seniors.md": {
	id: "health-saving-account-for-seniors.md";
  slug: "health-saving-account-for-seniors";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"heart-hormones-and-habits-the-50-mens-health-checklist-for-2026.md": {
	id: "heart-hormones-and-habits-the-50-mens-health-checklist-for-2026.md";
  slug: "heart-hormones-and-habits-the-50-mens-health-checklist-for-2026";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"holiday-workout-quotes-get-inspired-for-a-festive-fitness-season.md": {
	id: "holiday-workout-quotes-get-inspired-for-a-festive-fitness-season.md";
  slug: "holiday-workout-quotes-get-inspired-for-a-festive-fitness-season";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"house-hacking-your-way-to-wealth-in-2026.md": {
	id: "house-hacking-your-way-to-wealth-in-2026.md";
  slug: "house-hacking-your-way-to-wealth-in-2026";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-being-unemployed-affects-you.md": {
	id: "how-being-unemployed-affects-you.md";
  slug: "how-being-unemployed-affects-you";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-do-seniors-plan-a-safe-enjoyable-trip.md": {
	id: "how-do-seniors-plan-a-safe-enjoyable-trip.md";
  slug: "how-do-seniors-plan-a-safe-enjoyable-trip";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-financial-stability-can-relieve-your-everyday-worries.md": {
	id: "how-financial-stability-can-relieve-your-everyday-worries.md";
  slug: "how-financial-stability-can-relieve-your-everyday-worries";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-going-to-bed-on-time-can-help-you-avoid-many-problems-in-life.md": {
	id: "how-going-to-bed-on-time-can-help-you-avoid-many-problems-in-life.md";
  slug: "how-going-to-bed-on-time-can-help-you-avoid-many-problems-in-life";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-i-cut-my-expenses-by-30-percent-without-feeling-deprived.md": {
	id: "how-i-cut-my-expenses-by-30-percent-without-feeling-deprived.md";
  slug: "how-i-cut-my-expenses-by-30-percent-without-feeling-deprived";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-millionaires-invest-differently-a-look-at-their-portfolios-and-strategies.md": {
	id: "how-millionaires-invest-differently-a-look-at-their-portfolios-and-strategies.md";
  slug: "how-millionaires-invest-differently-a-look-at-their-portfolios-and-strategies";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-much-does-travel-insurance-cost-in.md": {
	id: "how-much-does-travel-insurance-cost-in.md";
  slug: "how-much-does-travel-insurance-cost-in";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-much-should-you-save.md": {
	id: "how-much-should-you-save.md";
  slug: "how-much-should-you-save";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-the-ultra-wealthy-think-about-time-the-10000-hour-framework.md": {
	id: "how-the-ultra-wealthy-think-about-time-the-10000-hour-framework.md";
  slug: "how-the-ultra-wealthy-think-about-time-the-10000-hour-framework";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-afford-luxury-travel.md": {
	id: "how-to-afford-luxury-travel.md";
  slug: "how-to-afford-luxury-travel";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-apply-probabilistic-thinking-to-your-life-and-fitness-goals.md": {
	id: "how-to-apply-probabilistic-thinking-to-your-life-and-fitness-goals.md";
  slug: "how-to-apply-probabilistic-thinking-to-your-life-and-fitness-goals";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-apply-the-80-20-principle-to-your-fitness-goals-and-why-youve-been-wastin.md": {
	id: "how-to-apply-the-80-20-principle-to-your-fitness-goals-and-why-youve-been-wastin.md";
  slug: "how-to-apply-the-80-20-principle-to-your-fitness-goals-and-why-youve-been-wastin";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-apply-the-lindy-effect-to-your-fitness-and-life-goals-stop-chasing-fads-s.md": {
	id: "how-to-apply-the-lindy-effect-to-your-fitness-and-life-goals-stop-chasing-fads-s.md";
  slug: "how-to-apply-the-lindy-effect-to-your-fitness-and-life-goals-stop-chasing-fads-s";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-apply-the-pre-mortem-prospective-hindsight-technique-to-crush-your-fitnes.md": {
	id: "how-to-apply-the-pre-mortem-prospective-hindsight-technique-to-crush-your-fitnes.md";
  slug: "how-to-apply-the-pre-mortem-prospective-hindsight-technique-to-crush-your-fitnes";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-automate-capturing-your-wealth-before-you-have-a-chance-to-spend-it.md": {
	id: "how-to-automate-capturing-your-wealth-before-you-have-a-chance-to-spend-it.md";
  slug: "how-to-automate-capturing-your-wealth-before-you-have-a-chance-to-spend-it";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-budget-for-beginners.md": {
	id: "how-to-budget-for-beginners.md";
  slug: "how-to-budget-for-beginners";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-budget-for-six-months-without-job.md": {
	id: "how-to-budget-for-six-months-without-job.md";
  slug: "how-to-budget-for-six-months-without-job";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-build-a-bulletproof-fitness-career-the-circle-of-competence-pre-mortem-an.md": {
	id: "how-to-build-a-bulletproof-fitness-career-the-circle-of-competence-pre-mortem-an.md";
  slug: "how-to-build-a-bulletproof-fitness-career-the-circle-of-competence-pre-mortem-an";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-build-a-career-interruption-fund-the-financial-spotter-every-fitness-pro-.md": {
	id: "how-to-build-a-career-interruption-fund-the-financial-spotter-every-fitness-pro-.md";
  slug: "how-to-build-a-career-interruption-fund-the-financial-spotter-every-fitness-pro-";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-build-a-high-output-engine-first-principles-thinking-compounding-for-your.md": {
	id: "how-to-build-a-high-output-engine-first-principles-thinking-compounding-for-your.md";
  slug: "how-to-build-a-high-output-engine-first-principles-thinking-compounding-for-your";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-build-financial-muscle-the-pro-s-guide-to-using-good-debt-to-grow-wealth.md": {
	id: "how-to-build-financial-muscle-the-pro-s-guide-to-using-good-debt-to-grow-wealth.md";
  slug: "how-to-build-financial-muscle-the-pro-s-guide-to-using-good-debt-to-grow-wealth";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-build-long-term-wealth-like-you-build-muscle-the-lindy-ulysses-pareto-met.md": {
	id: "how-to-build-long-term-wealth-like-you-build-muscle-the-lindy-ulysses-pareto-met.md";
  slug: "how-to-build-long-term-wealth-like-you-build-muscle-the-lindy-ulysses-pareto-met";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-build-your-fire-financial-independence-retire-early-plan-a-gym-rats-guide.md": {
	id: "how-to-build-your-fire-financial-independence-retire-early-plan-a-gym-rats-guide.md";
  slug: "how-to-build-your-fire-financial-independence-retire-early-plan-a-gym-rats-guide";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-deal-with-days-when-you-have-no.md": {
	id: "how-to-deal-with-days-when-you-have-no.md";
  slug: "how-to-deal-with-days-when-you-have-no";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-develop-a-clear-vision-for-your-financial-future.md": {
	id: "how-to-develop-a-clear-vision-for-your-financial-future.md";
  slug: "how-to-develop-a-clear-vision-for-your-financial-future";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-generate-a-sustainable-retirement-income.md": {
	id: "how-to-generate-a-sustainable-retirement-income.md";
  slug: "how-to-generate-a-sustainable-retirement-income";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-get-started-at-the-gym-why-good-enough-beats-perfect-every-time.md": {
	id: "how-to-get-started-at-the-gym-why-good-enough-beats-perfect-every-time.md";
  slug: "how-to-get-started-at-the-gym-why-good-enough-beats-perfect-every-time";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-get-support-during-unemployment.md": {
	id: "how-to-get-support-during-unemployment.md";
  slug: "how-to-get-support-during-unemployment";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-live-longer-and-healthier.md": {
	id: "how-to-live-longer-and-healthier.md";
  slug: "how-to-live-longer-and-healthier";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-make-new-years-resolutions-work-strategies-and-examples.md": {
	id: "how-to-make-new-years-resolutions-work-strategies-and-examples.md";
  slug: "how-to-make-new-years-resolutions-work-strategies-and-examples";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-navigate-your-personal-finance-for-a-prosperous-future.md": {
	id: "how-to-navigate-your-personal-finance-for-a-prosperous-future.md";
  slug: "how-to-navigate-your-personal-finance-for-a-prosperous-future";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-optimize-your-retirement.md": {
	id: "how-to-optimize-your-retirement.md";
  slug: "how-to-optimize-your-retirement";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-prepare-for-employment.md": {
	id: "how-to-prepare-for-employment.md";
  slug: "how-to-prepare-for-employment";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-prevent-running-out-of-money-in-retirement-a-closer-look-at-the-4-rule.md": {
	id: "how-to-prevent-running-out-of-money-in-retirement-a-closer-look-at-the-4-rule.md";
  slug: "how-to-prevent-running-out-of-money-in-retirement-a-closer-look-at-the-4-rule";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-prioritize-saving-over-social-spending-a-balancing-act-2.md": {
	id: "how-to-prioritize-saving-over-social-spending-a-balancing-act-2.md";
  slug: "how-to-prioritize-saving-over-social-spending-a-balancing-act-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-prioritize-saving-over-social-spending-a-balancing-act.md": {
	id: "how-to-prioritize-saving-over-social-spending-a-balancing-act.md";
  slug: "how-to-prioritize-saving-over-social-spending-a-balancing-act";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-recover-like-a-pro-stop-ignoring-sleep-quality-like-an-amateur.md": {
	id: "how-to-recover-like-a-pro-stop-ignoring-sleep-quality-like-an-amateur.md";
  slug: "how-to-recover-like-a-pro-stop-ignoring-sleep-quality-like-an-amateur";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-reduce-money-anxiety-and-live.md": {
	id: "how-to-reduce-money-anxiety-and-live.md";
  slug: "how-to-reduce-money-anxiety-and-live";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-rollover-a-401k-when-changing-jobs-or-retiring.md": {
	id: "how-to-rollover-a-401k-when-changing-jobs-or-retiring.md";
  slug: "how-to-rollover-a-401k-when-changing-jobs-or-retiring";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-set-personal-finance-goal-for-2024.md": {
	id: "how-to-set-personal-finance-goal-for-2024.md";
  slug: "how-to-set-personal-finance-goal-for-2024";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-solve-your-finances-in-retirement.md": {
	id: "how-to-solve-your-finances-in-retirement.md";
  slug: "how-to-solve-your-finances-in-retirement";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-spend-money-wisely.md": {
	id: "how-to-spend-money-wisely.md";
  slug: "how-to-spend-money-wisely";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-start-planning-for-your-personal-finance.md": {
	id: "how-to-start-planning-for-your-personal-finance.md";
  slug: "how-to-start-planning-for-your-personal-finance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-start-saving-money-for-young-men.md": {
	id: "how-to-start-saving-money-for-young-men.md";
  slug: "how-to-start-saving-money-for-young-men";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-stay-consistent-with-your.md": {
	id: "how-to-stay-consistent-with-your.md";
  slug: "how-to-stay-consistent-with-your";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-stop-making-poor-financial-decisions.md": {
	id: "how-to-stop-making-poor-financial-decisions.md";
  slug: "how-to-stop-making-poor-financial-decisions";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-stop-underestimating-the-cost-of-small-purchases.md": {
	id: "how-to-stop-underestimating-the-cost-of-small-purchases.md";
  slug: "how-to-stop-underestimating-the-cost-of-small-purchases";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-take-advantage-of-refinancing.md": {
	id: "how-to-take-advantage-of-refinancing.md";
  slug: "how-to-take-advantage-of-refinancing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-thrive-after-40-comprehensive-guide.md": {
	id: "how-to-thrive-after-40-comprehensive-guide.md";
  slug: "how-to-thrive-after-40-comprehensive-guide";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-train-like-a-pro-the-real-difference-between-amateur-and-professional-mus.md": {
	id: "how-to-train-like-a-pro-the-real-difference-between-amateur-and-professional-mus.md";
  slug: "how-to-train-like-a-pro-the-real-difference-between-amateur-and-professional-mus";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-use-hormesis-why-a-little-stress-makes-you-stronger-and-how-to-dose-it-ri.md": {
	id: "how-to-use-hormesis-why-a-little-stress-makes-you-stronger-and-how-to-dose-it-ri.md";
  slug: "how-to-use-hormesis-why-a-little-stress-makes-you-stronger-and-how-to-dose-it-ri";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-use-inversion-and-second-order-thinking-to-uncover-your-fitness-blindspot.md": {
	id: "how-to-use-inversion-and-second-order-thinking-to-uncover-your-fitness-blindspot.md";
  slug: "how-to-use-inversion-and-second-order-thinking-to-uncover-your-fitness-blindspot";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-use-second-order-thinking-for-your-fitness-goals.md": {
	id: "how-to-use-second-order-thinking-for-your-fitness-goals.md";
  slug: "how-to-use-second-order-thinking-for-your-fitness-goals";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-use-via-negativa-the-power-of-subtraction-to-achieve-your-fitness-goals.md": {
	id: "how-to-use-via-negativa-the-power-of-subtraction-to-achieve-your-fitness-goals.md";
  slug: "how-to-use-via-negativa-the-power-of-subtraction-to-achieve-your-fitness-goals";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-win-at-life-top-10-lessons-to.md": {
	id: "how-to-win-at-life-top-10-lessons-to.md";
  slug: "how-to-win-at-life-top-10-lessons-to";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-walking-unsticks-the-stuck-mind-essential-benefits-for-men-over-50.md": {
	id: "how-walking-unsticks-the-stuck-mind-essential-benefits-for-men-over-50.md";
  slug: "how-walking-unsticks-the-stuck-mind-essential-benefits-for-men-over-50";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"if-it-was-easy.md": {
	id: "if-it-was-easy.md";
  slug: "if-it-was-easy";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"if-opportunity-doesnt-knock-build-a-door-proactivity-in-the-pursuit-of-success.md": {
	id: "if-opportunity-doesnt-knock-build-a-door-proactivity-in-the-pursuit-of-success.md";
  slug: "if-opportunity-doesnt-knock-build-a-door-proactivity-in-the-pursuit-of-success";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"improving-focus-and-concentration-what.md": {
	id: "improving-focus-and-concentration-what.md";
  slug: "improving-focus-and-concentration-what";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"index-funds-vs-saving-accounts-vs.md": {
	id: "index-funds-vs-saving-accounts-vs.md";
  slug: "index-funds-vs-saving-accounts-vs";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"indulging-in-luxury-navigating-the-impact-on-personal-finance-and-wealth-managem.md": {
	id: "indulging-in-luxury-navigating-the-impact-on-personal-finance-and-wealth-managem.md";
  slug: "indulging-in-luxury-navigating-the-impact-on-personal-finance-and-wealth-managem";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inflation-proofing-your-budget-whats-actually-working-in-2026.md": {
	id: "inflation-proofing-your-budget-whats-actually-working-in-2026.md";
  slug: "inflation-proofing-your-budget-whats-actually-working-in-2026";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-adam-mu.md": {
	id: "inspiration-adam-mu.md";
  slug: "inspiration-adam-mu";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-ajax.md": {
	id: "inspiration-ajax.md";
  slug: "inspiration-ajax";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-ale-rodriguez.md": {
	id: "inspiration-ale-rodriguez.md";
  slug: "inspiration-ale-rodriguez";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-alex-taylor.md": {
	id: "inspiration-alex-taylor.md";
  slug: "inspiration-alex-taylor";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-allysson-gert.md": {
	id: "inspiration-allysson-gert.md";
  slug: "inspiration-allysson-gert";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-andrea-sa.md": {
	id: "inspiration-andrea-sa.md";
  slug: "inspiration-andrea-sa";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-andy.md": {
	id: "inspiration-andy.md";
  slug: "inspiration-andy";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-augusto-r.md": {
	id: "inspiration-augusto-r.md";
  slug: "inspiration-augusto-r";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-calvin.md": {
	id: "inspiration-calvin.md";
  slug: "inspiration-calvin";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-carlos-r.md": {
	id: "inspiration-carlos-r.md";
  slug: "inspiration-carlos-r";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-chase-ro.md": {
	id: "inspiration-chase-ro.md";
  slug: "inspiration-chase-ro";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-chris-o.md": {
	id: "inspiration-chris-o.md";
  slug: "inspiration-chris-o";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-chris.md": {
	id: "inspiration-chris.md";
  slug: "inspiration-chris";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-dan.md": {
	id: "inspiration-dan.md";
  slug: "inspiration-dan";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-dave.md": {
	id: "inspiration-dave.md";
  slug: "inspiration-dave";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-denis-samson.md": {
	id: "inspiration-denis-samson.md";
  slug: "inspiration-denis-samson";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-eric.md": {
	id: "inspiration-eric.md";
  slug: "inspiration-eric";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-fabio-a.md": {
	id: "inspiration-fabio-a.md";
  slug: "inspiration-fabio-a";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-felique.md": {
	id: "inspiration-felique.md";
  slug: "inspiration-felique";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-gabriel.md": {
	id: "inspiration-gabriel.md";
  slug: "inspiration-gabriel";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-garic.md": {
	id: "inspiration-garic.md";
  slug: "inspiration-garic";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-garrett-m.md": {
	id: "inspiration-garrett-m.md";
  slug: "inspiration-garrett-m";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-geder-rocha.md": {
	id: "inspiration-geder-rocha.md";
  slug: "inspiration-geder-rocha";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-guilles.md": {
	id: "inspiration-guilles.md";
  slug: "inspiration-guilles";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-iggy.md": {
	id: "inspiration-iggy.md";
  slug: "inspiration-iggy";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-ivan-2.md": {
	id: "inspiration-ivan-2.md";
  slug: "inspiration-ivan-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-ivan.md": {
	id: "inspiration-ivan.md";
  slug: "inspiration-ivan";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-j-marcano.md": {
	id: "inspiration-j-marcano.md";
  slug: "inspiration-j-marcano";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-jack-leal.md": {
	id: "inspiration-jack-leal.md";
  slug: "inspiration-jack-leal";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-jan-h.md": {
	id: "inspiration-jan-h.md";
  slug: "inspiration-jan-h";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-jay.md": {
	id: "inspiration-jay.md";
  slug: "inspiration-jay";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-jens.md": {
	id: "inspiration-jens.md";
  slug: "inspiration-jens";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-joel-kellett.md": {
	id: "inspiration-joel-kellett.md";
  slug: "inspiration-joel-kellett";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-juan.md": {
	id: "inspiration-juan.md";
  slug: "inspiration-juan";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-justin-h.md": {
	id: "inspiration-justin-h.md";
  slug: "inspiration-justin-h";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-killian.md": {
	id: "inspiration-killian.md";
  slug: "inspiration-killian";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-kyle-h.md": {
	id: "inspiration-kyle-h.md";
  slug: "inspiration-kyle-h";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-kyle-k.md": {
	id: "inspiration-kyle-k.md";
  slug: "inspiration-kyle-k";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-levi.md": {
	id: "inspiration-levi.md";
  slug: "inspiration-levi";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-lior.md": {
	id: "inspiration-lior.md";
  slug: "inspiration-lior";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-lorenzo-c.md": {
	id: "inspiration-lorenzo-c.md";
  slug: "inspiration-lorenzo-c";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-lucas.md": {
	id: "inspiration-lucas.md";
  slug: "inspiration-lucas";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-lukas-s.md": {
	id: "inspiration-lukas-s.md";
  slug: "inspiration-lukas-s";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-mahmo.md": {
	id: "inspiration-mahmo.md";
  slug: "inspiration-mahmo";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-manuel-f.md": {
	id: "inspiration-manuel-f.md";
  slug: "inspiration-manuel-f";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-marco-tr.md": {
	id: "inspiration-marco-tr.md";
  slug: "inspiration-marco-tr";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-matt-2.md": {
	id: "inspiration-matt-2.md";
  slug: "inspiration-matt-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-matt-lu.md": {
	id: "inspiration-matt-lu.md";
  slug: "inspiration-matt-lu";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-matt.md": {
	id: "inspiration-matt.md";
  slug: "inspiration-matt";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-matthew-b.md": {
	id: "inspiration-matthew-b.md";
  slug: "inspiration-matthew-b";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-mauricio.md": {
	id: "inspiration-mauricio.md";
  slug: "inspiration-mauricio";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-mitch-3.md": {
	id: "inspiration-mitch-3.md";
  slug: "inspiration-mitch-3";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-mitch.md": {
	id: "inspiration-mitch.md";
  slug: "inspiration-mitch";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-nick-t.md": {
	id: "inspiration-nick-t.md";
  slug: "inspiration-nick-t";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-nik-anton.md": {
	id: "inspiration-nik-anton.md";
  slug: "inspiration-nik-anton";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-oleg.md": {
	id: "inspiration-oleg.md";
  slug: "inspiration-oleg";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-oussam-sidaoui.md": {
	id: "inspiration-oussam-sidaoui.md";
  slug: "inspiration-oussam-sidaoui";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-pablo-s.md": {
	id: "inspiration-pablo-s.md";
  slug: "inspiration-pablo-s";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-paride.md": {
	id: "inspiration-paride.md";
  slug: "inspiration-paride";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-paul-mont.md": {
	id: "inspiration-paul-mont.md";
  slug: "inspiration-paul-mont";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-peach.md": {
	id: "inspiration-peach.md";
  slug: "inspiration-peach";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-phil.md": {
	id: "inspiration-phil.md";
  slug: "inspiration-phil";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-romal.md": {
	id: "inspiration-romal.md";
  slug: "inspiration-romal";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-sean-sta.md": {
	id: "inspiration-sean-sta.md";
  slug: "inspiration-sean-sta";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-stefan-p.md": {
	id: "inspiration-stefan-p.md";
  slug: "inspiration-stefan-p";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-steve-martin.md": {
	id: "inspiration-steve-martin.md";
  slug: "inspiration-steve-martin";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-thiago.md": {
	id: "inspiration-thiago.md";
  slug: "inspiration-thiago";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-valeriy.md": {
	id: "inspiration-valeriy.md";
  slug: "inspiration-valeriy";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-vince-b.md": {
	id: "inspiration-vince-b.md";
  slug: "inspiration-vince-b";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-vinicius-2.md": {
	id: "inspiration-vinicius-2.md";
  slug: "inspiration-vinicius-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-vinicius.md": {
	id: "inspiration-vinicius.md";
  slug: "inspiration-vinicius";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-wandson-f.md": {
	id: "inspiration-wandson-f.md";
  slug: "inspiration-wandson-f";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inspiration-zac.md": {
	id: "inspiration-zac.md";
  slug: "inspiration-zac";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"internal-vs-external.md": {
	id: "internal-vs-external.md";
  slug: "internal-vs-external";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"inversion-explained-why-being-less-stupid-is-your-best-fitness-strategy.md": {
	id: "inversion-explained-why-being-less-stupid-is-your-best-fitness-strategy.md";
  slug: "inversion-explained-why-being-less-stupid-is-your-best-fitness-strategy";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"investing-after-50-in-2026-how-men-can-grow-wealth-without-taking-dumb-risks.md": {
	id: "investing-after-50-in-2026-how-men-can-grow-wealth-without-taking-dumb-risks.md";
  slug: "investing-after-50-in-2026-how-men-can-grow-wealth-without-taking-dumb-risks";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"investing-in-high-quality-healthcare-is.md": {
	id: "investing-in-high-quality-healthcare-is.md";
  slug: "investing-in-high-quality-healthcare-is";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"investing-in-retirement-beyond-401k-plans-real-estate-stocks-bonds-and-more.md": {
	id: "investing-in-retirement-beyond-401k-plans-real-estate-stocks-bonds-and-more.md";
  slug: "investing-in-retirement-beyond-401k-plans-real-estate-stocks-bonds-and-more";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"investing-in-tomorrow-actions-for-a-grateful-future-self.md": {
	id: "investing-in-tomorrow-actions-for-a-grateful-future-self.md";
  slug: "investing-in-tomorrow-actions-for-a-grateful-future-self";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"investing-like-youre-running-out-of-time-7-key-strategies.md": {
	id: "investing-like-youre-running-out-of-time-7-key-strategies.md";
  slug: "investing-like-youre-running-out-of-time-7-key-strategies";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"investment-basics-for-men-over-40-why-you-need-a-plan-beyond-the-stock-market.md": {
	id: "investment-basics-for-men-over-40-why-you-need-a-plan-beyond-the-stock-market.md";
  slug: "investment-basics-for-men-over-40-why-you-need-a-plan-beyond-the-stock-market";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"invisible-money-leaks-expenses-quietly-stealing-retirement.md": {
	id: "invisible-money-leaks-expenses-quietly-stealing-retirement.md";
  slug: "invisible-money-leaks-expenses-quietly-stealing-retirement";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"irmaa-2026-for-men-over-60-how-to-avoid-expensive-medicare-surcharges.md": {
	id: "irmaa-2026-for-men-over-60-how-to-avoid-expensive-medicare-surcharges.md";
  slug: "irmaa-2026-for-men-over-60-how-to-avoid-expensive-medicare-surcharges";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"is-100k-annual-income-lot.md": {
	id: "is-100k-annual-income-lot.md";
  slug: "is-100k-annual-income-lot";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"its-never-too-late-to-be-what-you-mightve-been.md": {
	id: "its-never-too-late-to-be-what-you-mightve-been.md";
  slug: "its-never-too-late-to-be-what-you-mightve-been";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"its-never-too-late-why-seniors-should-learn-about-personal-finance.md": {
	id: "its-never-too-late-why-seniors-should-learn-about-personal-finance.md";
  slug: "its-never-too-late-why-seniors-should-learn-about-personal-finance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"its-temporary.md": {
	id: "its-temporary.md";
  slug: "its-temporary";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"its-you-and-only-you.md": {
	id: "its-you-and-only-you.md";
  slug: "its-you-and-only-you";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"jumpstarting-your-weight-loss-journey-essential-tips-for-beginners.md": {
	id: "jumpstarting-your-weight-loss-journey-essential-tips-for-beginners.md";
  slug: "jumpstarting-your-weight-loss-journey-essential-tips-for-beginners";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"leaving-traditional-job-balancing-risks.md": {
	id: "leaving-traditional-job-balancing-risks.md";
  slug: "leaving-traditional-job-balancing-risks";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"lets-have-fit-body-today.md": {
	id: "lets-have-fit-body-today.md";
  slug: "lets-have-fit-body-today";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"liberating-wealth-how-rich-transcend.md": {
	id: "liberating-wealth-how-rich-transcend.md";
  slug: "liberating-wealth-how-rich-transcend";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"life-advices-for-people-turning-30s.md": {
	id: "life-advices-for-people-turning-30s.md";
  slug: "life-advices-for-people-turning-30s";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"life-is-rollercoaster-ride.md": {
	id: "life-is-rollercoaster-ride.md";
  slug: "life-is-rollercoaster-ride";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"lifestyle-reset-finding-purpose-and-balance-in-your-50s-and-60s.md": {
	id: "lifestyle-reset-finding-purpose-and-balance-in-your-50s-and-60s.md";
  slug: "lifestyle-reset-finding-purpose-and-balance-in-your-50s-and-60s";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"live-longer-live-better-the-case-for-cardio-and-weightlifting.md": {
	id: "live-longer-live-better-the-case-for-cardio-and-weightlifting.md";
  slug: "live-longer-live-better-the-case-for-cardio-and-weightlifting";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"living-it-up-on-budget-in-city-how-to.md": {
	id: "living-it-up-on-budget-in-city-how-to.md";
  slug: "living-it-up-on-budget-in-city-how-to";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"long-term-care-insurance-vs-self-funding-for-men-over-60-cost-models-that-actual.md": {
	id: "long-term-care-insurance-vs-self-funding-for-men-over-60-cost-models-that-actual.md";
  slug: "long-term-care-insurance-vs-self-funding-for-men-over-60-cost-models-that-actual";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"long-term-loan-vs-credit-card-how.md": {
	id: "long-term-loan-vs-credit-card-how.md";
  slug: "long-term-loan-vs-credit-card-how";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"low-impact-workouts-to-elevate-your-fitness-journey.md": {
	id: "low-impact-workouts-to-elevate-your-fitness-journey.md";
  slug: "low-impact-workouts-to-elevate-your-fitness-journey";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"making-better-financial-decisions-a-roadmap-to-financial-well-being-2.md": {
	id: "making-better-financial-decisions-a-roadmap-to-financial-well-being-2.md";
  slug: "making-better-financial-decisions-a-roadmap-to-financial-well-being-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"making-better-financial-decisions-a-roadmap-to-financial-well-being.md": {
	id: "making-better-financial-decisions-a-roadmap-to-financial-well-being.md";
  slug: "making-better-financial-decisions-a-roadmap-to-financial-well-being";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"making-money-when-unemployed.md": {
	id: "making-money-when-unemployed.md";
  slug: "making-money-when-unemployed";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"manage-personal-finance-during-times-of.md": {
	id: "manage-personal-finance-during-times-of.md";
  slug: "manage-personal-finance-during-times-of";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"managing-expenses-in-retirement-practical-tips-for-men-50.md": {
	id: "managing-expenses-in-retirement-practical-tips-for-men-50.md";
  slug: "managing-expenses-in-retirement-practical-tips-for-men-50";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"managing-your-wealth-in-retirement-spend-more-worry-less.md": {
	id: "managing-your-wealth-in-retirement-spend-more-worry-less.md";
  slug: "managing-your-wealth-in-retirement-spend-more-worry-less";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"mastering-financial-discipline-sticking-to-your-budget-and-avoiding-emotional-pu.md": {
	id: "mastering-financial-discipline-sticking-to-your-budget-and-avoiding-emotional-pu.md";
  slug: "mastering-financial-discipline-sticking-to-your-budget-and-avoiding-emotional-pu";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"mastering-stress-management-effective-tips-for-a-balanced-life.md": {
	id: "mastering-stress-management-effective-tips-for-a-balanced-life.md";
  slug: "mastering-stress-management-effective-tips-for-a-balanced-life";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"mastering-the-art-of-decision-making-your-key-to-success-in-life.md": {
	id: "mastering-the-art-of-decision-making-your-key-to-success-in-life.md";
  slug: "mastering-the-art-of-decision-making-your-key-to-success-in-life";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"mastering-the-day-the-power-of-planning-distance-and-execution.md": {
	id: "mastering-the-day-the-power-of-planning-distance-and-execution.md";
  slug: "mastering-the-day-the-power-of-planning-distance-and-execution";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"mastering-willpower-and-energy-management-strategies-for-a-productive-life.md": {
	id: "mastering-willpower-and-energy-management-strategies-for-a-productive-life.md";
  slug: "mastering-willpower-and-energy-management-strategies-for-a-productive-life";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"maximizing-financial-assets-understanding-the-pros-and-cons.md": {
	id: "maximizing-financial-assets-understanding-the-pros-and-cons.md";
  slug: "maximizing-financial-assets-understanding-the-pros-and-cons";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"maximizing-the-benefits-of-credit-cards-smart-financial-strategies.md": {
	id: "maximizing-the-benefits-of-credit-cards-smart-financial-strategies.md";
  slug: "maximizing-the-benefits-of-credit-cards-smart-financial-strategies";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"men-40-and-digital-wealth-traps-in-2026-how-to-avoid-scams-hype-and-costly-distr.md": {
	id: "men-40-and-digital-wealth-traps-in-2026-how-to-avoid-scams-hype-and-costly-distr.md";
  slug: "men-40-and-digital-wealth-traps-in-2026-how-to-avoid-scams-hype-and-costly-distr";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"men-50-physical-health-in-2026-the-minimum-effective-routine-for-longevity.md": {
	id: "men-50-physical-health-in-2026-the-minimum-effective-routine-for-longevity.md";
  slug: "men-50-physical-health-in-2026-the-minimum-effective-routine-for-longevity";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"men-over-50-and-purposeful-living-a-2026-lifestyle-blueprint-for-energy-meaning-.md": {
	id: "men-over-50-and-purposeful-living-a-2026-lifestyle-blueprint-for-energy-meaning-.md";
  slug: "men-over-50-and-purposeful-living-a-2026-lifestyle-blueprint-for-energy-meaning-";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"mental-health-for-men-50-the-2026-playbook-for-stress-identity-and-emotional-str.md": {
	id: "mental-health-for-men-50-the-2026-playbook-for-stress-identity-and-emotional-str.md";
  slug: "mental-health-for-men-50-the-2026-playbook-for-stress-identity-and-emotional-str";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"metabolic-restoration-the-anti-diet-approach-that-actually-works-for-men-over-50.md": {
	id: "metabolic-restoration-the-anti-diet-approach-that-actually-works-for-men-over-50.md";
  slug: "metabolic-restoration-the-anti-diet-approach-that-actually-works-for-men-over-50";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"michael-va.md": {
	id: "michael-va.md";
  slug: "michael-va";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"mindfulness-and-aging-a-guide-to-mental-wellness-for-seniors-2.md": {
	id: "mindfulness-and-aging-a-guide-to-mental-wellness-for-seniors-2.md";
  slug: "mindfulness-and-aging-a-guide-to-mental-wellness-for-seniors-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"minimalism-challenge-can-living-with-less-actually-save-money.md": {
	id: "minimalism-challenge-can-living-with-less-actually-save-money.md";
  slug: "minimalism-challenge-can-living-with-less-actually-save-money";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"money-as-an-energy-system-not-a-number.md": {
	id: "money-as-an-energy-system-not-a-number.md";
  slug: "money-as-an-energy-system-not-a-number";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"money-mindset-in-2026-9-daily-habits-that-quiet-financial-anxiety.md": {
	id: "money-mindset-in-2026-9-daily-habits-that-quiet-financial-anxiety.md";
  slug: "money-mindset-in-2026-9-daily-habits-that-quiet-financial-anxiety";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"money-mindset-shifts-how-to-develop-a-healthy-relationship-with-wealth-2.md": {
	id: "money-mindset-shifts-how-to-develop-a-healthy-relationship-with-wealth-2.md";
  slug: "money-mindset-shifts-how-to-develop-a-healthy-relationship-with-wealth-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"natural-ways-to-boost-health-for-men-over-40-tips-home-biohacking-and-more.md": {
	id: "natural-ways-to-boost-health-for-men-over-40-tips-home-biohacking-and-more.md";
  slug: "natural-ways-to-boost-health-for-men-over-40-tips-home-biohacking-and-more";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"navigating-economic-uncertainties-smart-ways-to-utilize-your-credit-card.md": {
	id: "navigating-economic-uncertainties-smart-ways-to-utilize-your-credit-card.md";
  slug: "navigating-economic-uncertainties-smart-ways-to-utilize-your-credit-card";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"navigating-financial-surprises-strategies-for-managing-unexpected-expenses.md": {
	id: "navigating-financial-surprises-strategies-for-managing-unexpected-expenses.md";
  slug: "navigating-financial-surprises-strategies-for-managing-unexpected-expenses";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"navigating-retirement-balancing-savings-investments-and-social-security.md": {
	id: "navigating-retirement-balancing-savings-investments-and-social-security.md";
  slug: "navigating-retirement-balancing-savings-investments-and-social-security";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"navigating-the-financial-landscape-of-2025-essential-strategies-for-future-proof.md": {
	id: "navigating-the-financial-landscape-of-2025-essential-strategies-for-future-proof.md";
  slug: "navigating-the-financial-landscape-of-2025-essential-strategies-for-future-proof";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"necessities-vs-luxuries-understanding-your-financial-priorities.md": {
	id: "necessities-vs-luxuries-understanding-your-financial-priorities.md";
  slug: "necessities-vs-luxuries-understanding-your-financial-priorities";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"new-beginnings-exciting-activities-for-senior-men-to-rediscover-joy.md": {
	id: "new-beginnings-exciting-activities-for-senior-men-to-rediscover-joy.md";
  slug: "new-beginnings-exciting-activities-for-senior-men-to-rediscover-joy";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"nfts-why-they-might-not-be-the-best-investment.md": {
	id: "nfts-why-they-might-not-be-the-best-investment.md";
  slug: "nfts-why-they-might-not-be-the-best-investment";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"nurturing-your-greatest-asset-the-power-of-the-mind.md": {
	id: "nurturing-your-greatest-asset-the-power-of-the-mind.md";
  slug: "nurturing-your-greatest-asset-the-power-of-the-mind";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"optimal-sleep-timing-for-men-over-40-what-you-should-know.md": {
	id: "optimal-sleep-timing-for-men-over-40-what-you-should-know.md";
  slug: "optimal-sleep-timing-for-men-over-40-what-you-should-know";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"overcoming-exercise-procrastination-how-to-stay-active-on-unmotivated-days.md": {
	id: "overcoming-exercise-procrastination-how-to-stay-active-on-unmotivated-days.md";
  slug: "overcoming-exercise-procrastination-how-to-stay-active-on-unmotivated-days";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"overcoming-human-nature-the-path-to-financial-freedom.md": {
	id: "overcoming-human-nature-the-path-to-financial-freedom.md";
  slug: "overcoming-human-nature-the-path-to-financial-freedom";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"overcoming-the-fear-of-financial-instability.md": {
	id: "overcoming-the-fear-of-financial-instability.md";
  slug: "overcoming-the-fear-of-financial-instability";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"passion-fuels-progress-finding-success-in-your-intense-interests.md": {
	id: "passion-fuels-progress-finding-success-in-your-intense-interests.md";
  slug: "passion-fuels-progress-finding-success-in-your-intense-interests";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"patience-and-persistence-for-success.md": {
	id: "patience-and-persistence-for-success.md";
  slug: "patience-and-persistence-for-success";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"patience-is-essential-for-achieving-long-term-success.md": {
	id: "patience-is-essential-for-achieving-long-term-success.md";
  slug: "patience-is-essential-for-achieving-long-term-success";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"persistence-in-motion-the-unyielding-drive-forward-that-defines-success.md": {
	id: "persistence-in-motion-the-unyielding-drive-forward-that-defines-success.md";
  slug: "persistence-in-motion-the-unyielding-drive-forward-that-defines-success";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"personal-finance-how-millionaires-use-debt-to-their-advantage.md": {
	id: "personal-finance-how-millionaires-use-debt-to-their-advantage.md";
  slug: "personal-finance-how-millionaires-use-debt-to-their-advantage";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"personal-finance-management-in-times-of-inflation.md": {
	id: "personal-finance-management-in-times-of-inflation.md";
  slug: "personal-finance-management-in-times-of-inflation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"personal-finance-tip-income-diversification.md": {
	id: "personal-finance-tip-income-diversification.md";
  slug: "personal-finance-tip-income-diversification";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"personal-finance-tip-of-the-day-how-many-credit-cards-should-you-have.md": {
	id: "personal-finance-tip-of-the-day-how-many-credit-cards-should-you-have.md";
  slug: "personal-finance-tip-of-the-day-how-many-credit-cards-should-you-have";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"personal-finance-tips-for-2026-plan-your-wealth.md": {
	id: "personal-finance-tips-for-2026-plan-your-wealth.md";
  slug: "personal-finance-tips-for-2026-plan-your-wealth";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"personal-finance-tips-for-men-in-their-30s.md": {
	id: "personal-finance-tips-for-men-in-their-30s.md";
  slug: "personal-finance-tips-for-men-in-their-30s";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"personal-finance-tips-how-to-achieve-financial-freedom.md": {
	id: "personal-finance-tips-how-to-achieve-financial-freedom.md";
  slug: "personal-finance-tips-how-to-achieve-financial-freedom";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"personal-finance-tips-investing-for-beginners.md": {
	id: "personal-finance-tips-investing-for-beginners.md";
  slug: "personal-finance-tips-investing-for-beginners";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"personal-finance-tips-updating-your-income-changes.md": {
	id: "personal-finance-tips-updating-your-income-changes.md";
  slug: "personal-finance-tips-updating-your-income-changes";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"personal-finance-vs-happiness.md": {
	id: "personal-finance-vs-happiness.md";
  slug: "personal-finance-vs-happiness";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"personal-responsibility-and-financial-success-the-importance-of-managing-your-ow.md": {
	id: "personal-responsibility-and-financial-success-the-importance-of-managing-your-ow.md";
  slug: "personal-responsibility-and-financial-success-the-importance-of-managing-your-ow";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"personal-trainer-vs-youtube-fitness-videos-which-is-better-for-beginners.md": {
	id: "personal-trainer-vs-youtube-fitness-videos-which-is-better-for-beginners.md";
  slug: "personal-trainer-vs-youtube-fitness-videos-which-is-better-for-beginners";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"preparing-for-retirement-as-a-single-person.md": {
	id: "preparing-for-retirement-as-a-single-person.md";
  slug: "preparing-for-retirement-as-a-single-person";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"preventive-healthcare-why-is-it-a-wise-investment.md": {
	id: "preventive-healthcare-why-is-it-a-wise-investment.md";
  slug: "preventive-healthcare-why-is-it-a-wise-investment";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"pro-training-vs-amateur-building-a-fit-lifestyle-and-making-money.md": {
	id: "pro-training-vs-amateur-building-a-fit-lifestyle-and-making-money.md";
  slug: "pro-training-vs-amateur-building-a-fit-lifestyle-and-making-money";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"procrastination-busting-strategies-tips-to-overcome-the-delaying-habit.md": {
	id: "procrastination-busting-strategies-tips-to-overcome-the-delaying-habit.md";
  slug: "procrastination-busting-strategies-tips-to-overcome-the-delaying-habit";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"procrastination-the-thief-of-time-and-the-power-of-immediate-action.md": {
	id: "procrastination-the-thief-of-time-and-the-power-of-immediate-action.md";
  slug: "procrastination-the-thief-of-time-and-the-power-of-immediate-action";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"real-estate-investing-and-homeownership.md": {
	id: "real-estate-investing-and-homeownership.md";
  slug: "real-estate-investing-and-homeownership";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"real-estate-investment-a-pathway-to-growing-wealth.md": {
	id: "real-estate-investment-a-pathway-to-growing-wealth.md";
  slug: "real-estate-investment-a-pathway-to-growing-wealth";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"real-estate-tangible-asset-with-tangible-benefits.md": {
	id: "real-estate-tangible-asset-with-tangible-benefits.md";
  slug: "real-estate-tangible-asset-with-tangible-benefits";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"rediscovering-youth-a-mans-guide-to-feeling-vibrant-in-your-40s.md": {
	id: "rediscovering-youth-a-mans-guide-to-feeling-vibrant-in-your-40s.md";
  slug: "rediscovering-youth-a-mans-guide-to-feeling-vibrant-in-your-40s";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"refinance-your-car-loan-things-to.md": {
	id: "refinance-your-car-loan-things-to.md";
  slug: "refinance-your-car-loan-things-to";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"reframing-loss-from-catastrophe-to-classroom-2.md": {
	id: "reframing-loss-from-catastrophe-to-classroom-2.md";
  slug: "reframing-loss-from-catastrophe-to-classroom-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"reframing-loss-from-catastrophe-to-classroom-3.md": {
	id: "reframing-loss-from-catastrophe-to-classroom-3.md";
  slug: "reframing-loss-from-catastrophe-to-classroom-3";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"reframing-loss-from-catastrophe-to-classroom.md": {
	id: "reframing-loss-from-catastrophe-to-classroom.md";
  slug: "reframing-loss-from-catastrophe-to-classroom";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"regaining-momentum-the-one-day-reset.md": {
	id: "regaining-momentum-the-one-day-reset.md";
  slug: "regaining-momentum-the-one-day-reset";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"rethinking-success-the-unconventional-backdrops-of-real-winners.md": {
	id: "rethinking-success-the-unconventional-backdrops-of-real-winners.md";
  slug: "rethinking-success-the-unconventional-backdrops-of-real-winners";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"retirement-income-strategies-for-different-market-conditions.md": {
	id: "retirement-income-strategies-for-different-market-conditions.md";
  slug: "retirement-income-strategies-for-different-market-conditions";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"retirement-planning-as-a-self-employed-individual-what-should-you-consider.md": {
	id: "retirement-planning-as-a-self-employed-individual-what-should-you-consider.md";
  slug: "retirement-planning-as-a-self-employed-individual-what-should-you-consider";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"retirement-planning-checklist-to-consider.md": {
	id: "retirement-planning-checklist-to-consider.md";
  slug: "retirement-planning-checklist-to-consider";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"retirement-planning-do-it-right-for.md": {
	id: "retirement-planning-do-it-right-for.md";
  slug: "retirement-planning-do-it-right-for";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"retirement-planning-the-common-pitfalls.md": {
	id: "retirement-planning-the-common-pitfalls.md";
  slug: "retirement-planning-the-common-pitfalls";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"retirement-reinvented-building-a-second-act-that-actually-pays.md": {
	id: "retirement-reinvented-building-a-second-act-that-actually-pays.md";
  slug: "retirement-reinvented-building-a-second-act-that-actually-pays";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"retirement-without-boredom-a-purpose-and-cash-plan-for-senior-men-in-2026.md": {
	id: "retirement-without-boredom-a-purpose-and-cash-plan-for-senior-men-in-2026.md";
  slug: "retirement-without-boredom-a-purpose-and-cash-plan-for-senior-men-in-2026";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"reverse-engineering-life-achieving-your-goals-by-solving-backward.md": {
	id: "reverse-engineering-life-achieving-your-goals-by-solving-backward.md";
  slug: "reverse-engineering-life-achieving-your-goals-by-solving-backward";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"revocable-vs-irrevocable-trust-in-2026-what-men-over-60-need-to-protect-assets.md": {
	id: "revocable-vs-irrevocable-trust-in-2026-what-men-over-60-need-to-protect-assets.md";
  slug: "revocable-vs-irrevocable-trust-in-2026-what-men-over-60-need-to-protect-assets";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"rewiring-your-mindset-to-hit-every-2026-money-goal.md": {
	id: "rewiring-your-mindset-to-hit-every-2026-money-goal.md";
  slug: "rewiring-your-mindset-to-hit-every-2026-money-goal";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"rise-and-thrive-the-transformative-benefits-of-waking-up-early-and-going-to-bed-.md": {
	id: "rise-and-thrive-the-transformative-benefits-of-waking-up-early-and-going-to-bed-.md";
  slug: "rise-and-thrive-the-transformative-benefits-of-waking-up-early-and-going-to-bed-";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"risk-taking-the-path-to-growth-and-innovation.md": {
	id: "risk-taking-the-path-to-growth-and-innovation.md";
  slug: "risk-taking-the-path-to-growth-and-innovation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"roth-conversions-after-60-a-5-year-plan-to-reduce-future-irmaa-and-taxes.md": {
	id: "roth-conversions-after-60-a-5-year-plan-to-reduce-future-irmaa-and-taxes.md";
  slug: "roth-conversions-after-60-a-5-year-plan-to-reduce-future-irmaa-and-taxes";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"sacrifice-the-easy-life-for-financial-success.md": {
	id: "sacrifice-the-easy-life-for-financial-success.md";
  slug: "sacrifice-the-easy-life-for-financial-success";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"saving-for-retirement-why-is-it.md": {
	id: "saving-for-retirement-why-is-it.md";
  slug: "saving-for-retirement-why-is-it";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"second-order-thinking-explained-why-sleep-is-the-ultimate-performance-enhancing-.md": {
	id: "second-order-thinking-explained-why-sleep-is-the-ultimate-performance-enhancing-.md";
  slug: "second-order-thinking-explained-why-sleep-is-the-ultimate-performance-enhancing-";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"self-confidence-is-the-memory-of-success.md": {
	id: "self-confidence-is-the-memory-of-success.md";
  slug: "self-confidence-is-the-memory-of-success";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"senior-fitness-maintaining-strength-and-mobility-in-your-60s-and-beyond-2.md": {
	id: "senior-fitness-maintaining-strength-and-mobility-in-your-60s-and-beyond-2.md";
  slug: "senior-fitness-maintaining-strength-and-mobility-in-your-60s-and-beyond-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"senior-strength-training-at-home-in-2026-safe-progress-without-a-gym.md": {
	id: "senior-strength-training-at-home-in-2026-safe-progress-without-a-gym.md";
  slug: "senior-strength-training-at-home-in-2026-safe-progress-without-a-gym";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"seniors-and-personal-finance.md": {
	id: "seniors-and-personal-finance.md";
  slug: "seniors-and-personal-finance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"set-your-priorities.md": {
	id: "set-your-priorities.md";
  slug: "set-your-priorities";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"setting-financial-boundaries-with-friends-who-spend-more.md": {
	id: "setting-financial-boundaries-with-friends-who-spend-more.md";
  slug: "setting-financial-boundaries-with-friends-who-spend-more";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"setting-up-passive-income-streams-practical-tips-and-strategies.md": {
	id: "setting-up-passive-income-streams-practical-tips-and-strategies.md";
  slug: "setting-up-passive-income-streams-practical-tips-and-strategies";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"shielding-your-credit-in-challenging-times-key-strategies-for-financial-resilien.md": {
	id: "shielding-your-credit-in-challenging-times-key-strategies-for-financial-resilien.md";
  slug: "shielding-your-credit-in-challenging-times-key-strategies-for-financial-resilien";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"shifting-gears-transforming-your-perspective-for-enhanced-personal-finance-succe.md": {
	id: "shifting-gears-transforming-your-perspective-for-enhanced-personal-finance-succe.md";
  slug: "shifting-gears-transforming-your-perspective-for-enhanced-personal-finance-succe";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"shifting-the-mindset-recognizing-the-importance-of-money.md": {
	id: "shifting-the-mindset-recognizing-the-importance-of-money.md";
  slug: "shifting-the-mindset-recognizing-the-importance-of-money";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"shifting-your-perspective.md": {
	id: "shifting-your-perspective.md";
  slug: "shifting-your-perspective";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"should-you-downsize-in-your-40s-or-50s-the-financial-pros-and-cons-for-men.md": {
	id: "should-you-downsize-in-your-40s-or-50s-the-financial-pros-and-cons-for-men.md";
  slug: "should-you-downsize-in-your-40s-or-50s-the-financial-pros-and-cons-for-men";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"should-you-get-amex-credit-cards.md": {
	id: "should-you-get-amex-credit-cards.md";
  slug: "should-you-get-amex-credit-cards";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"should-you-purchase-house-if-you-make.md": {
	id: "should-you-purchase-house-if-you-make.md";
  slug: "should-you-purchase-house-if-you-make";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"simplifying-personal-finance-three-essential-pillars-for-financial-success.md": {
	id: "simplifying-personal-finance-three-essential-pillars-for-financial-success.md";
  slug: "simplifying-personal-finance-three-essential-pillars-for-financial-success";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"sixpack-abs-and-muscles.md": {
	id: "sixpack-abs-and-muscles.md";
  slug: "sixpack-abs-and-muscles";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"sleep-after-50-why-your-recovery-depends-on-it-and-how-to-fix-it.md": {
	id: "sleep-after-50-why-your-recovery-depends-on-it-and-how-to-fix-it.md";
  slug: "sleep-after-50-why-your-recovery-depends-on-it-and-how-to-fix-it";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"smart-holidaying-top-10-tips-for-travel-and-spending-planning.md": {
	id: "smart-holidaying-top-10-tips-for-travel-and-spending-planning.md";
  slug: "smart-holidaying-top-10-tips-for-travel-and-spending-planning";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"smart-investing-strategies-for-2026-building-wealth-in-uncertain-times.md": {
	id: "smart-investing-strategies-for-2026-building-wealth-in-uncertain-times.md";
  slug: "smart-investing-strategies-for-2026-building-wealth-in-uncertain-times";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"social-media-is-not-real.md": {
	id: "social-media-is-not-real.md";
  slug: "social-media-is-not-real";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"solo-dining-mastery-building-wealth-while-eating-well-after-50.md": {
	id: "solo-dining-mastery-building-wealth-while-eating-well-after-50.md";
  slug: "solo-dining-mastery-building-wealth-while-eating-well-after-50";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"something-money-cant-buy.md": {
	id: "something-money-cant-buy.md";
  slug: "something-money-cant-buy";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"spending-money-without-regrets.md": {
	id: "spending-money-without-regrets.md";
  slug: "spending-money-without-regrets";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"starting-over-at-40-a-fitness-reset-for-men.md": {
	id: "starting-over-at-40-a-fitness-reset-for-men.md";
  slug: "starting-over-at-40-a-fitness-reset-for-men";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"starting-over-at-40-career-reinvention-strategies.md": {
	id: "starting-over-at-40-career-reinvention-strategies.md";
  slug: "starting-over-at-40-career-reinvention-strategies";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"starting-over-at-40-dating-relationships-after-40.md": {
	id: "starting-over-at-40-dating-relationships-after-40.md";
  slug: "starting-over-at-40-dating-relationships-after-40";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"starting-over-at-40-mindset-resilience-and-practical-habits.md": {
	id: "starting-over-at-40-mindset-resilience-and-practical-habits.md";
  slug: "starting-over-at-40-mindset-resilience-and-practical-habits";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"starting-over-at-40-rebuilding-your-finances.md": {
	id: "starting-over-at-40-rebuilding-your-finances.md";
  slug: "starting-over-at-40-rebuilding-your-finances";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"staycation-savoring-your-time-without-leaving-home.md": {
	id: "staycation-savoring-your-time-without-leaving-home.md";
  slug: "staycation-savoring-your-time-without-leaving-home";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"staying-calm-and-confident-in-stressful-business-situations-a-career-unlock.md": {
	id: "staying-calm-and-confident-in-stressful-business-situations-a-career-unlock.md";
  slug: "staying-calm-and-confident-in-stressful-business-situations-a-career-unlock";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"staying-credit-healthy-in-tough-times.md": {
	id: "staying-credit-healthy-in-tough-times.md";
  slug: "staying-credit-healthy-in-tough-times";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"staying-healthy-after-50-essential-health-tips-for-men.md": {
	id: "staying-healthy-after-50-essential-health-tips-for-men.md";
  slug: "staying-healthy-after-50-essential-health-tips-for-men";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"staying-positive-thriving-in-your-senior-years-living-alone.md": {
	id: "staying-positive-thriving-in-your-senior-years-living-alone.md";
  slug: "staying-positive-thriving-in-your-senior-years-living-alone";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"stop-doing-wrong-thing-over-and-over.md": {
	id: "stop-doing-wrong-thing-over-and-over.md";
  slug: "stop-doing-wrong-thing-over-and-over";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"stop-spending-reactively-how-to-master-the-art-of-intentional-spending.md": {
	id: "stop-spending-reactively-how-to-master-the-art-of-intentional-spending.md";
  slug: "stop-spending-reactively-how-to-master-the-art-of-intentional-spending";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"stop-trading-time-start-allocating-capital-the-capital-allocator-mindset.md": {
	id: "stop-trading-time-start-allocating-capital-the-capital-allocator-mindset.md";
  slug: "stop-trading-time-start-allocating-capital-the-capital-allocator-mindset";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"streamline-your-financial-life-the-importance-of-reducing-unnecessary-expenses.md": {
	id: "streamline-your-financial-life-the-importance-of-reducing-unnecessary-expenses.md";
  slug: "streamline-your-financial-life-the-importance-of-reducing-unnecessary-expenses";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"strength-training-for-men-50-the-longevity-framework-that-also-improves-leadersh.md": {
	id: "strength-training-for-men-50-the-longevity-framework-that-also-improves-leadersh.md";
  slug: "strength-training-for-men-50-the-longevity-framework-that-also-improves-leadersh";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"swimming-upstream-the-journey-to-strength-leanness-and-alertness.md": {
	id: "swimming-upstream-the-journey-to-strength-leanness-and-alertness.md";
  slug: "swimming-upstream-the-journey-to-strength-leanness-and-alertness";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"tackling-the-bias-to-avoid-discomfort-for-financial-growth.md": {
	id: "tackling-the-bias-to-avoid-discomfort-for-financial-growth.md";
  slug: "tackling-the-bias-to-avoid-discomfort-for-financial-growth";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"take-break-how-to-plan-successful-mini.md": {
	id: "take-break-how-to-plan-successful-mini.md";
  slug: "take-break-how-to-plan-successful-mini";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"tax-efficient-retirement-withdrawals-for-men-over-60-which-account-to-tap-first.md": {
	id: "tax-efficient-retirement-withdrawals-for-men-over-60-which-account-to-tap-first.md";
  slug: "tax-efficient-retirement-withdrawals-for-men-over-60-which-account-to-tap-first";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"technology-its-effect-on-employment.md": {
	id: "technology-its-effect-on-employment.md";
  slug: "technology-its-effect-on-employment";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-2026-manifesto-why-your-brain-needs-a-hard-reset-more-than-ever.md": {
	id: "the-2026-manifesto-why-your-brain-needs-a-hard-reset-more-than-ever.md";
  slug: "the-2026-manifesto-why-your-brain-needs-a-hard-reset-more-than-ever";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-2026-retirement-cash-flow-ladder-for-men-50-spend-with-confidence-not-fear.md": {
	id: "the-2026-retirement-cash-flow-ladder-for-men-50-spend-with-confidence-not-fear.md";
  slug: "the-2026-retirement-cash-flow-ladder-for-men-50-spend-with-confidence-not-fear";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-2026-second-half-strategy-reinventing-career-and-money-after-45.md": {
	id: "the-2026-second-half-strategy-reinventing-career-and-money-after-45.md";
  slug: "the-2026-second-half-strategy-reinventing-career-and-money-after-45";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-40-performance-stack-sleep-steps-and-spending-rules-for-a-sharper-2026.md": {
	id: "the-40-performance-stack-sleep-steps-and-spending-rules-for-a-sharper-2026.md";
  slug: "the-40-performance-stack-sleep-steps-and-spending-rules-for-a-sharper-2026";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-40-testosterone-paradox-why-your-gym-goals-are-different-and-better.md": {
	id: "the-40-testosterone-paradox-why-your-gym-goals-are-different-and-better.md";
  slug: "the-40-testosterone-paradox-why-your-gym-goals-are-different-and-better";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-40s-comeback-how-to-naturally-boost-testosterone-and-reclaim-your-edge.md": {
	id: "the-40s-comeback-how-to-naturally-boost-testosterone-and-reclaim-your-edge.md";
  slug: "the-40s-comeback-how-to-naturally-boost-testosterone-and-reclaim-your-edge";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-allocation-mindset-portfolio-thinking-for-your-entire-life.md": {
	id: "the-allocation-mindset-portfolio-thinking-for-your-entire-life.md";
  slug: "the-allocation-mindset-portfolio-thinking-for-your-entire-life";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-anti-consumerist-date-night-creating-high-value-low-cost-connection-points.md": {
	id: "the-anti-consumerist-date-night-creating-high-value-low-cost-connection-points.md";
  slug: "the-anti-consumerist-date-night-creating-high-value-low-cost-connection-points";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-anti-fragile-man-over-40-turning-stress-into-strength-in-finance-and-fitness.md": {
	id: "the-anti-fragile-man-over-40-turning-stress-into-strength-in-finance-and-fitness.md";
  slug: "the-anti-fragile-man-over-40-turning-stress-into-strength-in-finance-and-fitness";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-anti-hustle-approach-to-wealth-building-financial-security-through-consisten.md": {
	id: "the-anti-hustle-approach-to-wealth-building-financial-security-through-consisten.md";
  slug: "the-anti-hustle-approach-to-wealth-building-financial-security-through-consisten";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-art-of-strategic-refusal-how-successful-people-optimize-their-energy.md": {
	id: "the-art-of-strategic-refusal-how-successful-people-optimize-their-energy.md";
  slug: "the-art-of-strategic-refusal-how-successful-people-optimize-their-energy";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-balance-between-risk-reward-for-personal-finance.md": {
	id: "the-balance-between-risk-reward-for-personal-finance.md";
  slug: "the-balance-between-risk-reward-for-personal-finance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-beginner-guide-to-starting-a-balcony-herb-garden-for-seniors.md": {
	id: "the-beginner-guide-to-starting-a-balcony-herb-garden-for-seniors.md";
  slug: "the-beginner-guide-to-starting-a-balcony-herb-garden-for-seniors";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-benefits-and-drawbacks-of-early.md": {
	id: "the-benefits-and-drawbacks-of-early.md";
  slug: "the-benefits-and-drawbacks-of-early";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-benefits-of-investing-in-yourself.md": {
	id: "the-benefits-of-investing-in-yourself.md";
  slug: "the-benefits-of-investing-in-yourself";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-benefits-of-mindful-eating-for-your-health-and-well-being.md": {
	id: "the-benefits-of-mindful-eating-for-your-health-and-well-being.md";
  slug: "the-benefits-of-mindful-eating-for-your-health-and-well-being";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-biggest-misconceptions-about-moneyand-the-new-realm-of-making-more.md": {
	id: "the-biggest-misconceptions-about-moneyand-the-new-realm-of-making-more.md";
  slug: "the-biggest-misconceptions-about-moneyand-the-new-realm-of-making-more";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-builders-wealth-creating-value-for-financial-success.md": {
	id: "the-builders-wealth-creating-value-for-financial-success.md";
  slug: "the-builders-wealth-creating-value-for-financial-success";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-catalyst-of-action-dale-carnegies-insight-into-conquering-fear.md": {
	id: "the-catalyst-of-action-dale-carnegies-insight-into-conquering-fear.md";
  slug: "the-catalyst-of-action-dale-carnegies-insight-into-conquering-fear";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-challenges-faced-by-older-workers.md": {
	id: "the-challenges-faced-by-older-workers.md";
  slug: "the-challenges-faced-by-older-workers";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-cognitive-load-crisis-how-to-automate-your-decisions-and-free-your-mind-for-.md": {
	id: "the-cognitive-load-crisis-how-to-automate-your-decisions-and-free-your-mind-for-.md";
  slug: "the-cognitive-load-crisis-how-to-automate-your-decisions-and-free-your-mind-for-";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-comfort-of-mediocrity-why-many-shy-away-from-the-pursuit-of-true-desire.md": {
	id: "the-comfort-of-mediocrity-why-many-shy-away-from-the-pursuit-of-true-desire.md";
  slug: "the-comfort-of-mediocrity-why-many-shy-away-from-the-pursuit-of-true-desire";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-commitments-you-make-to-win-with.md": {
	id: "the-commitments-you-make-to-win-with.md";
  slug: "the-commitments-you-make-to-win-with";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-comparison-conundrum-change-your-perspective-change-your-emotions.md": {
	id: "the-comparison-conundrum-change-your-perspective-change-your-emotions.md";
  slug: "the-comparison-conundrum-change-your-perspective-change-your-emotions";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-compound-effect-of-small-wins-how-5-daily-savings-becomes-50-000.md": {
	id: "the-compound-effect-of-small-wins-how-5-daily-savings-becomes-50-000.md";
  slug: "the-compound-effect-of-small-wins-how-5-daily-savings-becomes-50-000";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-credit-card-conundrum-navigating.md": {
	id: "the-credit-card-conundrum-navigating.md";
  slug: "the-credit-card-conundrum-navigating";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-daily-ritual-of-motivation-why-its-essential-for-success.md": {
	id: "the-daily-ritual-of-motivation-why-its-essential-for-success.md";
  slug: "the-daily-ritual-of-motivation-why-its-essential-for-success";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-dalai-lamas-mosquito-quotes-wisdom-in-small-things.md": {
	id: "the-dalai-lamas-mosquito-quotes-wisdom-in-small-things.md";
  slug: "the-dalai-lamas-mosquito-quotes-wisdom-in-small-things";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-danger-of-staying-complacent.md": {
	id: "the-danger-of-staying-complacent.md";
  slug: "the-danger-of-staying-complacent";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-digital-domain-a-new-frontier-for-compounding-growth-with-potential-risks.md": {
	id: "the-digital-domain-a-new-frontier-for-compounding-growth-with-potential-risks.md";
  slug: "the-digital-domain-a-new-frontier-for-compounding-growth-with-potential-risks";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-discipline-of-doing-less-why-middle-age-not-time-to-hustle.md": {
	id: "the-discipline-of-doing-less-why-middle-age-not-time-to-hustle.md";
  slug: "the-discipline-of-doing-less-why-middle-age-not-time-to-hustle";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-emotional-investment-vs-financial-investment-audit-why-early-dating-spending.md": {
	id: "the-emotional-investment-vs-financial-investment-audit-why-early-dating-spending.md";
  slug: "the-emotional-investment-vs-financial-investment-audit-why-early-dating-spending";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-enough-mindset-how-to-define-financial-freedom-before-you-chase-more-money.md": {
	id: "the-enough-mindset-how-to-define-financial-freedom-before-you-chase-more-money.md";
  slug: "the-enough-mindset-how-to-define-financial-freedom-before-you-chase-more-money";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-extraordinary-persistence-longevity-as-the-measure-of-excellence.md": {
	id: "the-extraordinary-persistence-longevity-as-the-measure-of-excellence.md";
  slug: "the-extraordinary-persistence-longevity-as-the-measure-of-excellence";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-game-changers-habits-that-can-supercharge-your-career.md": {
	id: "the-game-changers-habits-that-can-supercharge-your-career.md";
  slug: "the-game-changers-habits-that-can-supercharge-your-career";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-genius-of-laziness-redefining-productivity-in-a-world-obsessed-with-busywork.md": {
	id: "the-genius-of-laziness-redefining-productivity-in-a-world-obsessed-with-busywork.md";
  slug: "the-genius-of-laziness-redefining-productivity-in-a-world-obsessed-with-busywork";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-hidden-cost-of-good-decisions-why-your-fitness-shortcuts-are-sabotaging-your.md": {
	id: "the-hidden-cost-of-good-decisions-why-your-fitness-shortcuts-are-sabotaging-your.md";
  slug: "the-hidden-cost-of-good-decisions-why-your-fitness-shortcuts-are-sabotaging-your";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-hyper-growth-executive-how-to-combine-the-80-20-rule-with-compounding-for-ex.md": {
	id: "the-hyper-growth-executive-how-to-combine-the-80-20-rule-with-compounding-for-ex.md";
  slug: "the-hyper-growth-executive-how-to-combine-the-80-20-rule-with-compounding-for-ex";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-illusion-of-get-rich-quick-understanding-the-mass-mentality-and-the-power-of.md": {
	id: "the-illusion-of-get-rich-quick-understanding-the-mass-mentality-and-the-power-of.md";
  slug: "the-illusion-of-get-rich-quick-understanding-the-mass-mentality-and-the-power-of";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-illusion-of-kindness-five-misguided-actions.md": {
	id: "the-illusion-of-kindness-five-misguided-actions.md";
  slug: "the-illusion-of-kindness-five-misguided-actions";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-illusion-of-the-big-break-why-your-first-100k-is-more-important-than-your-fi.md": {
	id: "the-illusion-of-the-big-break-why-your-first-100k-is-more-important-than-your-fi.md";
  slug: "the-illusion-of-the-big-break-why-your-first-100k-is-more-important-than-your-fi";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-impact-of-financial-education-on.md": {
	id: "the-impact-of-financial-education-on.md";
  slug: "the-impact-of-financial-education-on";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-impact-of-inflation-on-retirement.md": {
	id: "the-impact-of-inflation-on-retirement.md";
  slug: "the-impact-of-inflation-on-retirement";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-impact-of-job-loss-how-to-overcome.md": {
	id: "the-impact-of-job-loss-how-to-overcome.md";
  slug: "the-impact-of-job-loss-how-to-overcome";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-impact-of-large-purchases-on-financial-stability.md": {
	id: "the-impact-of-large-purchases-on-financial-stability.md";
  slug: "the-impact-of-large-purchases-on-financial-stability";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-impact-of-low-credit-score-on-your-personal-finance.md": {
	id: "the-impact-of-low-credit-score-on-your-personal-finance.md";
  slug: "the-impact-of-low-credit-score-on-your-personal-finance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-impact-of-working-overtime-on-work.md": {
	id: "the-impact-of-working-overtime-on-work.md";
  slug: "the-impact-of-working-overtime-on-work";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-impact-of-your-career-choice-on-your-fat-fire-journey.md": {
	id: "the-impact-of-your-career-choice-on-your-fat-fire-journey.md";
  slug: "the-impact-of-your-career-choice-on-your-fat-fire-journey";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-imperative-role-of-exercise-and-fitness-in-contemporary-life.md": {
	id: "the-imperative-role-of-exercise-and-fitness-in-contemporary-life.md";
  slug: "the-imperative-role-of-exercise-and-fitness-in-contemporary-life";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-importance-of-building-multiple.md": {
	id: "the-importance-of-building-multiple.md";
  slug: "the-importance-of-building-multiple";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-importance-of-financial-education-in-your-50s-and-60s.md": {
	id: "the-importance-of-financial-education-in-your-50s-and-60s.md";
  slug: "the-importance-of-financial-education-in-your-50s-and-60s";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-importance-of-living-in-the-present.md": {
	id: "the-importance-of-living-in-the-present.md";
  slug: "the-importance-of-living-in-the-present";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-importance-of-maximizing-the-benefits-of-your-increased-income.md": {
	id: "the-importance-of-maximizing-the-benefits-of-your-increased-income.md";
  slug: "the-importance-of-maximizing-the-benefits-of-your-increased-income";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-importance-of-saving-rate-in.md": {
	id: "the-importance-of-saving-rate-in.md";
  slug: "the-importance-of-saving-rate-in";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-legacy-of-generational-wealth-why-education-matters-more-than-assets.md": {
	id: "the-legacy-of-generational-wealth-why-education-matters-more-than-assets.md";
  slug: "the-legacy-of-generational-wealth-why-education-matters-more-than-assets";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-link-between-financial-habits-and-peace-of-mind.md": {
	id: "the-link-between-financial-habits-and-peace-of-mind.md";
  slug: "the-link-between-financial-habits-and-peace-of-mind";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-logic-of-asymmetric-bets-embracing-the-bezos-mindset.md": {
	id: "the-logic-of-asymmetric-bets-embracing-the-bezos-mindset.md";
  slug: "the-logic-of-asymmetric-bets-embracing-the-bezos-mindset";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-longevity-secrets-of-japan-lessons-for-a-life-well-lived.md": {
	id: "the-longevity-secrets-of-japan-lessons-for-a-life-well-lived.md";
  slug: "the-longevity-secrets-of-japan-lessons-for-a-life-well-lived";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-longevity-trade-off-why-you-cant-out-exercise-a-bad-sleep-schedule.md": {
	id: "the-longevity-trade-off-why-you-cant-out-exercise-a-bad-sleep-schedule.md";
  slug: "the-longevity-trade-off-why-you-cant-out-exercise-a-bad-sleep-schedule";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-meditation-upgrade-micro-dosing-stillness-in-a-hyper-focused-world.md": {
	id: "the-meditation-upgrade-micro-dosing-stillness-in-a-hyper-focused-world.md";
  slug: "the-meditation-upgrade-micro-dosing-stillness-in-a-hyper-focused-world";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-midlife-pivot-how-to-reclaim-your-purpose-when-the-map-stops-making-sense.md": {
	id: "the-midlife-pivot-how-to-reclaim-your-purpose-when-the-map-stops-making-sense.md";
  slug: "the-midlife-pivot-how-to-reclaim-your-purpose-when-the-map-stops-making-sense";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-minds-diet-overindulgence-in-information-and-the-wisdom-of-mental-moderation.md": {
	id: "the-minds-diet-overindulgence-in-information-and-the-wisdom-of-mental-moderation.md";
  slug: "the-minds-diet-overindulgence-in-information-and-the-wisdom-of-mental-moderation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-momentum-of-action-why-progress-isnt-born-from-perpetual-planning.md": {
	id: "the-momentum-of-action-why-progress-isnt-born-from-perpetual-planning.md";
  slug: "the-momentum-of-action-why-progress-isnt-born-from-perpetual-planning";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-myth-of-designer-status-building-an-authentic-wardrobe.md": {
	id: "the-myth-of-designer-status-building-an-authentic-wardrobe.md";
  slug: "the-myth-of-designer-status-building-an-authentic-wardrobe";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-myth-of-the-perfect-moment-why-its-always-time-to-start.md": {
	id: "the-myth-of-the-perfect-moment-why-its-always-time-to-start.md";
  slug: "the-myth-of-the-perfect-moment-why-its-always-time-to-start";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-over-40-algorithm-why-your-energy-not-your-effort-dictates-your-wealth.md": {
	id: "the-over-40-algorithm-why-your-energy-not-your-effort-dictates-your-wealth.md";
  slug: "the-over-40-algorithm-why-your-energy-not-your-effort-dictates-your-wealth";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-over-40-pivot-stop-chasing-start-attracting-real-wealth.md": {
	id: "the-over-40-pivot-stop-chasing-start-attracting-real-wealth.md";
  slug: "the-over-40-pivot-stop-chasing-start-attracting-real-wealth";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-pain-of-paying-understanding.md": {
	id: "the-pain-of-paying-understanding.md";
  slug: "the-pain-of-paying-understanding";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-paradigm-shift-from-income-to-wealth.md": {
	id: "the-paradigm-shift-from-income-to-wealth.md";
  slug: "the-paradigm-shift-from-income-to-wealth";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-paradox-of-choice-why-having-too-many-fitness-options-is-killing-your-gains.md": {
	id: "the-paradox-of-choice-why-having-too-many-fitness-options-is-killing-your-gains.md";
  slug: "the-paradox-of-choice-why-having-too-many-fitness-options-is-killing-your-gains";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-paradox-of-wealth-and-youth-a-reflection-on-gratitude.md": {
	id: "the-paradox-of-wealth-and-youth-a-reflection-on-gratitude.md";
  slug: "the-paradox-of-wealth-and-youth-a-reflection-on-gratitude";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-pillars-of-success-why-discipline-in-healthcare-and-self-care-is-non-negotia.md": {
	id: "the-pillars-of-success-why-discipline-in-healthcare-and-self-care-is-non-negotia.md";
  slug: "the-pillars-of-success-why-discipline-in-healthcare-and-self-care-is-non-negotia";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-potential-benefits-of-saving-more-for-your-retirement.md": {
	id: "the-potential-benefits-of-saving-more-for-your-retirement.md";
  slug: "the-potential-benefits-of-saving-more-for-your-retirement";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-power-of-action-how-money-wealth-and-poverty-react-to-speed-time-and-indecis.md": {
	id: "the-power-of-action-how-money-wealth-and-poverty-react-to-speed-time-and-indecis.md";
  slug: "the-power-of-action-how-money-wealth-and-poverty-react-to-speed-time-and-indecis";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-power-of-compounding-interest-over-time.md": {
	id: "the-power-of-compounding-interest-over-time.md";
  slug: "the-power-of-compounding-interest-over-time";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-power-of-early-mornings-maximizing-productivity-and-avoiding-distractions.md": {
	id: "the-power-of-early-mornings-maximizing-productivity-and-avoiding-distractions.md";
  slug: "the-power-of-early-mornings-maximizing-productivity-and-avoiding-distractions";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-power-of-early-retirement-planning.md": {
	id: "the-power-of-early-retirement-planning.md";
  slug: "the-power-of-early-retirement-planning";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-power-of-insurance-avoiding-the-risk-of-ruin.md": {
	id: "the-power-of-insurance-avoiding-the-risk-of-ruin.md";
  slug: "the-power-of-insurance-avoiding-the-risk-of-ruin";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-power-of-money-how-everyday-decisions-shape-your-life-beyond-finances.md": {
	id: "the-power-of-money-how-everyday-decisions-shape-your-life-beyond-finances.md";
  slug: "the-power-of-money-how-everyday-decisions-shape-your-life-beyond-finances";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-power-of-perseverance-achieving-extraordinary-outcomes-through-ordinary-acts.md": {
	id: "the-power-of-perseverance-achieving-extraordinary-outcomes-through-ordinary-acts.md";
  slug: "the-power-of-perseverance-achieving-extraordinary-outcomes-through-ordinary-acts";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-power-of-perseverance-understanding-the-one-step-forward-two-steps-back-jour.md": {
	id: "the-power-of-perseverance-understanding-the-one-step-forward-two-steps-back-jour.md";
  slug: "the-power-of-perseverance-understanding-the-one-step-forward-two-steps-back-jour";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-power-of-preparation-why-you-should-save-for-emergencies-and-grow-wealth-thr.md": {
	id: "the-power-of-preparation-why-you-should-save-for-emergencies-and-grow-wealth-thr.md";
  slug: "the-power-of-preparation-why-you-should-save-for-emergencies-and-grow-wealth-thr";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-power-of-regular-exercise-a-key-to-success-in-life.md": {
	id: "the-power-of-regular-exercise-a-key-to-success-in-life.md";
  slug: "the-power-of-regular-exercise-a-key-to-success-in-life";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-power-of-resilience-triumph-in-trying-again.md": {
	id: "the-power-of-resilience-triumph-in-trying-again.md";
  slug: "the-power-of-resilience-triumph-in-trying-again";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-probability-compass-using-statistics-to-navigate-your-40s-and-beyond.md": {
	id: "the-probability-compass-using-statistics-to-navigate-your-40s-and-beyond.md";
  slug: "the-probability-compass-using-statistics-to-navigate-your-40s-and-beyond";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-pros-and-cons-of-staying-single.md": {
	id: "the-pros-and-cons-of-staying-single.md";
  slug: "the-pros-and-cons-of-staying-single";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-psychology-of-money-how-to-change-your-mindset-to-attract-more-wealth.md": {
	id: "the-psychology-of-money-how-to-change-your-mindset-to-attract-more-wealth.md";
  slug: "the-psychology-of-money-how-to-change-your-mindset-to-attract-more-wealth";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-psychology-of-wealth-building-in-your-40s-overcoming-mindset-blocks.md": {
	id: "the-psychology-of-wealth-building-in-your-40s-overcoming-mindset-blocks.md";
  slug: "the-psychology-of-wealth-building-in-your-40s-overcoming-mindset-blocks";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-psychology-of-wealth-overcoming-fear-greed-and-impatience.md": {
	id: "the-psychology-of-wealth-overcoming-fear-greed-and-impatience.md";
  slug: "the-psychology-of-wealth-overcoming-fear-greed-and-impatience";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-reverse-budget-method-pay-yourself-first-and-never-feel-deprived.md": {
	id: "the-reverse-budget-method-pay-yourself-first-and-never-feel-deprived.md";
  slug: "the-reverse-budget-method-pay-yourself-first-and-never-feel-deprived";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-role-of-real-estate-in-retirement-planning.md": {
	id: "the-role-of-real-estate-in-retirement-planning.md";
  slug: "the-role-of-real-estate-in-retirement-planning";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-second-home-reckoning-does-vacation-property-still-make-sense-financially.md": {
	id: "the-second-home-reckoning-does-vacation-property-still-make-sense-financially.md";
  slug: "the-second-home-reckoning-does-vacation-property-still-make-sense-financially";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-social-circle-purge-why-fewer-friends-means-better-mental-health.md": {
	id: "the-social-circle-purge-why-fewer-friends-means-better-mental-health.md";
  slug: "the-social-circle-purge-why-fewer-friends-means-better-mental-health";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-steady-path-to-success-why-consistency-is-vital-in-your-fitness-journey.md": {
	id: "the-steady-path-to-success-why-consistency-is-vital-in-your-fitness-journey.md";
  slug: "the-steady-path-to-success-why-consistency-is-vital-in-your-fitness-journey";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-sunset-clause-how-to-stop-the-2-am-panic-scrolling.md": {
	id: "the-sunset-clause-how-to-stop-the-2-am-panic-scrolling.md";
  slug: "the-sunset-clause-how-to-stop-the-2-am-panic-scrolling";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-top-3-cryptocurrencies-seniors-should-know-about.md": {
	id: "the-top-3-cryptocurrencies-seniors-should-know-about.md";
  slug: "the-top-3-cryptocurrencies-seniors-should-know-about";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-transformative-power-of-food-a-holistic-approach-to-health-and-wellness.md": {
	id: "the-transformative-power-of-food-a-holistic-approach-to-health-and-wellness.md";
  slug: "the-transformative-power-of-food-a-holistic-approach-to-health-and-wellness";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-true-cost-of-neglecting-health-in-your-40s-why-your-body-is-your-most-import.md": {
	id: "the-true-cost-of-neglecting-health-in-your-40s-why-your-body-is-your-most-import.md";
  slug: "the-true-cost-of-neglecting-health-in-your-40s-why-your-body-is-your-most-import";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-ulysses-pact-explained-how-to-outsmart-your-lazy-brain-and-never-skip-leg-da.md": {
	id: "the-ulysses-pact-explained-how-to-outsmart-your-lazy-brain-and-never-skip-leg-da.md";
  slug: "the-ulysses-pact-explained-how-to-outsmart-your-lazy-brain-and-never-skip-leg-da";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-unforced-errors-in-life-how-to-avoid-sabotaging-yourself.md": {
	id: "the-unforced-errors-in-life-how-to-avoid-sabotaging-yourself.md";
  slug: "the-unforced-errors-in-life-how-to-avoid-sabotaging-yourself";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-unseen-engine-of-success-embracing-monotony-to-boost-your-income.md": {
	id: "the-unseen-engine-of-success-embracing-monotony-to-boost-your-income.md";
  slug: "the-unseen-engine-of-success-embracing-monotony-to-boost-your-income";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-value-of-a-college-degree.md": {
	id: "the-value-of-a-college-degree.md";
  slug: "the-value-of-a-college-degree";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-wealth-trifecta-health-relationships-money-in-that-order.md": {
	id: "the-wealth-trifecta-health-relationships-money-in-that-order.md";
  slug: "the-wealth-trifecta-health-relationships-money-in-that-order";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-wealth-you-cant-spend-rethinking-illiquid-assets-in-your-60s.md": {
	id: "the-wealth-you-cant-spend-rethinking-illiquid-assets-in-your-60s.md";
  slug: "the-wealth-you-cant-spend-rethinking-illiquid-assets-in-your-60s";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"things-to-stop-doing-at-gym.md": {
	id: "things-to-stop-doing-at-gym.md";
  slug: "things-to-stop-doing-at-gym";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"thought-provoking-facts-about-personal.md": {
	id: "thought-provoking-facts-about-personal.md";
  slug: "thought-provoking-facts-about-personal";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"thriving-at-50-a-lifestyle-blueprint-for-men-over-50.md": {
	id: "thriving-at-50-a-lifestyle-blueprint-for-men-over-50.md";
  slug: "thriving-at-50-a-lifestyle-blueprint-for-men-over-50";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"thriving-in-golden-years-engaging-activities-for-senior-citizens.md": {
	id: "thriving-in-golden-years-engaging-activities-for-senior-citizens.md";
  slug: "thriving-in-golden-years-engaging-activities-for-senior-citizens";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"thriving-in-your-50s-the-vital-role-of-exercise-in-aging-well.md": {
	id: "thriving-in-your-50s-the-vital-role-of-exercise-in-aging-well.md";
  slug: "thriving-in-your-50s-the-vital-role-of-exercise-in-aging-well";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"tips-for-coping-with-unemployment.md": {
	id: "tips-for-coping-with-unemployment.md";
  slug: "tips-for-coping-with-unemployment";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"tips-for-establishing-credit-and-building-up-your-score-over-time.md": {
	id: "tips-for-establishing-credit-and-building-up-your-score-over-time.md";
  slug: "tips-for-establishing-credit-and-building-up-your-score-over-time";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"tips-for-making-1-7-million-last-in-retirement.md": {
	id: "tips-for-making-1-7-million-last-in-retirement.md";
  slug: "tips-for-making-1-7-million-last-in-retirement";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"tips-to-effectively-budget-health-care.md": {
	id: "tips-to-effectively-budget-health-care.md";
  slug: "tips-to-effectively-budget-health-care";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"tips-to-handle-your-diet-properly.md": {
	id: "tips-to-handle-your-diet-properly.md";
  slug: "tips-to-handle-your-diet-properly";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"tips-to-help-you-stop-living-beyond-your-means.md": {
	id: "tips-to-help-you-stop-living-beyond-your-means.md";
  slug: "tips-to-help-you-stop-living-beyond-your-means";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"tips-to-lose-fat-2080-rule.md": {
	id: "tips-to-lose-fat-2080-rule.md";
  slug: "tips-to-lose-fat-2080-rule";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"tips-to-maintain-healthy-work-life.md": {
	id: "tips-to-maintain-healthy-work-life.md";
  slug: "tips-to-maintain-healthy-work-life";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"to-become-a-millionaire-mimic-their-habits.md": {
	id: "to-become-a-millionaire-mimic-their-habits.md";
  slug: "to-become-a-millionaire-mimic-their-habits";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"top-10-anti-aging-tips-for-men-in-their-50s.md": {
	id: "top-10-anti-aging-tips-for-men-in-their-50s.md";
  slug: "top-10-anti-aging-tips-for-men-in-their-50s";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"top-10-dental-care-tips-for-men-in-their-30s-and-40s.md": {
	id: "top-10-dental-care-tips-for-men-in-their-30s-and-40s.md";
  slug: "top-10-dental-care-tips-for-men-in-their-30s-and-40s";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"top-10-essential-skin-health-tips-for-men-over-30.md": {
	id: "top-10-essential-skin-health-tips-for-men-over-30.md";
  slug: "top-10-essential-skin-health-tips-for-men-over-30";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"top-10-financial-life-decisions.md": {
	id: "top-10-financial-life-decisions.md";
  slug: "top-10-financial-life-decisions";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"top-10-mistakes-to-avoid-to-help-manage.md": {
	id: "top-10-mistakes-to-avoid-to-help-manage.md";
  slug: "top-10-mistakes-to-avoid-to-help-manage";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"top-10-principles-to-manage-your.md": {
	id: "top-10-principles-to-manage-your.md";
  slug: "top-10-principles-to-manage-your";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"top-10-quotes-about-success.md": {
	id: "top-10-quotes-about-success.md";
  slug: "top-10-quotes-about-success";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"top-10-tips-to-help-seniors-manage-their-finances-effectively.md": {
	id: "top-10-tips-to-help-seniors-manage-their-finances-effectively.md";
  slug: "top-10-tips-to-help-seniors-manage-their-finances-effectively";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"top-20-things-to-practice-for-better.md": {
	id: "top-20-things-to-practice-for-better.md";
  slug: "top-20-things-to-practice-for-better";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"top-20-tips-for-single-males-personal-finance-fitness-and-lifestyle.md": {
	id: "top-20-tips-for-single-males-personal-finance-fitness-and-lifestyle.md";
  slug: "top-20-tips-for-single-males-personal-finance-fitness-and-lifestyle";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"top-4-tips-for-paying-off-credit-card-debt.md": {
	id: "top-4-tips-for-paying-off-credit-card-debt.md";
  slug: "top-4-tips-for-paying-off-credit-card-debt";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"top-6-quick-techniques-to-regain-focus-without-napping-or-caffeine.md": {
	id: "top-6-quick-techniques-to-regain-focus-without-napping-or-caffeine.md";
  slug: "top-6-quick-techniques-to-regain-focus-without-napping-or-caffeine";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"top-7-mental-strategies-for-men-to-stay-youthful-in-their-senior-years.md": {
	id: "top-7-mental-strategies-for-men-to-stay-youthful-in-their-senior-years.md";
  slug: "top-7-mental-strategies-for-men-to-stay-youthful-in-their-senior-years";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"top-7-ways-for-men-to-stay-young-in-old-age.md": {
	id: "top-7-ways-for-men-to-stay-young-in-old-age.md";
  slug: "top-7-ways-for-men-to-stay-young-in-old-age";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"top-9-haircare-tips-for-men-in-their-late-30s-and-40s.md": {
	id: "top-9-haircare-tips-for-men-in-their-late-30s-and-40s.md";
  slug: "top-9-haircare-tips-for-men-in-their-late-30s-and-40s";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"traveling-after-50-tips-for-comfortable-and-affordable-trips.md": {
	id: "traveling-after-50-tips-for-comfortable-and-affordable-trips.md";
  slug: "traveling-after-50-tips-for-comfortable-and-affordable-trips";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"turning-tide-shifting-from-bad-money_24.md": {
	id: "turning-tide-shifting-from-bad-money_24.md";
  slug: "turning-tide-shifting-from-bad-money_24";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"unconventional-truth-1-location-isnt-everything-in-real-estate-investing.md": {
	id: "unconventional-truth-1-location-isnt-everything-in-real-estate-investing.md";
  slug: "unconventional-truth-1-location-isnt-everything-in-real-estate-investing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"unconventional-truth-2-you-dont-need-a-fortune-to-start-real-estate-investing.md": {
	id: "unconventional-truth-2-you-dont-need-a-fortune-to-start-real-estate-investing.md";
  slug: "unconventional-truth-2-you-dont-need-a-fortune-to-start-real-estate-investing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"unconventional-truth-3-the-best-real-estate-deals-come-from-relationships-not-li.md": {
	id: "unconventional-truth-3-the-best-real-estate-deals-come-from-relationships-not-li.md";
  slug: "unconventional-truth-3-the-best-real-estate-deals-come-from-relationships-not-li";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"understanding-basic-financial-products.md": {
	id: "understanding-basic-financial-products.md";
  slug: "understanding-basic-financial-products";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"understanding-personal-finance-beyond-math-delving-into-biases-and-emotions.md": {
	id: "understanding-personal-finance-beyond-math-delving-into-biases-and-emotions.md";
  slug: "understanding-personal-finance-beyond-math-delving-into-biases-and-emotions";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"understanding-the-4-rule-a-key-to-retirement-spending.md": {
	id: "understanding-the-4-rule-a-key-to-retirement-spending.md";
  slug: "understanding-the-4-rule-a-key-to-retirement-spending";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"unique-gift-ideas-for-the-holiday-season.md": {
	id: "unique-gift-ideas-for-the-holiday-season.md";
  slug: "unique-gift-ideas-for-the-holiday-season";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"unleashing-your-inner-da-vinci-the-power-of-proactivity.md": {
	id: "unleashing-your-inner-da-vinci-the-power-of-proactivity.md";
  slug: "unleashing-your-inner-da-vinci-the-power-of-proactivity";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"unleashing-your-potential-embracing-self-discipline-to-live-life-to-the-fullest.md": {
	id: "unleashing-your-potential-embracing-self-discipline-to-live-life-to-the-fullest.md";
  slug: "unleashing-your-potential-embracing-self-discipline-to-live-life-to-the-fullest";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"unleashing-your-true-potential-through-consistency-and-perseverance.md": {
	id: "unleashing-your-true-potential-through-consistency-and-perseverance.md";
  slug: "unleashing-your-true-potential-through-consistency-and-perseverance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"unlocking-hidden-potential-the-power-of-intense-concentration.md": {
	id: "unlocking-hidden-potential-the-power-of-intense-concentration.md";
  slug: "unlocking-hidden-potential-the-power-of-intense-concentration";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"unlocking-success-the-dynamic-duo-of-risk-taking-and-perseverance.md": {
	id: "unlocking-success-the-dynamic-duo-of-risk-taking-and-perseverance.md";
  slug: "unlocking-success-the-dynamic-duo-of-risk-taking-and-perseverance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"unpopular-opinion-start-your-2025-fitness-goals-in-november-december.md": {
	id: "unpopular-opinion-start-your-2025-fitness-goals-in-november-december.md";
  slug: "unpopular-opinion-start-your-2025-fitness-goals-in-november-december";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"unraveling-the-misconception-simplicity-doesnt-equal-boredom-in-personal-finance.md": {
	id: "unraveling-the-misconception-simplicity-doesnt-equal-boredom-in-personal-finance.md";
  slug: "unraveling-the-misconception-simplicity-doesnt-equal-boredom-in-personal-finance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"update-your-skills-to-stay-competitive.md": {
	id: "update-your-skills-to-stay-competitive.md";
  slug: "update-your-skills-to-stay-competitive";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"using-technology-to-automate-and-accelerate-wealth-building.md": {
	id: "using-technology-to-automate-and-accelerate-wealth-building.md";
  slug: "using-technology-to-automate-and-accelerate-wealth-building";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"vehicle-financing-what-you-should-consider.md": {
	id: "vehicle-financing-what-you-should-consider.md";
  slug: "vehicle-financing-what-you-should-consider";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"visionary-decision-making-the-roadmap-to-success.md": {
	id: "visionary-decision-making-the-roadmap-to-success.md";
  slug: "visionary-decision-making-the-roadmap-to-success";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"walk-think-save-a-2026-routine-that-improves-fitness-mindset-and-spending-discip.md": {
	id: "walk-think-save-a-2026-routine-that-improves-fitness-mindset-and-spending-discip.md";
  slug: "walk-think-save-a-2026-routine-that-improves-fitness-mindset-and-spending-discip";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"want-vs-need.md": {
	id: "want-vs-need.md";
  slug: "want-vs-need";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"wednesday-workout-motivation-staying-on-track-with-your-fitness-goals.md": {
	id: "wednesday-workout-motivation-staying-on-track-with-your-fitness-goals.md";
  slug: "wednesday-workout-motivation-staying-on-track-with-your-fitness-goals";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"what-to-do-when-you-get-off-track.md": {
	id: "what-to-do-when-you-get-off-track.md";
  slug: "what-to-do-when-you-get-off-track";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"when-manifestation-actually-works-and-how-to-spot-a-guru-whos-lying-to-you.md": {
	id: "when-manifestation-actually-works-and-how-to-spot-a-guru-whos-lying-to-you.md";
  slug: "when-manifestation-actually-works-and-how-to-spot-a-guru-whos-lying-to-you";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"whose-fault-is-it.md": {
	id: "whose-fault-is-it.md";
  slug: "whose-fault-is-it";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"why-do-we-buy-fancy-cars.md": {
	id: "why-do-we-buy-fancy-cars.md";
  slug: "why-do-we-buy-fancy-cars";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"why-manifestations-wont-make-you-rich-or-successful-and-what-actually-will.md": {
	id: "why-manifestations-wont-make-you-rich-or-successful-and-what-actually-will.md";
  slug: "why-manifestations-wont-make-you-rich-or-successful-and-what-actually-will";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"why-seniors-should-not-trade-cryptocurrencies.md": {
	id: "why-seniors-should-not-trade-cryptocurrencies.md";
  slug: "why-seniors-should-not-trade-cryptocurrencies";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"why-should-you-have-emergency-fund.md": {
	id: "why-should-you-have-emergency-fund.md";
  slug: "why-should-you-have-emergency-fund";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"why-slow-and-steady-is-the-ultimate-wealth-play-for-men-over-40.md": {
	id: "why-slow-and-steady-is-the-ultimate-wealth-play-for-men-over-40.md";
  slug: "why-slow-and-steady-is-the-ultimate-wealth-play-for-men-over-40";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"why-we-use-credit-cards-for-payment.md": {
	id: "why-we-use-credit-cards-for-payment.md";
  slug: "why-we-use-credit-cards-for-payment";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"why-you-need-a-budget-to-manage-your-personal-finance.md": {
	id: "why-you-need-a-budget-to-manage-your-personal-finance.md";
  slug: "why-you-need-a-budget-to-manage-your-personal-finance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"why-you-should-pay-off-your-credit-card-debt-in-full.md": {
	id: "why-you-should-pay-off-your-credit-card-debt-in-full.md";
  slug: "why-you-should-pay-off-your-credit-card-debt-in-full";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"why-you-should-use-cash-to-manage-expenses.md": {
	id: "why-you-should-use-cash-to-manage-expenses.md";
  slug: "why-you-should-use-cash-to-manage-expenses";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"why-your-comfort-sitting-is-actually-financial-regret.md": {
	id: "why-your-comfort-sitting-is-actually-financial-regret.md";
  slug: "why-your-comfort-sitting-is-actually-financial-regret";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"wisdom-unveiled-10-life-lessons-from-charlie-munger.md": {
	id: "wisdom-unveiled-10-life-lessons-from-charlie-munger.md";
  slug: "wisdom-unveiled-10-life-lessons-from-charlie-munger";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"working-2-jobs-in-your-40s-is-it-worth.md": {
	id: "working-2-jobs-in-your-40s-is-it-worth.md";
  slug: "working-2-jobs-in-your-40s-is-it-worth";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"working-longer-for-retirement-is-it.md": {
	id: "working-longer-for-retirement-is-it.md";
  slug: "working-longer-for-retirement-is-it";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"working-overtime-pros-and-cons.md": {
	id: "working-overtime-pros-and-cons.md";
  slug: "working-overtime-pros-and-cons";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"working-smarter-not-harder-how-to.md": {
	id: "working-smarter-not-harder-how-to.md";
  slug: "working-smarter-not-harder-how-to";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"you-cant-manifest-a-six-pack-why-your-dream-physique-requires-sweat-not-just-int.md": {
	id: "you-cant-manifest-a-six-pack-why-your-dream-physique-requires-sweat-not-just-int.md";
  slug: "you-cant-manifest-a-six-pack-why-your-dream-physique-requires-sweat-not-just-int";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"young-men-in-todays-society.md": {
	id: "young-men-in-todays-society.md";
  slug: "young-men-in-todays-society";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"your-asset-is-your-attention-the-2026-personal-capital.md": {
	id: "your-asset-is-your-attention-the-2026-personal-capital.md";
  slug: "your-asset-is-your-attention-the-2026-personal-capital";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"your-rich-life-embracing-the-power-of-choice-in-personal-finance.md": {
	id: "your-rich-life-embracing-the-power-of-choice-in-personal-finance.md";
  slug: "your-rich-life-embracing-the-power-of-choice-in-personal-finance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"zen-living-cultivating-serenity-in-everyday-life.md": {
	id: "zen-living-cultivating-serenity-in-everyday-life.md";
  slug: "zen-living-cultivating-serenity-in-everyday-life";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
};
"categories": {
"fitness.md": {
	id: "fitness.md";
  slug: "fitness";
  body: string;
  collection: "categories";
  data: any
} & { render(): Render[".md"] };
"health.md": {
	id: "health.md";
  slug: "health";
  body: string;
  collection: "categories";
  data: any
} & { render(): Render[".md"] };
"lifestyle.md": {
	id: "lifestyle.md";
  slug: "lifestyle";
  body: string;
  collection: "categories";
  data: any
} & { render(): Render[".md"] };
"personal-finance.md": {
	id: "personal-finance.md";
  slug: "personal-finance";
  body: string;
  collection: "categories";
  data: any
} & { render(): Render[".md"] };
"retirement.md": {
	id: "retirement.md";
  slug: "retirement";
  body: string;
  collection: "categories";
  data: any
} & { render(): Render[".md"] };
"self-improvement.md": {
	id: "self-improvement.md";
  slug: "self-improvement";
  body: string;
  collection: "categories";
  data: any
} & { render(): Render[".md"] };
};
"pages": {
"about.md": {
	id: "about.md";
  slug: "about";
  body: string;
  collection: "pages";
  data: any
} & { render(): Render[".md"] };
"contact.md": {
	id: "contact.md";
  slug: "contact";
  body: string;
  collection: "pages";
  data: any
} & { render(): Render[".md"] };
"privacy.md": {
	id: "privacy.md";
  slug: "privacy";
  body: string;
  collection: "pages";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"about": Record<string, {
  id: string;
  collection: "about";
  data: any;
}>;
"home": {
"home": {
	id: "home";
  collection: "home";
  data: any
};
};
"site": {
"site": {
	id: "site";
  collection: "site";
  data: any
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
