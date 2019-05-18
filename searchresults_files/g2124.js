! function(a) { var c = function(t, k, h, q) { var n = 0,
            r = 0,
            j = h.length,
            o, f, e = false,
            g = false,
            p; for (; n < j; n++) { o = h[n], f = null;
            p = false; if (o.required) { f = DDG.getProperty(t, o.required); if (f) { if (f.length && f.length > 0) { e = true; continue } if (f === 0 || !!f) { e = true; continue } } return false } if (!o.key) { return false } f = DDG.getProperty(t, o.key);
            g = true; if (f) { if (o.match) { var m = f.match(o.match);
                    p = !!m; if (p && o.strict) { var s = DDG.get_query().match(o.match);
                        p = (m[0].toLowerCase() == s[0].toLowerCase()) } if (!p) { return false } } else { if ($.isArray(f)) { f = f.join(" ") } p = DDG.isRelevant(f, o.skip_words || k.skip_words, o.min_length, !!o.strict) } } else { p = false } if (p) { r++ } else { if (!q) { return false } } } if (r === 0) { if (e && !g) { return true } return false } return true }; var b = function(f, e) { var g, h = e[e.type || "primary"]; if (!h) { return true } g = c(f, e, h, true); return g };
    a.DDH = { spice_tabs: {}, spice_objects: {}, add: function(f) { if (!f.id) { return } if (!f.data) { return } if (f.require) { var g = f.require;
                delete f.require;
                DDG.require(g, a.DDH.add.bind(a.DDH, f)); return } if (!f.allowMultipleCalls && this.spice_objects[f.id]) { return null } if (a.DDH[f.id] && a.DDH[f.id].build && $.isFunction(a.DDH[f.id].build)) { var e = a.DDH[f.id].build(f); if (e === false || ($.type(e) === "object" && $.isEmptyObject(e))) { return } else { $.extend(f, e) } } if (a.DDH[f.id] && a.DDH[f.id].build_async && $.isFunction(a.DDH[f.id].build_async)) { a.DDH[f.id].build_async(f, function(j) { var i = a.DDH._build_ops(j); if (i) { a.DDH.spice_tabs[i.id] = DDG.duckbar.add(i) } }) } else { var h = a.DDH._build_ops(f); if (h) { a.DDH.spice_tabs[h.id] = DDG.duckbar.add(h) } } }, _build_ops: function(f) { f.templates = f.templates || {};
            f.meta = f.meta || {}; if (a.DDH[f.id] && a.DDH[f.id].meta) { f.meta = $.extend(a.DDH[f.id].meta, f.meta) } if (f.meta.tab) { f.name = f.meta.tab } var g = f.normalize || null,
                j = $.isArray(f.data),
                h, t = [],
                u, s = f.relevancy,
                e = DDG.get_query(),
                r = [],
                o = []; if (j) { if (s) { f.meta.idField = s.dup } for (var m = 0, k = f.data.length; m < k; m++) { var v = f.data[m]; if (s && !b(v, s)) { continue } if (g) { u = g(v); if (u) { h = $.extend({}, v, u) } else { continue } } else { h = v } if (h.exactMatch) { o.push(h) } else { if (h.boost) { r.push(h) } else { t.push(h) } } } if (r.length > 0) { for (m = 0; m < r.length; m++) { t.unshift(r[m]) } } if (o.length > 0) { for (m = 0; m < o.length; m++) { t.unshift(o[m]) } } if (t.length < 1) { DDG.duckbar.failed(f.id); return } f.data = t; if (t.length > 1 && f.sort_fields && f.sort_default) { var p = null; if (typeof f.sort_default === "string") { p = f.sort_default } else { if (s && s.type) { p = f.sort_default[s.type] } } if (p && p.length > 0) { f.data.sort(DDG.getProperty(f.sort_fields, p)) } else {} } } else { if (s) { if (!b(f.data, s)) { DDG.duckbar.failed(f.id); return } } if (g) { u = g(f.data); if (u) { f.data = $.extend({}, f.data, u) } else { DDG.duckbar.failed(f.id); return } } } if (f.id === "cheat_sheets") { f.meta.id = f.from } else { f.meta.id = f.id } a.DDH.spice_objects[f.id] = a.DDH.spice_objects[f.id] || {}; return f }, failed: function(e) { return DDG.duckbar.failed(e) }, getDOM: function(g) { var f = this.spice_tabs[g],
                e = f && f.view && f.view.$el; return e || $() }, selectNextItem: function(f) { var e = this.spice_tabs[f]; return e && e.view && e.view.selectNextItem && e.view.selectNextItem() }, registerHelper: function(f, e) { Handlebars.registerHelper(f, e) } };
    a.Spice = a.DDH;
    a.DDH.sharedir_map = this.spice_paths ? $.parseJSON(spice_paths) : {} }(window);
Spice.names = ["airlines", "alternative_to", "amazon", "astrobin_apod", "aur", "bible", "brainy_quote", "caniuse_lists", "code_search", "coupons", "cryptocurrency", "currency", "cve_summary", "detect_lang", "dictionary_definition", "dns", "dogo_books", "dogo_movies", "dogo_news", "duck_say", "economic_indicators", "emojipedia", "etsy", "expand_url", "first_robotics_team_info", "flash_version", "flights_route", "forecast", "git_book_status", "github", "github_status", "glassdoor", "gravatar", "grunt", "gulp", "hacker_news", "haxelib", "hayoo", "hex", "holiday", "images", "indeed_jobs", "is_it_up", "islamic_prayer_times", "keybase", "launchbug", "launchpad_project", "magic_the_gathering", "maps_maps", "maps_places", "maven", "meta_cpan", "metar", "minecraft_status", "near_earth_objects", "newint", "news", "npm", "nutrition", "nxt_account", "octopart", "open_nic", "package_tracking", "packagist", "people_in_space", "playing_cards", "plos", "product_hunt", "public_holidays", "pwned", "quandl_fundamentals", "quote_of_the_day", "rain", "rand_pos", "rand_word", "recipes", "rfc", "rhymes", "ruby_gems", "rust_cargo", "shorten", "skyscanner_flight_search", "sports", "sports_mlb_games", "sports_nfl_games", "statista", "stocks", "sun_rise_set", "symbolab", "syntax", "tfl_status", "thesaurus", "tides", "time", "tor_node", "transit_septa", "travis_status", "tvmaze_previousepisode", "twitch_featured", "twitter", "videos", "whois", "word_of_the_day", "xkcd_display", "yacht_specs", "yoga_asanas"];
(function(a) { var e = function(i) { var h = null,
            g = 0; var f = function(j) { if (j) { h = j } var k = window["ddg_spice_" + i]; if (k === f) { if (++g < 50) { window.setTimeout(k, 19) } else {} } else { if (h) { k(h) } else {} } }; return f }; var c; for (var b = 0; b < Spice.names.length; b++) { c = Spice.names[b]; if (c) { a["ddg_spice_" + c] = e(c) } } })(window);
DDG.Data.SearchExperiments = [{ allocation: 0.15, groups: ["a", "b", "c"], parameter: "mkexp", description: "Testing MapKit.search + Yelp syndicated data", services: ["local", "deep"] }];
! function(e) { var c = e.Models.Base,
        a = { deep: ["d.js", "t.js"], local: ["local.js", "spice/maps/places", "spice/maps/maps"], news: ["news.js", "spice/news"], images: ["i.js", "spice/images"], videos: ["v.js", "spice/videos"], products: ["m.js", "spice/amazon"], embed: ["f.js"] },
        b = /^\/((?:d|t|local|news|i|v|m|f).js)|\/js\/(spice\/.*)\//,
        f = "sexp";
    e.Models.SearchExperiments = function(g) { c.call(this, g); var h = DDG.backData.getData()[f] || {};
        this.experiments = DDG.Data.SearchExperiments.map(function(j) { var i = new e.Models.SearchExperiment($.extend({ backButtonGroup: h[j.parameter] }, j));
            this[i.parameter] = i; return i }.bind(this)) };
    e.Models.SearchExperiments.prototype = $.extend({}, c.prototype, { assign: function(h) { var g = this[h]; if (e.backData.getId() || !g || !g.isManuallyAssigned) { return } if (g.rollDice()) { this._clearCache(); return g.activeGroup } }, getExperimentGroup: function(g) { return this[g] && this[g].activeGroup }, addExperimentParameters: function(j) { var m = j.match(b),
                k = m && (m[1] || m[2]); if (!k) { return j } var g = this._getServiceForURLFragment(k),
                o = g && this._getExperimentsForService(g),
                i = !!e.backData.getId(),
                h = []; if (!o) { return j } o.forEach(function(p) { if (!i && p.rollDice()) { this._clearCache() } if (p.active) { h.push(p.urlParam) } }.bind(this)); if (h.length) { var n = j.indexOf("?") == -1 ? "?" : "&";
                j += n + h.join("&") } return j }, getPixelParameters: function() { if (typeof this._pixelParams !== "undefined") { return this._pixelParams } return this._pixelParams = this._getActiveExperiments().map(function(g) { return g.urlParam }).join("&") }, getBackButtonData: function() { var g = {};
            this._getActiveExperiments().forEach(function(h) { g[h.parameter] = h.activeGroup }); return g }, _getActiveExperiments: function() { if (this._activeExperiments) { return this._activeExperiments } return this._activeExperiments = this.experiments.filter(function(g) { return g.active }) }, _getExperimentsForService: function(g) { if (!this._experimentsForService) { this._experimentsForService = {};
                this.experiments.forEach(function(h) { if (!h.hasServices()) { return } h.services.forEach(function(i) { if (!this._experimentsForService[i]) { this._experimentsForService[i] = [] } this._experimentsForService[i].push(h) }.bind(this)) }.bind(this)) } return this._experimentsForService[g] || [] }, _getServiceForURLFragment: function(k) { if (!this._serviceForURLFragment) { this._serviceForURLFragment = {}; for (var g in a) { var h = a[g]; for (var j = 0; j < h.length; j++) { this._serviceForURLFragment[h[j]] = g } } } return this._serviceForURLFragment[k] }, _clearCache: function() { delete this._pixelParams;
            delete this._activeExperiments } }) }(DDG);
! function(b) { var a = b.Models.Base;
    b.Models.SearchExperiment = function(c) { c = c || {};
        this.allocation = c.allocation;
        this.groups = c.groups;
        this.parameter = c.parameter;
        this.services = c.services;
        this.filter = c.filter;
        this.assignment = c.assignment || "automatic";
        this.active = false;
        this.activeGroup = null;
        this.activeFromBackButton = false;
        this.urlParam = "";
        this.rolledDice = false;
        a.call(this, c); if (c.backButtonGroup) { this.activeFromBackButton = true;
            this.setGroup(c.backButtonGroup) } if (!this.hasServices() && !this.isManuallyAssigned() && !b.backData.getId()) { this.rollDice() } };
    b.Models.SearchExperiment.prototype = $.extend({}, a.prototype, { isManuallyAssigned: function() { return this.assignment === "manual" }, hasServices: function() { return (this.services && this.services.length) }, setGroup: function(c) { this.active = true;
            this.activeGroup = c;
            this.urlParam = this.parameter + "=" + this.activeGroup }, canRollDice: function() { return !this.rolledDice && !this.activeFromBackButton && (!this.filter || this.filter()) }, rollDice: function() { if (!this.canRollDice()) { return false } this.rolledDice = true; var g; var i = b.history.get(this.parameter); if (i) { g = i } else { var f = Math.random(),
                    e = f <= this.allocation; if (!e) { return false } var c = this.allocation / this.groups.length,
                    h = Math.floor(f / c);
                g = this.groups[h] } if (g) { this.setGroup(g); return true } return false } }) }(DDG);
! function(b) { var a = b.Models.Base,
        e = 1000 * 60 * 60 * 24,
        c = e * 2 - 60000;
    b.Models.VQD = function(g) { a.call(this, g); var f = b.backData.getData(); if (f && f.timestamp) { this.timestampFromBackData = true;
            this.timestamp = f.timestamp } };
    b.Models.VQD.prototype = $.extend({}, a.prototype, { timestamp: new Date().getTime(), age: function() { return Math.floor((new Date().getTime() - this.timestamp) / e) }, isExpired: function() { return (new Date().getTime() - this.timestamp) > c } }) }(DDG);
! function(b) { var a = b.Models.Base,
        e = "fbs",
        c = 500,
        f = 50;
    b.Models.Feedback = function(g) { this.rating = -1;
        this.comment = "";
        this.endpoint = "";
        a.call(this, g);
        this.submitting = false;
        this.success = false;
        this.error = false };
    b.Models.Feedback.prototype = $.extend({}, a.prototype, { send: function(k) { var n = this._prepareTextFeedback(k),
                i = this.endpoint || b.services.getURL("reports"); if (k && k.type && k.type === "images") { i = this.endpoint || b.services.getURL("imageReports");
                n = this._prepareImageFeedback(k) } n = $.extend({ q: b.get_query(), safe: b.settings.get("kp") }, n); var g = k.type || k.looking_for,
                m = k.rating === 1 ? "positive" : "negative",
                j; if (k.type === "images") { j = k.reason } else { if (k.looking_for === "ads") { j = k.ads_issue } else { j = k.category_issue } } var h = [e, m, g]; if (j) { h.push(j) } b.pixel.fire.apply(b.pixel, h); if (k.comment || k.looking_for_other) { this._sendRequest(i, n) } else { this.set("success", true) } }, _prepareImageFeedback: function(g) { return $.extend({ image_url: this.image, thumb_url: this.thumbnail }, g || {}) }, _prepareTextFeedback: function(g) { this.comment = this._shortenString(this.comment, c);
            this.looking_for_other = this._shortenString(this.looking_for_other, f);
            this.ads_issue_other = this._shortenString(this.ads_issue_other, f); if (b.search.userLocationExp) { this.comment += " | ulexp=" + b.search.userLocationExp } return $.extend({ rating: this.rating, comment: this.comment, browser: navigator.platform + " " + b.device.browserName, mobile: b.device.isMobile ? 1 : 0, atb: JSON.stringify(b.opensearch.installed), ct: window.ct || "", t: b.history.get("t") || "", upstream: b.search && b.search.src || "", df: b.search && b.search.dateFilterId || "", result_count: b.search && b.search.getResultCount() || 0, spell: window.dns || "", first_src: b.first_source || "", lang: b.settings.get("kad"), region: b.settings.get("kl") }, g || {}) }, _sendRequest: function(g, h) { this.set("submitting", true);
            this.set("success", false);
            this.set("error", false);
            $.ajax({ url: g, type: "POST", data: h, success: function() { this.set("submitting", false);
                    this.set("success", true) }.bind(this), error: function(i, j) { b.pixel.fire("fbf", h);
                    this.set("submitting", false);
                    this.set("error", j) }.bind(this) }) }, _shortenString: function(h, g) { if (h && h.length > g) { return h.slice(g - 3) + "..." } return h } }) }(DDG);
! function(a) { DDG.Data.FeedbackIssues = { ads: [{ text: lp("feedback form", "Ad is malware"), val: "malware" }, { text: lp("feedback form", "Ad is inappropriate"), val: "inappropriate" }, { text: lp("feedback form", "Ad is suspicious"), val: "suspicious" }, { text: lp("feedback form", "Ad is irrelevant"), val: "irrelevant" }, { text: lp("feedback form", "Ad is annoying"), val: "annoying" }], organics: [{ text: "Search terms are ignored or changed", val: "termsIgnored" }, { text: "The results are outdated", val: "linksOld" }, { text: "There are no dates next to results", val: "missingDates" }, { text: "Relevant results are missing", val: "missingLinks" }, { text: "The results aren't relevant", val: "irrelevant" }], filters: [{ text: "I want a past year date fiter", val: "wantYear" }, { text: "I want a custom date range filter", val: "wantCustom" }], wikipedia: [{ text: "This isn't relevant", val: "irrelevant" }, { text: "Wrong image is shown", val: "wrongImage" }, { text: "Words or numbers are missing", val: "dataMissing" }, { text: "Information is outdated", val: "outdated" }, { text: "This isn't useful", val: "infoNotShown" }], about: [{ text: "This isn't relevant", val: "irrelevant" }, { text: "Information is outdated", val: "outdated" }, { text: "Information is missing", val: "dataMissing" }, { text: "There are formatting issues", val: "badFormatting" }], places_single: [{ text: "This isn't relevant", val: "irrelevant" }, { text: "This place is incorrect", val: "wrongPlace" }, { text: "This place is too far away", val: "badProximity" }, { text: "This place is closed", val: "closed" }, { text: "The hours aren't listed", val: "missingHours" }, { text: "The website isn't listed", val: "missingWebsite" }], places_multiple: [{ text: "This isn't relevant", val: "irrelevant" }, { text: "These places are too far away", val: "badProximity" }, { text: "These places are incorrect", val: "wrongPlace" }], maps: [{ text: "This isn't relevant", val: "irrelevant" }, { text: "The location is wrong", val: "wrongLocation" }], news: [{ text: "This isn't relevant", val: "irrelevant" }, { text: "What I'm looking for isn't shown", val: "missingArticles" }, { text: "The articles aren't relevant", val: "articlesIrrelevant" }, { text: "I don't trust these news sources", val: "untrusted" }], videos: [{ text: "This isn't relevant", val: "videosIrrelevant" }, { text: "I wasn't looking for videos", val: "irrelevant" }, { text: "What I'm looking for isn't shown", val: "missingVideos" }, { text: "I don't want videos from YouTube", val: "singleSource" }], images: [{ text: "This isn't relevant", val: "iamgesIrrelevant" }, { text: "I wasn't looking for images", val: "irrelevant" }, { text: "What I'm looking for isn't shown", val: "missingImages" }], forecast: [{ text: "The location is wrong", val: "wrongLocation" }] } }(DDG);
! function(b) { var a = b.Pages.Base;
    b.Pages.SERP = function(c) { this._checkForForceReload();
        this.unsafeSearch = c.showSafeSearch;
        this.sideMenuOps.showFeedbackIcons = b.device.isMobile;
        a.call(this, c);
        this.ads = new b.Models.Ads({});
        b.device.on("scroll", this._onScroll.bind(this));
        window.onpageshow = this._onPageShow.bind(this);
        document.onreadystatechange = this._onReadyStateChange.bind(this);
        b.history.enablePushState(function(e, g) { if (!b.duckbar.isDone) { return false } var f = window.history && window.history.state; return e === "ia" || (e === "iax" && b.history.get("ia") !== "cheatsheet") || (e === "iaxm") || (e === "iai" && f && f.iaxm) || (e === "iai" && b.device.isMobile && (!f || !f.iai) || (e === "iai" && b.device.isMobile && !g && f && f.iai)) });
        b.history.on("popstate", this._onHistoryPopState.bind(this));
        b.deep.on("change:started", this._onDeepStarted.bind(this));
        b.deep.on("change:finished", this._onDeepFinished.bind(this));
        b.deep.on("add-separator", this._addDeepSeparator.bind(this));
        b.deep.on("change:isOutOfResults", this._showFooter.bind(this));
        this.atbButtonIsShowing = false };
    b.Pages.SERP.prototype = $.extend({}, a.prototype, { pageType: "serp", liveUpdater: true, sideMenuOps: { twitterLink: true, hideSettings: true }, showingSafeSearch: 0, ready: function() { a.prototype.ready.call(this);
            this.keyboard.enableSERPShortcuts = 1; if (w.is_twitter) { this.views.twitter = new b.Views.TwitterEasterEgg({ username: w.is_twitter, "$el": $(".js-header-logo") }) } this.initHeader();
            this.initSearchFilters();
            this.initSERPMessages();
            this.initFooter();
            this.views.ads = new b.Views.Ads({ model: this.ads, "$el": $(".js-results-ads") }); var c = $(".js-lazyload-favicon"); for (var e = 0, g; g = c[e]; e++) { b.ImageLoader.register(g, b.services.getURL("icons") + g.getAttribute("data-src"), "scrollY") } b.duckbar.onReady(); if (b.device.isDesktop) { this._appendSerpBadgeDesktop() } else { this._appendSerpBannerMobile() } if (!this.views.atb && !this.views.newsletter && !this.views.survey && b.survey.shouldShowBadge()) { this.views.survey = new b.Views.SurveyBadge({ appendTo: ".js-site-wrapper" });
                this.views.survey.show();
                $("body").on("click.atb", function() { this.views.survey && this.views.survey.hide();
                    $("body").off("click.atb") }.bind(this)) } }, showMessage: function(e, c) { if (e === "spelling" && !b.search.spelling) { b.search.spelling = new b.Models.Search.Spelling(c) } this.views.messages && this.views.messages.showMessage(e, c) }, fallbackToDefaultAds: function() { this.views.ads && this.views.ads.fallbackToDefault() }, initHeader: function() { if (b.settings.isDefault("ko") && b.device.hasFixedHeaderSupport) { this.views.header = new b.Views.Header({ "$el": $(".js-header-wrap"), model: new b.Models.Header() }) } if (b.history.get("atb")) { this._updateLogoParams({ atb: b.history.get("atb") }) } }, initFooter: function() { b.footer = new b.Models.Footer();
            this.views.footer = new b.Views.Footer({ model: b.footer, after: $(".js-site-wrapper") }) }, initSearchFilters: function() { this.views.searchFilters = new b.Views.Dropdowns.FilterContainer({ $el: $(".js-search-filters") }) }, initSERPMessages: function() { this.views.messages = new b.Views.SERPMessages({ ads: this.ads, search: this.search, searchbar: this.searchbar, messages: { safeSearch: !!this.unsafeSearch, siteSearch: b.search.isSiteQuery }, "$el": $("#message") });
            this.views.messages.on("clear-filters", function() { b.settings.region.reset();
                b.search.requery() }) }, _showFooter: function() { if (!b.settings.isDefault("kav") && b.deep.isOutOfResults) { b.footer.set("visible", true) } }, _onDeepStarted: function() { b.duckbar.show("deep_start"); if (b.settings.updater) { b.settings.updater.loadFonts() } b.searchExperiments.assign("otlexp");
            b.searchExperiments.assign("demexp") }, _onDeepFinished: function() { b.duckbar.showOrganicModules();
            b.duckbar.show("deep_end");
            b.duckbar.menu.showNewTabs();
            this.views.messages && this.views.messages.ready();
            $(".js-results,.js-results-ads,.js-sidebar-ads").removeClass("is-hidden");
            this.fallbackToDefaultAds();
            b.ImageLoader.registerAll($(".js-lazyload-icons"), "scrollY");
            this._showFeedbackBtn(); var r = { br: b.device.pixelBrowserName, bv: b.device.pixelBrowserVersion }; if (w.sourceTag) { r.st = w.sourceTag } if (w.df) { r.df = w.df } if (b.duckbar.activeTabId !== "web") { r.iao = 1 } r.u = b.search.src; var p = b.settings.region,
                k = !p.getPrevId() && p.getId() === p.getDefaultId(); if (k) { r.nr = k ? 1 : 0 } if (this.ads.hasAds()) { r.adx = this.ads.adx } if (this.ads.adxExperiment) { r.adx_name = this.ads.adxExperiment } var e = ".js-sitelink-comma"; if (this.ads.hasGoodAds() && $(e).length) { this._hideOverflownAdSitelinks() } if (!b.device.isMobile) { $(".result--ad").each(function(t) { var s = $(this).attr("id");
                    new b.Views.Feedback.ReportAdsButton({ appendTo: "#" + s + " .result__extras", whichAd: t }) }) } if (!b.settings.isDefault("kz")) { r.nia = 1 } if (!b.settings.isDefault("kae")) { r.kae = b.settings.get("kae") } r.rl = rl;
            r.dl = dl;
            r.rc = b.deep.getResultCount();
            r.ck = d.cookie && d.cookie !== "" ? 1 : 0; var n = b.Data.languages.resultLanguages,
                m = b.Data.languages.adLanguages,
                q = [],
                g = []; for (var f in n) { q.push(f + ":" + n[f].length) } for (var j in m) { g.push(j + ":" + m[j]) } b.Data.languages.resultLanguagesPixelData = r.oll = q.join(","); if (g.length) { b.Data.languages.adLanguagesPixelData = r.adll = g.join(",") } var c = b.backData.getId(),
                o = b.backData.getData(); if (c) { for (var i in o) { if (typeof o[i] === "object") { for (var h in o[i]) { r["bkd_" + i + "_" + h] = o[i][h] } } else { r["bkd_" + i] = o[i] } } } if (b.abc) { r.abc = b.abc } b.pixel.fire("l", b.device.pixelId, b.settings.region.hasRegion() ? "re" : "wt", $.extend({}, r, { atbi: this.canShowAddToBrowser(), i: this.isInstalled() }));
            setTimeout(function() { var t = b.duckbar.activeTabId ? b.duckbar.getActiveTab().pixelId : b.duckbar.placeholder ? "pl" + b.duckbar.placeholder.from : null; if (b.search.deepAnswerIAs && Object.keys(b.search.deepAnswerIAs).length) { var s = {}; if (t && t !== "web") { s.oi = t } if (b.search.spelling) { s.sp = 1 } b.pixel.fire("iaui", $.extend(s, b.search.deepAnswerIAs)) } }, 500);
            b.perf.reportResource(this.pageType, "d.js") }, _showFeedbackBtn: function() { if (this.views.feedback) { return } this.views.feedback = new b.Views.Feedback.Button({ appendTo: b.device.isDesktop ? ".js-feedback-btn-wrap" : ".js-footer-feedback-btn-wrap", noFaces: b.device.isMobileDevice, clickPixel: b.device.isMobileDevice ? "fbpm" : false }) }, _onScroll: function(f) { if (!b.settings.isDefault("kav")) { nrb(f) } if (this.onboardingTest.animateModalIllustration && b.tParam.fromHomepage() && this.canShowAddToBrowser() && !b.device.isMobileDevice && !this.views.atb.dismissed) { var c = (b.device.height / 2); if (this.views.atb.animated && b.device.scrollTop() > c) { this.views.atb.unAnimate() } else { if (this.views.atb.animated === false && b.device.scrollTop() < c) { this.views.atb.animate() } } } }, _onPageShow: function(c) { if (c && c.persisted) { this._checkForForceReload() } }, _onHistoryPopState: function(f) { var c = f && f.state; if (!c) { return } this._setIAFromHistory(c);
            this._updateIAModelFromHistory(c) }, _setIAFromHistory: function(f) { if (f.ia !== b.history.curState.ia) { var c = f.ia; if (!b.duckbar.tabs[c]) { var e = b.duckbar.tabsByNameId[c]; if (e) { c = e.id } } b.duckbar.open(c, { backButtonOpened: true }) } else { if (!f.ia && b.history.curState.ia) { b.duckbar.open("web", { backButtonOpened: true }) } } }, _setIAModelPropsFromHistory: function(c, f) { if (!c || typeof c !== "object" || !f) { return } c.set("expanded", !!f.iax);
            c.set("isMapExpanded", !!f.iaxm); if (b.device.isMobile || f.iaxm || b.history.curState.iaxm) { if (c.selectedItem && !f.iai) { c.selectedItem.unselect() } else { if (f.iai && (!c.selectedItem || c.selectedItem.id !== f.iai)) { var e = c.itemsById[f.iai];
                        e && e.select() } } } }, _updateIAModelFromHistory: function(g) { if (g.ia !== b.history.curState.ia) { return } var f = g.iax || g.iaxm || b.history.curState.iax || b.history.curState.iaxm,
                e = (f == 1 || f == 0) ? b.duckbar.getActiveTab() : b.duckbar.tabsByNameId[f]; if (e && e.model) { this._setIAModelPropsFromHistory(e.model, g) } else { if (f === "about" || f === "places") { if (b.modulesLayout) { var c = b.modulesLayout.modules[(f === "places") ? "maps_places" : f];
                        this._setIAModelPropsFromHistory(c.model, g) } } } }, _hideOverflownAdSitelinks: function() { var c = $(".result__sitelinks");
            c.each(function(o) { var g = $(this),
                    e = ".js-sitelink-comma",
                    k = ".sponsored__sitelink",
                    t = g.find(e),
                    n = g.find(k),
                    f = n.last(),
                    m = g.position().top + g.height(),
                    h = (f.position().top > m); if (!(h && t.length)) { return } var s = g.find(e + "," + k);
                s = s.get().reverse(); for (var j = 0; j < s.length; j++) { var q = $(s[j]),
                        u = q.hasClass("js-sitelink-comma"),
                        v = q.position().top,
                        p = (u && (v <= m)),
                        r = (v > m); if (!(p || r)) { return } q.addClass("is-hidden"); if (p) { break } } }) }, _appendSerpBadgeDesktop: function() { if (!b.device.isMobile && b.settings.isDefault("kba") && DDG.opensearch.isExperiment("settings_dropdown", "c")) { this.views.personalizeBadge = new b.Views.PersonalizeBadge({ appendTo: ".js-site-wrapper" });
                $("body").on("click.atb", function() { this.views.personalizeBadge && this.views.personalizeBadge.hide();
                    $("body").off("click.atb") }.bind(this)) } else { if (b.addToBrowser.canShowOnDesktopSerp()) { this.views.atb = new b.Views.AddToBrowserBadge({ impressionPixel: "atbsi", clickPixel: "atbsc", xPixel: "atbsx", topRight: true, serp: true, entryPoint: "sr", appendTo: ".js-site-wrapper", hideOnClick: true });
                    $("body").on("click.atb", function() { if (!this.atbButtonIsShowing) { this.views.atb.hide() } $("body").off("click.atb") }.bind(this)) } else { if (b.newsletter.shouldShowBadge()) { this.views.newsletter = new b.Views.SubscribeToNewsletterBadge({ appendTo: ".js-site-wrapper", serp: true });
                        this.views.newsletter.show();
                        $("body").on("click.atb", function() { this.views.newsletter && this.views.newsletter.hide();
                            $("body").off("click.atb") }.bind(this));
                        b.pixel.fire("nli", b.newsletter.group, "serp") } } } if (["j", "n"].indexOf(b.opensearch.atbVariant) >= 0 && b.extension.canInstall() && b.addToBrowser.canNotYetShowOnDesktopSerp()) { this.views.atb = new b.Views.AddToBrowserBadge({ impressionPixel: "atbbsi", clickPixel: "atbbsc", topRight: true, atbButtonVariation: b.opensearch.atbVariant, serp: true, entryPoint: "sr", appendTo: ".header__search-wrap", hideOnClick: false, fadeIn: true, hoverStyling: b.opensearch.atbVariant === "n" });
                this.atbButtonIsShowing = true } }, _updateLogoParams: function(f) { var e = $(".js-header-logo"),
                c = e && e.length && e.attr("href"); if (c) { c += c.match(/\?/) ? "&" : "?";
                c += $.param(f);
                e.attr("href", c) } }, _appendSerpBannerMobile: function() { if (b.addToBrowser.canShowOnMobileSerp()) { this.views.atb = new b.Views.AddToBrowserBanner({ impressionPixel: "atbsi", clickPixel: "atbsc", xPixel: "atbsx", template: "add_to_browser_button_serp", serp: true, entryPoint: "sr", appendTo: ".js-site-wrapper", hideOnClick: true });
                $("body").on("click.atb", function() { this.views.atb.hide();
                    $("body").off("click.atb") }.bind(this)) } }, _addDeepSeparator: function() { new b.Views.Verticals.VerticalSeparator({ appendTo: $(".js-results"), pageNumber: b.deep.pageNumber }) } }) }(DDG);
! function(e) { var c = e.Models.Base,
        b, h = 412,
        f = 312,
        a = 12;
    e.Models.Answer = b = function(k) { c.call(this, k);
        this.templates = new e.Models.AnswerTemplates(k.templates);
        this.meta = new e.Models.AnswerMeta($.extend(k.meta || {}, { options: this.templates.options, elClass: this.templates.elClass }));
        this.name = this.name || this.duckbar_topic || this.topic || "Answer"; if (this.name === "qa") { this.name = "Q/A" } this.nameId = e.duckbar.getNameId(this.name);
        this.id = this.id || this.nameId;
        this.pixelId = this.pixel_id || this.pixelId || this.meta.id || this.from || this.id;
        this.pixelId = this.pixelId.toLowerCase();
        this.type = this.type || "new"; var j = e.stem(this.name),
            o = new RegExp("\\b(" + this.name + "|" + j + ")\\b", "i"),
            n = decodeURIComponentSafe(this.queryEncoded),
            m = n.match(o);
        this.query = n.replace(o, "");
        this.queryMatch = m && m.length;
        this.signal = this.signal || "low"; if (this.rt !== "A" && this.rt !== "C" && this.rt !== "D" && this.queryMatch) { this.signal = "high" } if (this.signal !== "high" && this.signal !== "medium") { this.signal = "low" } if (this.type === "static") { this.signal = "low" } if (e.duckpan) { this.signal = "high" } this.items = [];
        this.itemsById = {};
        this.itemsOnMap = [];
        this.topics = [];
        this.topicsById = {};
        this.canExpand = true;
        this.expanded = false;
        this.isMapExpanded = false;
        this.isLocalRequery = (e.history.get("requery") === "1") && e.device.isDesktop && (this.id === "maps_places" || this.id === "maps_maps"); if (k.parameters) { this.parameters = k.parameters.map(function(p) { return new e.Models.AnswerSelectLists.Parameter(p) }) } if (k.sources) { this.sources = new e.Models.AnswerSelectLists.Source({ values: k.sources, parameters: this.parameters }) } this.pageNo = 0 };
    b.prototype = $.extend({}, c.prototype, { addItems: function(t) { this.pageNo++;
            this.set("deferredURL");
            this.set("isLoading"); if (!t) { t = [] } else { if (!$.isArray(t)) { t = [t] } } var q = this.answerItemModel || this.model || "Base",
                j = this.meta.idField,
                n = this.meta.topicField || "answerItemTopic",
                k = 0,
                o = 0; if (!e.Models.AnswerItems[q]) { q = "Base" } if (q === "FatheadListItem") { t = i(t, this) } for (var m = 0; m < t.length; m++) { var s = new e.Models.AnswerItems[q]($.extend({ templates: this.templates, parentId: this.id, answerMeta: this.meta, idField: j, pageNo: this.pageNo, minimizeHeight: !this.isSideModule }, t[m])); if (!this.itemsById[s.id]) { this.items.push(s);
                    this.itemsById[s.id] = s;
                    s.on("change:selected", this._onItemSelectedChanged.bind(this, s));
                    s.on("change:highlighted", this._onItemHighlightedChanged.bind(this, s));++k; if (n && s[n]) { var r = s[n],
                            p = this.topicsById[r]; if (!p) { p = new e.Models.AnswerItemTopic({ id: r, name: r, hideCount: this.meta.hideTopicCount });
                            this.topics.push(p);
                            this.topicsById[p.id] = p;++o;
                            this.bindEvents([
                                [p, "change:selected", this._onTopicSelectedChanged.bind(this, p)],
                                [p, "change:highlighted", this._onTopicHighlightedChanged.bind(this, p)],
                                [p, "change:engaged", this.engaged.bind(this)]
                            ]) } s.set("topic", p);
                        p.addItem(s) } } } this.itemsOnMap = e.geo.sort(this.items.slice()); if (o) { this._emitChange("topics") } if (k) { this._emitChange("items") } else { if (!this.items.length) { this.set("failed", true) } else { if (!t.length) { this.emit("no-results") } else {} } } if (this.id !== "images" && this.id !== "videos") { this._updateCanExpand() } }, canLoadMore: function() { return !this.isLoading && this.meta.next }, canLoadOnScroll: function() { return this.expanded && this.canLoadMore() && !is_mobile_device && e.settings.isDefault("kc") }, loadMore: function() { if (!this.canLoadMore()) { return } this.set("isLoading", true); var j = this.meta.next; if (j.match(/vqd=/)) { j = j.replace(/(&vqd\=)[^\&]+/, "$1" + window.vqd) } else { j += "&vqd=" + window.vqd } this.meta.loadedNext(); if (j.match(/(?:&|\?)cb=([^&?]+)/i)) { return nrj(j) } $.ajax({ url: j, dataType: "json", success: this._onLoadedMore.bind(this), error: this._onLoadError.bind(this) }) }, _hasDeferredResults: function() { return this.deferredContent && this.deferredContent.results && this.deferredContent.results.length }, _hasDeferredQueries: function() { return this.deferredContent && this.deferredContent.queryEncoded && this.deferredContent.queryEncoded.length }, usePageQuery: function(j) { return j + this.queryEncoded + "&vqd=" + window.vqd }, loadDeferred: function() { if (this.isLoading || (!this.deferredURL && !this._hasDeferredResults())) { return } if (this._shouldBlockAdultResults()) { return this._onDeferredLoaded({ results: [] }) } this.set("isLoading", 1); if (this._hasDeferredResults()) { this._addItemsFromResponse(this.deferredContent) } else { var j; if (typeof this.deferredURL === "function") { j = this.deferredURL() } else { j = this.deferredURL } if (this._hasDeferredQueries()) { var k = this.deferredContent.queryEncoded.shift(); if (k in this.deferredContent.vqd) { j += k + "&vqd=" + this.deferredContent.vqd[k] } else { j = this.usePageQuery(j) } } else { j = this.usePageQuery(j) } if (this.sources) { j += "&" + this.sources.getParameterQueryString() } if (this.safeSearch) { j += this._getSafeSearchURLParam() } if (this.date) { j += "&df=" + e.search.dateFilterId } if (e.searchExperiments) { j = e.searchExperiments.addExperimentParameters(j) } if (e.Utils.Cache[j]) { this._onDeferredLoaded(e.Utils.Cache[j]) } else { $.ajax({ type: "GET", url: j, dataType: "json", async: true, success: function(m) { e.Utils.Cache[j] = m;
                            this._onDeferredLoaded(m) }.bind(this), error: this._onLoadError.bind(this) }) } } }, indexOfSelectedItem: function() { if (!this.selectedItem) { return } if ($.isNumeric(this._selectedItemIdx)) { return this._selectedItemIdx } return this._selectedItemIdx = this.items.indexOf(this.selectedItem) }, indexOfHighlightedItem: function() { if (!this.highlightedItem) { return } if ($.isNumeric(this._highlightedItemIdx)) { return this._highlightedItemIdx } return this._highlightedItemIdx = this.items.indexOf(this.highlightedItem) }, getNextItem: function() { var j = this.indexOfSelectedItem(); return $.isNumeric(j) && this.items[j + 1] }, getPrevItem: function() { var j = this.indexOfSelectedItem(); return $.isNumeric(j) && this.items[j - 1] }, selectNextItem: function() { var j = this.getNextItem(); if (j && j.hidden && e.device.isMobile) { return j.select() } return j && !j.hidden && j.select() }, selectPrevItem: function() { var j = this.getPrevItem(); return j && j.select() }, getNextHighlightedItem: function() { var j = this.indexOfHighlightedItem(); return $.isNumeric(j) && this.items[j + 1] }, getPrevHighlightedItem: function() { var j = this.indexOfHighlightedItem(); return $.isNumeric(j) && this.items[j - 1] }, highlightNextItem: function() { var j = this.getNextHighlightedItem(); return j && j.highlight() }, highlightPrevItem: function() { var j = this.getPrevHighlightedItem(); return j && j.highlight() }, getQuerystringItemId: function(j) { return j.idField ? j.id : this.items.indexOf(j) }, getDetailHeight: function() { var j = this.meta.options || {},
                m = j.detailHeight || h,
                k = j.detailHeightShort || f,
                n = e.device.height - 300; if (this.id === "images" || this.id === "videos") { return Math.max(n, h) } return e.device.isTeapot() ? k : m }, getPixelData: function() { var j = { ss: e.page ? e.page.showingSafeSearch : 0, sp: e.search.spelling ? 1 : 0, im: this.isModule ? 1 : 0, ism: this.isSideModule ? 1 : 0, iom: this.isOrganicModule ? 1 : 0, px: this.proximity ? 1 : 0, ul: e.userLocator.hasLocation() ? e.userLocator.userLocation.type[0] : 0 }; if (this.headerType) { j.ht = this.headerType } if (this.local_source) { j.lsrc = this.local_source; if (this.local_source === "exact_match" || this.local_source === "fallback") { j.di = this.distance;
                    j.bs = this.biz_score;
                    j.cs = this.cat_score;
                    j.hs = this.chain_score;
                    j.de = this.delta;
                    j.ml = this.matches_location;
                    j.rc = this.review_count;
                    j.tc = this.trigger_count; if (this.wiki_entity) { j.we = this.wiki_entity } } } if (this.profileLinks) { j.pl = this.profileLinks } if (this.deferredQuery) { j.dq = this.deferredQuery } if (e.page && e.page.ads) { if (e.page.ads.adxExperiment) { j.adx_name = e.page.ads.adxExperiment } if (e.page.ads.hasAds()) { j.adc = e.page.ads.getNumberOfTopAds() } } if (this.id === "products") { j.prod_mult = this.items && this.items.length > 1 ? 1 : 0;
                j.u = this.meta.sourceName } if (this.id === "news") { if (this.usingOrganicBackfill) { j.bf = 1 } } return j }, fire: function(j, k) { k = $.extend(k || {}, this.getPixelData());
            e.pixel.fire(j, this.pixelId, this.openType, k) }, engaged: function(j) { this.fire("iae", j) }, clickedExternalLink: function(j) { e.backData.set(this.pixelId, { adx_name: DDG.page.ads.adxExperiment, ot: this.openType, sexp: DDG.searchExperiments.getBackButtonData(), timestamp: DDG.vqd.timestamp });
            this.fire("iag", j) }, _addItemsFromResponse: function(j) { if (!j) { return } this.meta.update({ next: j.next, searchTerm: j.searchTerm, responseType: j.responseType, queryParsed: j.parsed_query, query: j.query, sourceUrl: j.url });
            this.addItems(j.results || j, j.ads) }, _updateCanExpand: function() { var j; if (e.device.isMobile) { j = !this.meta.disableMobileGrid } else { if (this.meta.disableModeSwitch || this.meta.itemsExpand || this.meta.itemsWidthVaries) { j = false } else { if (this.items.length >= (this.meta.minItemsForModeSwitch || a) || this.canLoadMore()) { j = true } else { j = false } } } this.set("canExpand", j) }, _shouldBlockAdultResults: function() { return (this.id === "images" || this.id === "videos") && e.search.isAdultQuery && e.settings.safeSearch.isStrict() }, _getSafeSearchURLParam: function() { var j; if (this.id === "news" || this.id === "videos") { j = e.settings.get("kp") } else { j = e.settings.safeSearch.isOff() ? -1 : 1 } if (this.openType === "f") { j = 1 } return "&p=" + j }, requery: function(k) { if (!this.sources) { return } this.set("isRequerying", 1);
            this.meta.reset(); if (this.selectedItem) { this.selectedItem.unselect() } if (this._shouldBlockAdultResults()) { return this._onRequery({ results: [] }) } if (this.failed) { this.set("failed") } var j = this.sources.getRequeryURL(k); if (this.safeSearch) { j += this._getSafeSearchURLParam() } if (this.date) { j += "&df=" + e.search.dateFilterId } $.ajax({ type: "GET", url: j, dataType: "json", async: true, success: this._onRequery.bind(this), error: this._onLoadError.bind(this) }) }, _onDeferredLoaded: function(j) { this.set("isLoading"); if ((!j || !j.results || !j.results.length) && this._hasDeferredQueries()) { this.set("isLoading", 0);
                this.set("deferredQuery", this.deferredContent.queryEncoded[0]); return this.loadDeferred() } if (!this.deferredURL) { return } this.set("deferredURL");
            this._addItemsFromResponse(j) }, _onRequery: function(j) { this.set("isRequerying");
            this.set("selectedItem");
            this.items.forEach(function(k) { k.removeAllListeners() });
            this.items = [];
            this.itemsById = {};
            this.itemsOnMap = [];
            this._addItemsFromResponse(j);
            this.set("expanded", 1) }, _onLoadedMore: function(j) { this.set("isLoading");
            this._addItemsFromResponse(j); var k = { l: j.results.length, p: this.pageNo };
            this.fire("lm", k) }, _onLoadError: function() { this.set("isLoading");
            this.set("isRequerying"); if (!this.items.length) { this.set("failed", 1) } }, _onItemSelectedChanged: function(j) { delete this._selectedItemIdx; if (j && j.selected) { if (this.highlightedItem) { this.highlightedItem.unhighlight() } if (this.selectedItem && j !== this.selectedItem) { this._pendingSelectedItem = j;
                    this.selectedItem.unselect() } this.set("selectedItem", j) } else { if (this._pendingSelectedItem) { delete this._pendingSelectedItem } else { this.set("selectedItem") } } }, _onItemHighlightedChanged: function(j) { delete this._highlightedItemIdx; if (j && j.highlighted) { if (this.highlightedItem && j !== this.highlightedItem) { this._pendingHighlightedItem = j;
                    this.highlightedItem.unhighlight() } this.set("highlightedItem", j) } else { if (this._pendingHighlightedItem) { delete this._pendingHighlightedItem } else { this.set("highlightedItem") } } }, _onTopicSelectedChanged: function(j) { if (j && j.selected) { if (this.selectedTopic && j !== this.selectedTopic) { this.selectedTopic.unselect() } this.set("selectedTopic", j) } else { if (j === this.selectedTopic && !j.selected) { this.set("selectedTopic") } } }, _onTopicHighlightedChanged: function(j) { if (j && j.highlighted) { if (this.highlightedTopic && j !== this.highlightedTopic) { this.highlightedTopic.unhighlight() } this.set("highlightedTopic", j) } else { if (j === this.highlightedTopic && !j.highlighted) { this.set("highlightedTopic") } } } });

    function i(r, u) { if (!r || !r.length || !r[0].RelatedTopics) { return r } var t = [],
            q = u.name.toLowerCase(),
            k = r[0].RelatedTopics,
            s, m, n; for (var p = 0; p < k.length; p++) { s = k[p]; if (!s.Name) { if (q === "list") { if (!n || n !== s.Text.charAt(0)) { n = s.Text.charAt(0) } s.answerItemTopic = n;
                    u.meta.hideTopicCount = 1 } else { s.answerItemTopic = "Top" } if (!g(s)) { t.push(s) } } else { for (var o = 0; o < s.Topics.length; o++) { m = s.Topics[o];
                    m.answerItemTopic = s.Name; if (!g(m)) { t.push(m) } } } } return t }

    function g(k) { if (!k.Result || !k.Text) { return true } var j = e.parse_link(k.Result, "text"); if (j && j === k.Text) { return true } return false } }(DDG);
! function(c) { var b = c.Models.Base,
        a;
    c.Models.AnswerMeta = a = function(e) { b.call(this, e) };
    a.prototype = $.extend({}, b.prototype, { options: {}, loadedURLs: {}, loadedNext: function() { if (this.next) { this.loadedURLs[this.next] = true;
                this.next = null } }, reset: function() { this.loadedURLs = {} }, update: function(e) { if (!e || typeof e != "object") { return } for (var f in e) { if (f === "next" && this.loadedURLs[e[f]]) { continue } if (f === "searchTerm" && this.searchTerm) { continue } this.set(f, e[f]) } }, useExpandTextButton: function() { return this.signal_from === "images" || this.signal_from === "videos" || this.signal_from === "news" }, hasAttribution: function() { return !this.useExpandTextButton() && this.developer && $.isArray(this.developer) && this.developer.length } }) }(DDG);
! function(c) { var a = c.Models.Base,
        b;
    c.Models.AnswerTemplates = b = function(f) { f = f || {}; var g = c.Data.templates,
            h, e = {}; if (f.group) { h = g.groups[f.group]; if (h) { f = $.extend(true, {}, h, f);
                e = h.options } else {} } a.call(this, f);
        this.options = $.extend(true, {}, g.defaultOptions, e, this.options || {});
        this.elClass = this.elClass || {}; if (this.variants) { this._applyVariants(this.variants) } };
    b.prototype = $.extend({}, a.prototype, { _applyVariants: function(f) { if (!f || typeof f !== "object") { return } var e = c.Data.templates.viewVariants; for (var i in f) { var j = f[i],
                    h = e[i],
                    m = h && h[j]; if (!m) { continue } if ($.isArray(m)) { m.forEach(this._applyVariants.bind(this)) } else { if (typeof m === "object") { for (var g in m) { this._applyVariant(g, m[g]) } } else { this._applyVariant(i, m) } } } }, _applyVariant: function(e, f) { if (this.elClass[e]) { this.elClass[e] += " " + f } else { this.elClass[e] = f } } }) }(DDG);
! function(b) { var a = b.Models.Base;
    b.Models.AnswerItemTopic = function(c) { a.call(this, c);
        this.items = [] };
    b.Models.AnswerItemTopic.prototype = $.extend({}, a.prototype, { addItem: function(c) { this.items.push(c);
            this._emitChange("items") }, removeItem: function(e) { var c = this.items.indexOf(e); if (c > -1) { this.items.splice(c, 1);
                this._emitChange("items") } }, select: function() { this.unhighlight();
            this.set("selected", 1) }, unselect: function() { this.set("selected") }, highlight: function() { if (this.selected) { return } this.set("highlighted", 1) }, unhighlight: function() { this.set("highlighted") }, engaged: function() { this.set("engaged", 1) } }) }(DDG);
! function(c) { var a = c.Models.Base,
        b = { news: 1, images: 1, videos: 1, web: 1 };
    c.Models.AnswerBarMenuItem = function(e) { this._pixel = e.pixel;
        a.call(this, e); if (!b[this.pixelId]) { this.on("change:visible", this._onVisibleChanged.bind(this)) } };
    c.Models.AnswerBarMenuItem.prototype = $.extend({}, a.prototype, { toggle: function() { if (this.active) { return } this.set("active", !this.active) }, _onVisibleChanged: function() { if (this.visible) { this.getInstance("pixel").fire("ias", this.pixelId) } } }) }(DDG);
! function(b) { var a = b.Models.Base;
    b.Models.AnswerBarMenu = function(c) { this.items = [];
        this.itemsById = {};
        this._numStaticItems = 0;
        a.call(this, c) };
    b.Models.AnswerBarMenu.prototype = $.extend({}, a.prototype, { addAnswer: function(e) { if (!e || this.itemsById[e.id] || (this._showingMapTab && e.hasMap)) { return } var c = new b.Models.AnswerBarMenuItem({ id: e.id, name: (e.hasMap) ? "Maps" : e.name, type: e.type, pixelId: e.pixelId, hasMap: e.hasMap }); if (e.hasMap) { this._showingMapTab = true } if (c.type === "static") { this.items.splice(this._numStaticItems, 0, c);
                this._numStaticItems += 1 } else { this.items.push(c) } this.itemsById[c.id] = c;
            this._emitChange("items"); if (c.type === "static" || this._showingNewTabs) { c.set("visible", true) } c.on("change:active", this._onItemActiveChange.bind(this, c.id)) }, removeAnswer: function(g) { var c = false; for (var e in this.items) { var f = this.items[e]; if (f.id === g && f.type !== "static" && !f.hasMap) { c = e; break } } if (c) { this.items.splice(c, 1);
                delete this.itemsById[g];
                this._emitChange("items") } }, showNewTabs: function() { this._showingNewTabs = true;
            this.items.forEach(function(c) { c.set("visible", true) }) }, setActive: function(c) { if (this._lastActiveId === c || !this.itemsById[c]) { return } this._lastActiveId = c;
            this.itemsById[c].set({ active: true, visible: true });
            this.emit("set-active", c) }, openNext: function(e) { var g, c; for (var f = 0; f < this.items.length; f++) { if (this.items[f].active) { g = f; break } } if (typeof g === "undefined") { return } if (e === "l") { c = this.items[g - 1] } else { c = this.items[g + 1] } if (c) { c.set("active", true) } }, _onItemActiveChange: function(e) { if (this._blockActiveHandler) { return } var c = {}; if (!this.itemsById[e].active) { e = "web";
                c.defaultOpened = true } else { if (this.itemsById[e].hasMap) { c.mapId = e } } this._blockActiveHandler = true;
            this.items.forEach(function(f) { f.set("active", f.id === e) });
            delete this._blockActiveHandler; if (this._lastActiveId === e) { return } this.emit("item-active", e, c);
            this._lastActiveId = e } }) }(DDG);
! function(b) { var a = b.Models.Base;
    b.Models.OpenPixel = function(c) { this._deep = c.deep;
        this._pageLoadTime = c.pageLoadTime;
        this._page = c.page;
        this._pixel = c.pixel };
    b.Models.OpenPixel.prototype = $.extend({}, a.prototype, { getOpenType: function(e, f) { var c = "e"; if (f.backButtonOpened) { c = "b" } else { if (f.is_last_resort_tab) { c = "f" } else { if (e && e.isRequery) { c = "r" } else { if (f.qsOpened) { c = "q" } else { if (f.autoOpened) { c = "i" } else { if (f.defaultOpened) { c = "d" } } } } } } return c }, fire: function(f, e) { var h = f.model.getPixelData(); if (f.model.openType === "i") { $.extend(h, this._getTimingData()) } if (f.model.usingOrganicBackfill) { h.bf = 1 } if (e) { h.iom = 1 } var g = this.getInstance("page"); if (g.ads.hasAds()) { var c = g.ads.getAds();
                h.adn = c.length;
                h.adx = g.ads.adx;
                h.adx_name = g.ads.adxExperiment;
                h.is_good_v8_0 = (c[0] && c[0].relevancy && c[0].relevancy.is_good_v8) || 0;
                h.is_good_v8_1 = (c[1] && c[1].relevancy && c[1].relevancy.is_good_v8) || 0 } this.getInstance("pixel").fire("iao" + f.model.openType, f.pixelId, h) }, firePlaceholder: function(c) { this.getInstance("pixel").fire("iaop", c, this._getTimingData()) }, _getTimingData: function() { var e = new Date().getTime(),
                c = this.getInstance("deep"); return { timeSincePageLoad: e - this._pageLoadTime, timeSinceDeepStarted: c.timeSinceStarted(), timeSinceDeepFinished: c.timeSinceFinished() } } }) }(DDG);
DDG.Models.ModulesPositions = { TOP: 1, SIDE: 2, ORGANIC: 3 };
! function(e) { var a = e.Models.Base,
        c = { high: 3, medium: 2, low: 1 },
        h = { maps_places: 1, about: 1, climb: 1, fueleconomy: 1, lyrics: 1, qa: 1 },
        j = { maps_maps: 1, news: 1, forecast: 1 },
        f = { news: 1 },
        b = { maps_places: { answerType: "Places", model: "Place" }, maps_maps: { answerType: "Maps", model: "Maps" }, news: { answerType: "News" }, forecast: { answerType: "Forecast", model: "Forecast" } },
        i = { answerType: "About", model: "About" },
        g = ["lyrics", "nlp_longtail", "nlp_qa", "deep_answer", "nlp_fathead", "deep_fathead", "maps_places"];
    e.Models.ModulesLayout = function(k) { a.call(this, {});
        this._device = k.device;
        this._history = k.history;
        this._openPixel = k.openPixel;
        this._settings = k.settings;
        this.modules = {};
        this.signals = {};
        this._currentIA = this.getInstance("history").get("ia") };
    e.Models.ModulesLayout.prototype = $.extend({}, a.prototype, { addSignal: function(m) { var k = this.signals[m.from] ? this.signals[m.from] : 0;
            this.signals[m.from] = Math.max(k, c[m.signal]) }, addAnswer: function(n, m) { if (!h[n] && !j[n] && !f[n]) { return } var k = this.modules[n];
            m.id = n;
            m.isModule = true;
            m.position = this._getModulePosition(n, m);
            m.isSideModule = m.position === e.Models.ModulesPositions.SIDE; if (!k) { this._appendModel(m);
                this.modules[n] = k = m } k.model.position = m.position; if (m.signal) { this.addSignal({ from: n, signal: m.signal }) } if (e.history.get("iaxm") && k.id === "maps_places") { this.set("expandedMapId", k.id) } this._emitChange("modules") }, canAddSignal: function(k) { if (g.indexOf(k.from) > -1 && this.canShowSideModules()) { return false } return true }, isTopModule: function(k) { return j[k] || (h[k] && !this.canShowSideModules()) }, canShowSideModules: function() { var m = this.getInstance("device"),
                k = this.getInstance("settings"); return m.hasMinDesktopWidth && k.isDefault("km") && k.isDefault("kw") && k.isDefault("kz") }, canShowModule: function(m) { var k = this.getModule(m); return k.pixelId !== "maps_places_multiple" || k.signal !== "low" }, getModule: function(k) { if (k === "web") { k = this.defaultId } return this.modules[k] }, getModules: function(n) { var o = [],
                p; for (var k in this.modules) { p = this.modules[k]; if (n && p.position === n) { o.push(p) } if (!n) { o.push(p) } } return o }, getModuleInfo: function(k) { return this.getModules(k).map(function(m) { return m.pixelId + ":" + m.model.openType + ":" + m.signal }) }, setDefaultTopModule: function(k) { this.set("defaultId", k) }, setOrganicModule: function(k) { this.set("organicId", k) }, setOpenType: function(n, k) { var m = this.getModule(n); if (m) { m.model.openType = k } }, _appendModel: function(n) { var o = b[n.id] || i;
            $.extend(n, o); var k = {}; if (n.answerType && e.Models.Answers[n.answerType]) { k = new e.Models.Answers[n.answerType](n) } else { k = new e.Models.Answer(n) } if (n.deferredContent || !n.deferredURL) { k.meta.update(n.meta); if (n.deferredContent) { k.deferredContent = n.deferredContent } else { var m = $.isArray(n.data) ? n.data : [n.data || n];
                    k.addItems(m, n.ads) } } k.openType = this.getInstance("openPixel").getOpenType(n, { autoOpened: !this._currentIA, qsOpened: this._currentIA });
            n.pixelId = k.pixelId;
            n.model = k }, _getModulePosition: function(m, k) { if (f[m] && k.isNavigational) { return e.Models.ModulesPositions.ORGANIC } return (h[m] && this.canShowSideModules()) ? e.Models.ModulesPositions.SIDE : e.Models.ModulesPositions.TOP } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.ModulesLayout = function(c) { this._selectors = c.selectors ? this._combineSelectors(c.selectors) : {};
        this._selectorCache = {};
        this._verticalId = c.verticalId;
        this.menu = c.menu;
        a.call(this, c);
        this.bindEvents([
            [b.deep, "change:finished", this._render],
            [this.model, "change:modules", this._render],
            [this.model, "change:organicId", this._renderOrganicModule],
            [this.model, "change:autoOpenedId", this._showPendingTabs],
            [this.model, "change:expandedMapId", this._createMapVertical],
            [this.menu, "set-active", this._menuChanged]
        ]) };
    b.Views.ModulesLayout.prototype = $.extend({}, a.prototype, { _getSelector: function(c) { if (!this._selectorCache[c]) { this._selectorCache[c] = $(this._selectors[c]) } return this._selectorCache[c] }, _menuChanged: function(i, h) { if (!h) { for (var f in this.views) { var c = this.views[f]; if (c.renderedPosition === b.Models.ModulesPositions.TOP && c.$el) { c.$el.hide() } } } var e = this.model.getModule(i); if (!e) { return } var g = this.menu && this.menu.itemsById[i] && this.menu.itemsById[i].active && i !== "web"; if (e.allowVertical && g && !e.model.isOrganicModule) { return } if (e && this.model.isTopModule(e.model.id) && this.model.canShowModule(e.model.id)) { this._appendView(e) } }, _showPendingTabs: function() { if (this._verticalId !== "web") { return } this.model.getModules().forEach(function(e) { var c = true;
                e.model.hasMap = this._hasMapTab(e); if (e.model.isSideModule && this.model.canShowSideModules()) { c = e.model.hasMap } else { if (this.model.autoOpenedId === e.id && !e.model.hasMap) { c = false } } if (c) { this.menu.addAnswer(e.model) } }.bind(this)) }, _render: function() { var f, e, c = this.model.getModules(b.Models.ModulesPositions.SIDE); for (f = 0; f < c.length; f++) { e = c[f]; if (e && this.model.canShowModule(e.model.id)) { b.addClass("html", b.$html, "has-right-rail-module");
                    this._appendView(e) } this._showPendingTabs() } if (this.model.autoOpenedId) { this._showPendingTabs() } }, _hasMapTab: function(g) { var e = this.model.getModule(g.id),
                f, c = false; if (e.id === "about" && g.data.Infobox) { f = new b.Models.Modules.AboutInfoBox(g.data);
                c = f.maps.length } return e.id === "maps_maps" || e.id === "maps_places" || c }, _appendView: function(h) { var j = h.model.id; if (!this.views[j]) { var c = h.model.position; if (c == b.Models.ModulesPositions.ORGANIC && !h.model.isOrganicModule) { c = b.Models.ModulesPositions.TOP } var g = this._getSelector(c); if (!g.selector) { return } try { var f = new b.Utils.TabViewBuilder().build({ model: h.model, appendTo: g });
                    f.renderedPosition = c;
                    f.show();
                    this.views[j] = f;
                    b.openPixel.fire(h); if (f.model.headerType > 0) { b.duckbar.failed("maps_maps") } } catch (i) { b.pixel.fire("jse", "serp", { msg: encodeURIComponent(i.message) }) } } else { if (this.views[j].$el.is(":hidden")) { this.views[j].$el.show();
                    b.openPixel.fire(h) } } }, _renderOrganicModule: function(c) { this._menuChanged(c, true) }, _combineSelectors: function(g) { var f = {}; for (var e in g) { var c = b.Models.ModulesPositions[e]; if (c) { f[c] = g[e] } } return f }, _createMapVertical: function(e) { if (e === "maps_places" && !this.expandedMap) { var c = this.model.modules[e].model; var f = c.items.length === 1; if (f) { c.primaryPlace.selected = 1 } c.set("isMapExpanded", true);
                this.expandedMap = new b.Views.Verticals.VerticalMap({ ItemClass: f ? b.Views.Places.PlacesSingleMap : b.Views.Places.PlaceListItem, model: c, appendTo: "body" }) } } }) }(DDG);
! function(h) { var c = { mlb_games: 300, nfl_games: 299, answer: 200, maps_places: 80, about: 50, videos: -10, images: -20 },
        e = { maps_maps: 400, forecast: 400, products: 300, news: -300 },
        j = 250,
        g = 5000,
        i = 4000,
        f = { high: 3, medium: 2, low: 1 },
        b = { "item-selected": "onItemSelected", "item-unselected": "onItemUnselected", "item-shown": "onItemShown", show: "onShow", hide: "onHide" },
        a = DDG.get_now();
    h.search.staticNews = 1;
    h.Duckbar = function() { h.openPixel = new h.Models.OpenPixel({ pageLoadTime: a });
        this.menu = new h.Models.AnswerBarMenu();
        this.modulesLayoutView = new h.Views.ModulesLayout({ menu: this.menu, model: h.modulesLayout, verticalId: "web", selectors: { SIDE: ".js-sidebar-modules", TOP: ".js-ia-modules", ORGANIC: "#organic-module" } }) };
    h.Duckbar.prototype = { id: "duckbar", tabs: {}, tabsByNameId: {}, froms: {}, activeTabId: null, futureSignals: [], futureSignalsById: {}, failedIA: {}, isReady: false, onReady: function() { this.isReady = true;
            this.$zeroClickWrapper = $("#zero_click_wrapper");
            this.$webContentWrapper = $("#web_content_wrapper");
            this.$verticalWrapper = $("#vertical_wrapper");
            this.$topModuleWrapper = $(".js-ia-modules");
            this.$el = $("#duckbar");
            h.keyboard.on("left", this._openNext.bind(this, "l"));
            h.keyboard.on("right", this._openNext.bind(this, "r"));
            this.menuView = new h.Views.AnswerBarMenu({ appendTo: this.$el, model: this.menu });
            this.menu.on("item-active", this.open.bind(this));
            this.add({ id: "web", name: "Web", type: "static" });
            DDG.Data.StaticIAs.forEach(this.add.bind(this)); if (this.addOnReady) { for (var k = 0, m; m = this.addOnReady[k]; k++) { this.add(m) } } this.show("static");
            setTimeout("DDG.duckbar.show('placeholder')", g);
            setTimeout("DDG.duckbar.show('placeholder_images')", i) }, getActiveTab: function() { return this.tabs[this.activeTabId] }, hasOrganicModules: function() { return this.tabs.news && this.tabs.news.module && this.tabs.news.module.isOrganicModule }, getOrganicModuleInfo: function() { if (this._organicModuleInfo) { return this._organicModuleInfo } this._organicModuleInfo = []; if (this.hasOrganicModules()) { this._organicModuleInfo.push("news:" + this.tabs.news.module.model.openType + ":1") } return this._organicModuleInfo }, areOrganicsShowing: function() { var k = this.getActiveTab(); return !(k && k.isVertical) }, addPlaceholder: function(m) { if (this.openedTab || this.placeholder || h.history.get("iac") || !h.settings.isDefault("kz")) { return } var k = new h.Models.Answer({ id: "placeholder" }); if (h.modulesLayout.isTopModule(m)) { this.placeholder = new h.Views.Modules.Placeholder({ model: k, signalWait: m, appendTo: this.$topModuleWrapper }) } else { this.placeholder = new h.Views.AnswerBar.Answers.Placeholder({ model: k, signalWait: m, appendTo: this.$zeroClickWrapper }) } h.openPixel.firePlaceholder(m) }, removePlaceholder: function(k) { this.placeholder.destroy();
            delete this.placeholder }, _autoExpandMap: function(n) { if (!n.mapId) { return } var m = h.modulesLayout.getModule(n.mapId),
                k = m.model;
            this.modulesLayoutView.model.set("expandedMapId", n.mapId);
            k.fire("iacg");
            k.engaged();
            k.openType = "e";
            h.openPixel.fire(m);
            k.set("isMapExpanded", true);
            k.on("change:isMapExpanded", function(o) { if (!o) { this.menu.setActive("web") } }.bind(this)) }, open: function(o, n) { var p = this.tabs[o],
                q;
            n = n || {}; if (n.mapId && !p) { this._autoExpandMap(n); return } if (!p) { return } q = h.openPixel.getOpenType(p.model, n); if (q === "e" || q === "d") { h.device.scrollTop(0) } if (n.autoOpened && this.openedTab) { return } if (n.autoOpened && !h.settings.isDefault("kz") && o !== "web") { return } this.openedTab = 1; if (this.placeholder && this.placeholder.isModule && n.is_last_resort_tab && o === "images") { p.model.openType = h.openPixel.getOpenType(p.model, n);
                h.openPixel.fire(p);
                this.menu.setActive("web");
                this.placeholder.showImages(this.tabs.images.model); return } if (this.placeholder) { this.removePlaceholder("open") } if (this.getActiveTab()) { var m = this.getActiveTab(); if (m.id === o && !(m.model.isModule && m.model.allowVertical)) { this._autoExpandMap(n); return } DDG.ImageLoader.loadMore();
                m.hide() } this.activeTabId = o; var u = p.model.meta; if (p.pixelId !== "web" && q !== "e" && q !== "b") { this.initialTabOpenType = q;
                this.initialTab = p } this.activeTabOpenType = q; if (typeof u.autoExpand === "undefined") { u.autoExpand = is_mobile ? 1 : 0 } else { if (u.autoExpand && !is_mobile && q !== "e") { u.autoExpand = 0 } } if (u.autoExpand && typeof u.autoExpandRows === "undefined") { var k = DDG.history.get("iai");
                u.autoExpandRows = (is_mobile && (n.autoOpened || (n.qsOpened && !k))) ? 1 : 0 } if (p.model.allowVertical) { if (q === "r" || q === "e") { p.isVertical = p.model.isVertical = true;
                    p.isModule = p.model.isModule = p.isOrganicModule = p.model.isOrganicModule = false;
                    h.history.set("iar", p.nameId) } } var t = (q === "b") && (DDG.history.get("iar", true) === p.id); if (q !== "e" && q !== "r" && p.model.allowVertical && p.module && !t) { p = this.tabs[p.id].module } p.show({ openType: q, minimizeHeight: p.isModule, loadDeferred: !n.autoOpened || q === "f", appendTo: p.isVertical ? this.$verticalWrapper : this.$zeroClickWrapper }); var r = p.id; if (p.isModule && q !== "e" && (!this.initialTab || p.id === this.initialTab.id)) { r = "web" } this.menu.setActive(r); var s = (p.id === "web" && q !== "e") || h.modulesLayout.isTopModule(p.id) && !p.module; if (!s) { h.openPixel.fire(p) } if (p.isVertical) { this.$webContentWrapper.addClass("is-hidden") } else { this.$webContentWrapper.removeClass("is-hidden") } this.isDone = true; if (n.autoOpened || n.qsOpened) { h.modulesLayout.set("autoOpenedId", p.id) } this._autoExpandMap(n) }, add: function(p) { if (!this.isReady) { if (!this.addOnReady) { this.addOnReady = [] } this.addOnReady.push(p); return } if (p && p.from && p.from === "nfl_games" && p.data && p.data.length && DDG.get_query().match(/super\s?bowl/i)) { p.data = [p.data[p.data.length - 1]]; if (p.meta && p.meta.primaryText) { p.meta.primaryText = "Super Bowl LII:" } } p.rt = rt;
            p.query = h.get_query();
            p.queryEncoded = h.get_query_encoded(); var m = this._getAnswerName(p),
                k = this.getNameId(m),
                n = p.id || k,
                q = p.signal || "low",
                o = this.tabs[n];
            h.modulesLayout.addAnswer(n, p); if (p.from) { this.froms[p.from] = true } if (p.isSideModule) { return } if (o) { if (f[q] > f[o.signal]) { o.signal = q } } else { if (h.modulesLayout.isTopModule(n) && !p.allowVertical) { o = new DDG.NoOpDuckbarTab(n) } else { o = new DDG.DuckbarTab(p); if (p.allowVertical) { o.module = new DDG.NoOpDuckbarTab(n) } } this.tabs[o.id] = o;
                this.tabsByNameId[o.nameId] = o;
                o.on("close", this.open.bind(this, "web", { defaultOpened: true })) } if (!p.isModule || p.allowVertical) { this.menu.addAnswer(o.model) } if (p.deferredContent || !p.deferredURL) { o.append(p) } for (var t in b) { var r = p[b[t]]; if (r && typeof r === "function") { o.on(t, r) } } var s = h.history.get("ia"); if (o.id === h.hidden.get("iar")) { this.open(o.id, { qsOpened: 1 }) } else { if (s && (s === o.id || s === o.nameId) && !(this.activeTabId && this.getActiveTab().nameId === s)) { setTimeout(this.open.bind(this, o.id, { qsOpened: 1 }), 1) } setTimeout(this.show.bind(this, "add"), 1) } return o }, add_array: function(k) { for (var m = 0; m < k.length; m++) { this.add(k[m]) } }, addDeferred: function(r, p) { var o = this._getIAMetadata(r); var k = this.getActiveTab(); if (!o || k && k.id !== "web" && !h.search.isNavigational) { return } o.deferredContent = p;
            o.isNavigational = h.search.isNavigational; if (r == "news") { h.search.staticNews = 0 } this.add(o); var q = p.results && p.results.length,
                m = p.query && p.query.length; if (q || m) { for (var n in this.futureSignals) { n = this.futureSignals[n]; if (n.from === r && n.signal !== "low" && this.tabs[r].model.allowVertical && this.tabs[r].module) { this.tabs[r].module.model.loadDeferred() } } } }, add_local: function(o) { var m = DDG.localAPI.getPlacesResponse(o); if (!m.results || !m.results.length) { return this.failed("maps_places") } var k = (m.results.length > 1) ? "maps_places_multiple" : "maps_places_single"; var n = { name: "Places", id: "maps_places", pixelId: k, allowMultipleCalls: true, data: m.results, signal: m.signal, proximity: m.proximity, local_source: m.local_source, geoip: m.geoip, distance: m.distance, biz_score: m.biz_score, cat_score: m.cat_score, chain_score: m.chain_score, delta: m.delta, matches_location: m.matches_location, review_count: m.review_count, trigger_count: m.trigger_count, wiki_entity: m.wiki_entity, meta: { idField: "itemId", sourceName: m.source, sourceUrl: m.url, developer: [{ name: "DDG Team" }], signal_from: "maps_places" } };
            this.add(n) }, failed: function(n) { var m = new Date().getTime();
            this.failedIA[n] = m; if (this.tabs[n]) { this.tabs[n].failed() } var k = j; if (e[n]) { k += e[n] } if (DDG.deep.finished && (m - DDG.deep.finished < k)) { DDG.pixel.fire("iafp", n) } return false }, future_signal_tab: function(k) { if (!k || !k.from) { return } if (!h.modulesLayout.canAddSignal(k)) { return } if (!k.signal) { k.signal = "high" } if (!k.timeout) { k.timeout = (k.signal === "high") ? 3000 : 1500 } k.now = DDG.get_now(); if (this.failedIA[k.from]) { return } this.futureSignals.push(k);
            this.futureSignalsById[k.from] = k.signal;
            this.futureSignals = this.futureSignals.sort(function(n, m) { return (f[n.signal] > f[m.signal]) ? -1 : 1 }) }, showOrganicModules: function() { if (!h.settings.isDefault("kz")) { return } if (h.search.isNavigational && this.tabs.news) { delete this.futureSignalsById.news; for (var k = 0; k < this.futureSignals.length; k++) { if (this.futureSignals[k].from === "news") { this.futureSignals.splice(k, 1); break } } this.tabs.news.module.isOrganicModule = this.tabs.news.module.model.isOrganicModule = true;
                h.modulesLayout.setOrganicModule("news"); if (!this.openedTab && !h.history.get("ia")) { this.open("web", { autoOpened: true }) } } }, show: function(E) { var B = "",
                p = DDG.get_now(),
                s = [],
                y = [],
                x = 0,
                n = [],
                D = [],
                r = [],
                C = p - a; for (var F in this.futureSignals) { F = this.futureSignals[F]; if (this.failedIA[F.from] || F.signal === "low" || h.history.get("ia")) { continue } if (F.signal == "high") { s[F.from] = 1 } else { if (F.signal == "medium") { y[F.from] = 1 } } if (this.froms[F.from]) { continue } if (this.tabs[F.from]) { var o = this.tabs[F.from]; if (o.type !== "static") { continue } else { if (o.numItems() !== 0) { continue } } } if ((p - F.now) < F.timeout) { x = F.from; break } } for (var H in this.tabs) { o = this.tabs[H]; if (this.openedTab || h.history.get("ia")) { continue } var m = 0; if (s[o.id] || s[o.from]) { m = 1 } if (m) {} if (!m && (!o.signal || o.signal !== "high")) { if (o.type !== "static") { if (o.signal === "medium" || y[o.id] || y[o.from]) { D.push(o) } else { r.push(o) } } else { if (this.placeholder && this.placeholder.signalWait === o.id && y[o.id]) { D.push(o) } } continue } if (o.model.allowVertical && o.module) { o = this.tabs[o.id].module } if (o.type === "static" && (o.numItems() === 0)) { continue } if (!this.placeholder && o.model.usingOrganicBackfill) { continue } if (!B) { n.push(o) } else { if (m) { n.push(o) } } } var u = 0,
                v = 0; if (!DDG.deep.started && !n.length) { u = 1 } if (x && !n.length) { u = 1;
                v = 1 } var G = x in e ? e[x] : 0; if (!this.openedTab && u) { if (!this.placeholder && DDG.deep.timeSinceFinished() > (j + G) && v) { this.addPlaceholder(x) } if (this._showTimer) { clearTimeout(this._showTimer) } this._showTimer = setTimeout(this.show.bind(this, "self"), 50); return } var A, t = 0; if (!this.openedTab && (this.placeholder || n.length || D.length)) { A = this._getBestTabToOpen({ signalTabsHigh: n, signalTabsMedium: D, signalWatchHigh: s, modulesOnly: this.placeholder && this.placeholder.isModule, iasOnly: this.placeholder && !this.placeholder.isModule }); if (!A && this.placeholder && (C > i || !u)) { A = this._getLastResortTab({ tabs: r, modulesOnly: this.placeholder && this.placeholder.isModule, iasOnly: this.placeholder && !this.placeholder.isModule });
                    t = 1; if (A) { this._fireFallbackPixel(this.placeholder.signalWait) } } } if (!this.openedTab && A) { if (!this.placeholder) { var z = A.from || A.id,
                        k = A.timeAdded - (h.deep.finished || p),
                        q = j + (e[z] || 0); if (k > q) { return } } this.open(A.id, { autoOpened: true, is_last_resort_tab: t }) } else { if (this.placeholder && C > g) { this.placeholder.showNoResults() } } if (!this.activeTabId && !this.placeholder && !h.history.get("iar") && !h.history.get("ia") && h.deep.finished) { h.duckbar.open("web", { autoOpened: true }) } }, getNameId: function(k) { var m = h.strip_non_alpha(k.toLowerCase()); return m !== "all" ? m : "web" }, _getBestTabToOpen: function(p) { var k = p.signalTabsHigh || [],
                r = p.signalTabsMedium || [],
                m = p.signalWatchHigh || {},
                q; for (var n = 0; n < k.length; n++) { var o = k[n]; if (m[o.id] || m[o.from]) { if (this._isCompatibleTab(o, p)) { return o } } } q = this._getHighestRankingTab(k, p) || this._getHighestRankingTab(r, p); if (q) { return q } else { if (this.tabs.answer && this._isCompatibleTab(this.tabs.answer, p)) { return this.tabs.answer } else { if (this.tabs.about && this._isCompatibleTab(this.tabs.about, p)) { return this.tabs.about } else { if (this.tabs.meanings && this._isCompatibleTab(this.tabs.meanings, p)) { return this.tabs.meanings } } } } }, _isCompatibleTab: function(m, k) { k = k || {}; if (k.modulesOnly && !m.isModule) { return false } else { if (k.iasOnly && m.isModule) { return false } } return true }, _getLastResortTab: function(k) { var m = k.tabs || []; return this._getHighestRankingTab(m, k) || this.tabs.images }, _getHighestRankingTab: function(m, o) { var r = -1000,
                p = ""; for (var k = 0; k < m.length; k++) { var n = m[k],
                    q = c[n.id] || c[n.from] || 0; if (!this._isCompatibleTab(n, o)) { continue } if (n.model && n.model.meta && n.model.meta.blockgroup === "goodie") { q += 1000 } if (n.model && n.model.queryMatch) { q += 1000 } if (q > r) { r = q;
                    p = n } } return p }, _fireFallbackPixel: function(o) { var q = this.futureSignals.map(function(z) { return z.from + ":" + z.signal }).join(","),
                k = "",
                v = "",
                n = new Date().getTime(),
                p, u, x; try { for (var r in this.failedIA) { u = this.failedIA[r];
                    x = u - DDG.deep.finished; if (k) { k += "," } k += (r + ":" + x) } for (var m in this.tabs) { p = this.tabs[m];
                    x = p.timeAdded - DDG.deep.finished; if (p.type !== "static") { if (v) { v += "," } v += (m + ":" + p.signal + ":" + x) } } } catch (t) {} var y = { timeSincePageLoad: n - a, timeSinceDeepStarted: DDG.deep.timeSinceStarted(), timeSinceDeepFinished: n - DDG.deep.timeSinceFinished(), numSignals: this.futureSignals.length, numTabs: Object.keys(this.tabs).length, numFails: Object.keys(this.failedIA).length, signals: q, fails: k, tabs: v }; var s = p.module && p.module.model; if (s && typeof s.resultNum !== "undefined") { y.l = s.resultNum;
                y.f = s.filteredNum } h.pixel.fire("iaff", o, y) }, _getSideModuleOpenType: function() { if (this.activeTabId) { return this.activeTabOpenType } return h.history.get("ia") ? "q" : "i" }, _getAnswerName: function(m) { var k = m.name || m.duckbar_topic || m.topic || "Answer"; if (k === "qa") { k = "Q/A" } return k }, _openNext: function(k) { if (h.keyboard.namespaced(/^autocomplete$/) || h.keyboard.focusedOnInput()) { return } var m = this.getActiveTab(); if (m && m.model.selectedItem) { return } this.menu.openNext(k) }, _getIAMetadata: function(n) { var k; for (var m = 0; m < DDG.Data.StaticIAs.length; m++) { k = DDG.Data.StaticIAs[m]; if (k.id === n) { return k } } return false } } }(DDG);
! function(a) { a.DuckbarTab = function(b) { if (b.answerType && a.Models.Answers[b.answerType]) { this.model = new a.Models.Answers[b.answerType](b) } else { this.model = new a.Models.Answer(b) } this.id = this.model.id;
        this.name = this.model.name;
        this.nameId = this.model.nameId;
        this.type = this.model.type;
        this.signal = this.model.signal;
        this.pixelId = this.model.pixelId;
        this.from = this.model.from;
        this.isModule = this.model.isModule;
        this.isSideModule = this.model.isSideModule;
        this.timeAdded = new Date().getTime();
        this.items = this.model.items; if (this.id === "images" || this.id === "videos" || this.id === "news") { this.model.isRequery = a.hidden.get("iar") === this.id && !a.history.get("iax");
            this.model.expanded = a.hidden.get("iar") === this.id } };
    a.DuckbarTab.prototype = $.extend({}, EventEmitter2.prototype, { append: function(b) { if (!b) { return } if (this.model.active && this.model.items.length && a.history.get("iaf")) { return } this.model.meta.update(b.meta); if (b.deferredContent) { this.model.deferredContent = b.deferredContent; return } b.data = $.isArray(b.data) ? b.data : [b.data || b];
            this.model.addItems(b.data, b.ads) }, numItems: function() { return this.model.items.length }, show: function(b) { if (this.model.active) { return } this.$parent = b.appendTo; if (this.id !== "web" && !this.view && !this._createView()) { return } this.model.set("openType", b && b.openType); if (b.loadDeferred) { this.model.loadDeferred() } this.emit("show"); if (this.isSideModule || this.isOrganicModule) { this.view.show(); return } this.model.set("active", 1);
            a.history.clear("iac"); if (this._stashedHistory) { a.history.set(this._stashedHistory);
                delete this._stashedHistory } if (this._stashedHidden) { a.hidden.set("iaf", this._stashedHidden);
                delete this._stashedHidden } a.history.set({ ia: this.nameId }) }, hide: function() { if (!this.model.active) { return } if (!this.isSideModule) { this._stashedHistory = a.history.getNamespace("ia");
                a.history.clearNamespace("ia"); if (a.hidden.get("iaf")) { this._stashedHidden = a.hidden.get("iaf");
                    a.hidden.clear("iaf") } } this.model.set("active");
            this.emit("hide") }, getHeight: function(b) { return this.view && this.view.getHeight && this.view.getHeight(b) }, destroyView: function() { this.view && this.view.destroy();
            delete this.view;
            this.model.set("active") }, failed: function() { this.model.set("failed", true) }, _createView: function() { var b = new a.Utils.TabViewBuilder();
            this.view = b.build({ model: this.model, appendTo: this.$parent, events: { close: this.emit.bind(this, "close"), "item-selected": this.emit.bind(this, "item-selected"), "item-unselected": this.emit.bind(this, "item-unselected"), "item-shown": this.emit.bind(this, "item-shown") } }); return !!this.view } }) }(DDG);
! function(a) { a.NoOpDuckbarTab = function(b) { this.model = a.modulesLayout.getModule(b).model;
        this.id = b;
        this.name = this.model.name;
        this.nameId = this.model.nameId;
        this.type = this.model.type;
        this.signal = this.model.signal;
        this.pixelId = this.model.pixelId;
        this.from = this.model.from;
        this.isModule = this.model.isModule;
        this.isSideModule = this.model.isSideModule;
        this.timeAdded = new Date().getTime();
        this.items = this.model.items };
    a.NoOpDuckbarTab.prototype = $.extend({}, EventEmitter2.prototype, { append: function(b) { $.noop }, numItems: function() { return this.model.items.length }, show: function(b) { a.modulesLayout.setOpenType(this.id, b.openType); if (b.openType === "i" || b.openType === "q") { a.modulesLayout.setDefaultTopModule(this.id) } a.history.clear("iac"); if (this._stashedHistory) { a.history.set(this._stashedHistory);
                delete this._stashedHistory } a.history.set({ ia: this.nameId }) }, hide: function() { if (!this.model.active) { return } this._stashedHistory = a.history.getNamespace("ia");
            a.history.clearNamespace("ia"); if (a.hidden.get("iaf")) { this._stashedHidden = a.hidden.get("iaf");
                a.hidden.clear("iaf") } }, getHeight: function(b) { $.noop }, destroyView: function() { $.noop }, failed: function() { this.model.set("failed", true) } }) }(DDG);
! function(c) { var b = c.Models.AnswerSelectLists,
        a = c.Models.SelectList;
    b.Parameter = function(e) { a.call(this, e) };
    b.Parameter.prototype = $.extend({}, a.prototype, { serialize: function() { if (!this.selected || !this.selected.id || this.disabled) { return "" } return this.key + ":" + this.selected.id } }) }(DDG);
! function(c) { var b = c.Models.AnswerSelectLists,
        a = c.Models.SelectList;
    b.Source = function(e) { e.key = "src";
        a.call(this, e) };
    b.Source.prototype = $.extend({}, a.prototype, { getParameterQueryString: function() { var e = ""; if (this.selected.id === "local") { e += this.parameters.map(function(f) { return f.key + "=" + f.selected.id }).join("&") } else { e = "f=";
                e += this.parameters.map(function(f) { return f.serialize() }).join(",") } return e }, hasActiveFilters: function() { return this.parameters && this.parameters.some(function(e) { return e.selected && e.selected.id }) }, getRequeryURL: function(f) { var e = this.selected.requeryURL; if (typeof e === "function") { e = e() } e += ((f && f.query) ? f.query : c.get_query_encoded()) + "&vqd=" + window.vqd; if (e.indexOf("?") === -1) { e += "?" } else { e += "&" } e += this.getParameterQueryString(); if (f) { delete f.query;
                e += "&" + $.param(f) } return e } }) }(DDG);
! function(c) { var b = c.Models.AnswerSelectLists,
        a = c.Models.SelectList;
    b.DirectionSource = function(e) { e = e || {};
        e.values = this._getSources();
        e.selectedId = c.settings.get("kam");
        a.call(this, e);
        c.settings.on("change:kam", this.select.bind(this)) };
    b.DirectionSource.prototype = $.extend({}, a.prototype, { _getSources: function() { var e = DDG.Data.Settings.directionSources; return Object.keys(e).map(function(f) { return $.extend({}, e[f], { id: f }) }) }, _createURLForLocation: function(f, g) { var e; if (f && g && g.address && g.lat && g.lon) { e = f;
                e = e.replace(/\{\{addr\}\}/g, g.address);
                e = e.replace(/\{\{lat\}\}/g, g.lat);
                e = e.replace(/\{\{lng\}\}/g, g.lon) } return e }, getDirectionsURL: function(e) { if (!this.selected) { return "" } return this._createURLForLocation(this.selected.directionsURL, e) }, getMapURL: function(e) { if (!this.selected) { return "" } return this._createURLForLocation(this.selected.mapURL, e) }, getMapTitleText: function() { var e = this.selected.name; return lp("open_in_third_party_app", "Open in %s", e) }, getSourcesForLocation: function(e) { return this._getSources().map(function(g) { var f = this._createURLForLocation(g.mapURL, e); return { id: g.id, name: g.name, mapURL: this._createURLForLocation(g.mapURL, e), directionsURL: this._createURLForLocation(g.directionsURL, e), faviconURL: g.faviconURL || f } }.bind(this)) }, getNonDefaultSourcesForLocation: function(e) { return this.getSourcesForLocation(e).filter(function(f) { return !this.selected || f.id !== this.selected.id }.bind(this)) } }) }(DDG);
! function(b) { var a = b.Models.Answer;
    b.Models.Answers.Maps = function(c) { var f = { id: "local", requeryURL: b.services.getURL("local") }; var e = [{ key: "tg", values: [{ id: "maps_places" }] }, { key: "rt", values: [{ id: "D" }] }, { key: "mkexp", values: [{ id: "b" }] }];
        c.sources = [f];
        c.parameters = e;
        a.call(this, c) };
    b.Models.Answers.Maps.prototype = $.extend({}, a.prototype, { answerItemModel: "MapLocation", addItems: function(c) { a.prototype.addItems.call(this, c); if (this.items.length && !this.selectedItem && this.answerItemModel === "MapLocation") { this.items[0].select() } }, _onRequery: function(c) { if (c.response_type === "places") { c = DDG.localAPI.getPlacesResponse(c);
                this.answerItemModel = "Place" } else { if (c.response_type === "map") { c = DDG.localAPI.getMapsResponse(c);
                    this.answerItemModel = "MapLocation" } } a.prototype._onRequery.call(this, c) } }) }(DDG);
! function(b) { var a = b.Models.Answer;
    b.Models.Answers.News = function(c) { a.call(this, c) };
    b.Models.Answers.News.prototype = $.extend({}, a.prototype, { answerItemModel: "News", _setFailed: function() { this.set("failed", true);
            Spice.failed(this.pixelId); if (this.isOrganicModule) { var c = $("#organic-module");
                c.children().remove();
                this.placeholder = new b.Views.Modules.Placeholder({ model: new b.Models.Answer({ id: "organic-placeholder" }), signalWait: "news", appendTo: c });
                b.pixel.fire("iaff", this.pixelId, { l: this.resultNum, f: this.filteredNum });
                b.pixel.fire("iaof", "images");
                this.placeholder.showImages(b.duckbar.tabs.images.model) } }, _checkForNewsBackfill: function() { var c = b.deep.getNewsItems(this.isModule); if (c && c.length) { this.usingOrganicBackfill = true;
                this.addItems(c);
                b.pixel.fire("iafo", this.id, this.openType) } else { this._setFailed() } }, _checkForSpellingBackfill: function() { var e = b.search.spelling,
                c = this.experimentalDeferredURL + e.query + "&vqd=" + e.suggestionVqd; if (b.searchExperiments) { c = b.searchExperiments.addExperimentParameters(c) } $.ajax({ type: "GET", url: c, dataType: "json", success: this._onDeferredLoaded.bind(this), error: this._setFailed.bind(this) }) }, _canUseOrganicBackfill: function(c) { var e = c && c.results && c.results.length; return !e && !this._hasDeferredQueries() && !b.search.isQuotedQuery() }, _canUseSpellingBackfill: function() { var e = b.search.isQuotedQuery(),
                c = b.search.spelling,
                f = (c && c.suggestion && c.suggestion.length); return (!e && f && c.isValidType()) }, _filterOutOldArticles: function(c) { this.resultNum = c.results.length; if (!this.isVertical) { c.results = $.grep(c.results, function(e) { return !e.is_old }) } this.filteredNum = this.resultNum - c.results.length }, _onDeferredLoaded: function(c) { if (c && c.results) { c = $.extend({}, c, true);
                this._filterOutOldArticles(c) } if (!b.deep.finished) { return b.deep.on("change:finished", this._onDeferredLoaded.bind(this, c)) } if (this._canUseSpellingBackfill() && !this.usingSpellingBackfill) { this.usingSpellingBackfill = true;
                this._checkForSpellingBackfill(); return } else { if (this._canUseOrganicBackfill(c)) { if (this.isVertical) { this._checkForNewsBackfill() } else { this._setFailed() } } } a.prototype._onDeferredLoaded.call(this, c); if (this.id === "news" && (this.openType === "e" || this.openType === "r")) { b.pixel.fire("nv", { o: this.openType, b: (this.usingOrganicBackfill ? 1 : 0), p: (b.page && b.page.showingSpelling ? 1 : 0), t: (b.get_query().match(/\"/) ? 1 : 0), l: this.items.length, r0: (this.items.length === 0 ? 1 : 0), r1: (this.items.length < 3 ? 1 : 0), r2: (this.items.length < 5 ? 1 : 0), r3: (this.items.length < 10 ? 1 : 0) }) } } }) }(DDG);
! function(b) { var a = b.Models.Answer;
    b.Models.Answers.About = function(c) { a.call(this, c);
        this.bindEvents([
            [this, "change:isMapExpanded", this._onMapExpandedChange]
        ]) };
    b.Models.Answers.About.prototype = $.extend({}, a.prototype, { _onMapExpandedChange: function(c) { if (c) { this.originalExpandedState = this.expanded;
                this.set("expanded", true) } else { this.set("expanded", this.originalExpandedState) } }, hasContentHeight: function() { var c = this.items && this.items[0]; return c && c.hasPredictableExpandableContent() } }) }(DDG);
! function(b) { var a = b.Models.Answer;
    b.Models.Answers.Forecast = function(c) { a.call(this, c) };
    b.Models.Answers.Forecast.prototype = $.extend({}, a.prototype, {}) }(DDG);
! function(c) { var a = c.Models.Answer,
        b = 8,
        e = 10;
    c.Models.Answers.Images = function(f) { a.call(this, f) };
    c.Models.Answers.Images.prototype = $.extend({}, a.prototype, { getModuleRow: function(q, n, f) { var j = []; var s = {}; var k = 0;
            q = q || 0; for (var o = q; o < this.items.length; o++) { if (!this.items[o]) { break } s = this.items[o];
                s.rq = rq;
                s.kurl = kurl ? kurl : ""; var m = s.width <= s.height,
                    p = s.width / s.height;
                s.height = f - b;
                s.divHeight = s.height;
                s.width = Math.floor(s.height * p);
                s.divWidth = m ? s.width : s.width * 2 / 3;
                k += s.divWidth;
                j.push(s); if (k > n) { break } } var g = b * (j.length - 1),
                r = n - (k + g),
                h = Math.ceil(r / j.length);
            k = 0; for (o = 0; o < j.length; o++) { s = j[o];
                s.divWidth += h; if (s.divWidth > s.width) { s.width += s.divWidth - s.width } s.divWidth = Math.max(s.divWidth, e);
                k += s.divWidth;
                s.lastOfRow = o === j.length - 1 } r = n - (k + g);
            s.divWidth += r; return j } }) }(DDG);
! function(b) { var a = b.Models.Answer,
        c = 3;
    b.Models.Answers.Places = function(e) { var g = { id: "local", requeryURL: b.services.getURL("local") }; var f = [{ key: "tg", values: [{ id: "maps_places" }] }, { key: "rt", values: [{ id: "D" }] }, { key: "mkexp", values: [{ id: "b" }] }];
        e.sources = [g];
        e.parameters = f;
        a.call(this, e);
        this.staticMapTitle = this._getStaticMapTitle();
        this.moreAtExternalServiceText = this._getMoreAtExternalServiceText() };
    b.Models.Answers.Places.prototype = $.extend({}, a.prototype, { addItems: function(e) { a.prototype.addItems.call(this, e); if (this.items && this.items.length > 0) { this.primaryPlace = this.items[0];
                this.topPlaces = this.items.slice(0, c);
                this.topPlaces = this.topPlaces.map(function(f) { f.set("isSideModule", this.isSideModule); return f }.bind(this));
                this.isSingle = this.items.length === 1;
                this.set("isMoreAtVisible", !this.isSingle);
                this.canExpand = !this.isSideModule && this.isSingle && this.primaryPlace && this.primaryPlace.isExpandable() } }, isExpandable: function() { return this.canExpand }, toggleExpand: function() { this.set("expanded", !this.expanded); if (this.primaryPlace) { this.primaryPlace.toggleExpand() } }, setUserMapIntent: function() { if (!this.userMapIntent) { this.set("userMapIntent", true) } }, _getStaticMapTitle: function() { return lp("maps_places", "Open Expanded Map") }, _getMoreAtExternalServiceText: function() { var e = this.meta.sourceName; return l("More at %s ", e) }, _onRequery: function(e) { if (e.response_type === "places") { e = DDG.localAPI.getPlacesResponse(e);
                this.answerItemModel = "Place" } else { if (e.response_type === "map") { e = DDG.localAPI.getMapsResponse(e);
                    this.answerItemModel = "MapLocation" } } a.prototype._onRequery.call(this, e) } }) }(DDG);
! function(b) { var a = b.Models.Answer;
    b.Models.Answers.Products = function(c) { a.call(this, c) };
    b.Models.Answers.Products.prototype = $.extend({}, a.prototype, { answerType: "Products", clickedExternalLink: function(f, h) { if (!h || !h.target) { return a.prototype.clickedExternalLink.call(this, f) } var c = $(h.target),
                g = $(h.target.parentElement); if (c.hasClass("tile__media")) { f.clk = "i" } else { if (g.hasClass("tile__title--brand")) { f.clk = "b" } else { if (g.hasClass("tile__title")) { f.clk = "d" } else { f.clk = "o" } } } a.prototype.clickedExternalLink.call(this, f) } }) }(DDG);
! function(c) { var b = c.Models.Base,
        a;
    c.Models.AnswerItems.Base = a = function(e) { if (this.transform) { e = this.transform(e) } b.call(this, e);
        this._updateId() };
    a.extend = function(f) { var e = function(g) { a.call(this, g) };
        e.prototype = $.extend({}, a.prototype, f || {}); return e };
    a.prototype = $.extend({}, b.prototype, { select: function() { this.unhighlight();
            this.set("selected", 1); if (this.topic && this.topic.select) { this.topic.select() } }, unselect: function() { this.set("selected"); if (this.topic && this.topic.unselect) { this.topic.unselect() } }, highlight: function() { if (this.selected) { return } this.set("highlighted", 1); if (this.topic && this.topic.highlight) { this.topic.highlight() } }, unhighlight: function() { this.set("highlighted"); if (this.topic && this.topic.unhighlight) { this.topic.unhighlight() } }, toTemplateObject: function() { return $.extend({}, this, { meta: this.meta ? $.extend({}, this.answerMeta, this.meta) : this.answerMeta }) }, _updateId: function() { if (typeof this.idField === "string" && this[this.idField]) { return this.id = this[this.idField] } if ($.isArray(this.idField)) { this.id = this.idField.map(function(e) { return this[e] }, this).join(""); if (this.id) { return this.id } } return this.id = this.UUID() }, getItemTemplate: function() { var e = this.templates,
                f = e.item; if (c.device.isMobile) { f = e.item_mobile || f } return f }, getDetailTemplate: function() { var e = this.templates,
                f = e.detail; if (c.device.isMobile) { f = e.detail_mobile || f } return f }, getItemDetailTemplate: function() { var e = this.templates,
                f = e.item_detail || e.detail; if (c.device.isMobile) { f = e.item_detail_mobile || e.detail_mobile || f } return f }, canShowItemDetail: function() { return !!this.getItemDetailTemplate() } }) }(DDG);
! function(a) { a.Models.AnswerItems.Audio = a.Models.AnswerItems.Base.extend({ idField: "url" }) }(DDG);
! function(a) { a.Models.AnswerItems.FatheadListItem = a.Models.AnswerItems.Base.extend({ idField: "FirstURL" }) }(DDG);
! function(b) { var a = b.Models.AnswerItems.Base,
        h = ["alternate", "rain", "snow", "sleet", "fog", "cloudy", "partly-cloudy-day", "partly-cloudy-night", "clear-day", "clear-night", "hail", "thunderstorm", "tornado", "wind"],
        g = [0, 4, 8, 12, 16, 20],
        f = { metric: "c", imperial: "f" },
        e = [lp("forecast", "N"), lp("forecast", "NE"), lp("forecast", "E"), lp("forecast", "SE"), lp("forecast", "S"), lp("forecast", "SW"), lp("forecast", "W"), lp("forecast", "NW"), lp("forecast", "N")],
        c = ["ar", "de", "es", "fr", "it", "ja", "nl", "tr", "zh"];
    b.Models.AnswerItems.Forecast = function(i) { a.call(this, i) };
    b.Models.AnswerItems.Forecast.prototype = $.extend({}, a.prototype, { transform: function(i) { if (!i || !i.currently || !i.daily || !i.flags) { return } this._data = i;
            this.unit = this._getInitialUnit();
            this.isMetric = this.unit === f.metric;
            this._setDailyWeather(i);
            this.selected = 0;
            this.latitude = i.latitude;
            this.longitude = i.longitude;
            this.location = i.flags["ddg-location"];
            this.moreAtUrl = this._getMoreLink({});
            this.isIE11 = b.device.isIE11p;
            this._setCurrentWeather(i.currently);
            this.updateSelected(this.selected, true);
            this._mapData(i, this.isMetric);
            this.hours = this._getHoursGraphData(i, this.isMetric) }, _setAlert: function(k, n) { if (!k || !k.length) { return } if (n) { this.warning = null;
                this.weatherAlert = null; return } if (!n && !this.warning && !this.weatherAlert) { for (var j = 0; j < k.length; j++) { var m = k[j];
                    m.title = m.title.replace(/(yellow)|(orange)/ig, ""); if (m.severity === "advisory") { this.warning = m } else { this.weatherAlert = m; break } } } }, _calculatePercent: function(i) { return Math.round(i * 100) }, _setCurrentWeather: function(j) { if (!j) { return } var i = 48;
            this.precipitation = this._calculatePercent(j.precipProbability);
            this.humidity = this._calculatePercent(j.humidity);
            this.icon = this._getIcon(j.icon, i);
            this.iconName = j.icon;
            this.summary = j.summary }, _setDailyWeather: function(n) { if (!n || !n.daily || !n.daily.data) { return } this.days = []; var j, q = 8,
                m = n.daily.data.slice(0, q),
                t = 48; for (var o = 0; o < m.length; o++) { j = new Date(); var k = {},
                    s = (o > 0) ? m[o] : n.currently;
                k.index = o;
                k.icon = this._getIcon(s.icon, t);
                k.iconName = s.icon;
                k.summary = s.summary;
                k.humidity = s.humidity;
                k.precipitation = s.precipProbability;
                j.setDate(j.getDate() + o); if (this.toLocaleStringSupportsLocales()) { var p = locale.replace("_", "-");
                    k.day = j.toLocaleString(p, { weekday: "short" }).replace(".", "");
                    k.dayLong = j.toLocaleString(p, { weekday: "long" }).replace(".", "") } else { var u = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        r = j.getDay();
                    k.day = u[r].substring(0, 4);
                    k.dayLong = u[r] } this.days.push(k) } }, toLocaleStringSupportsLocales: function() { try { new Date().toLocaleString("i") } catch (i) { return i instanceof RangeError } return false }, _getInitialUnit: function() { var i = b.geo.getUOM(),
                j = f[i] || f.imperial; return j }, updateUnit: function(i) { var k = this.days[this.selected] || {},
                j = k.rawHourly || this._data;
            this.isMetric = i === f.metric;
            this._mapData(this._data, this.isMetric);
            this.hours = this._getHoursGraphData(j, this.isMetric, this.selected, k.time);
            k.hours = this.hours;
            this.set("unit", i) }, updateSelected: function(i, j) { var m = this.days[i]; if (!j) { this.summary = m.summary;
                this.wind = m.wind;
                this.precipitation = m.precipitation;
                this.humidity = this._calculatePercent(m.humidity);
                this.icon = this._getIcon(m.iconName, 64);
                this.temperature = m.high;
                this.temperature = (i === 0) ? m.temperature : m.high } this.days[this.selected].selected = false;
            this.days[i].selected = true;
            this.dayLong = b.capitalize(m.dayLong);
            this.moreLink = this._getMoreLink(m);
            this._setAlert(this._data.alerts, i); if (i > 1 && !m.hours) { this.emit("beforeSend");
                $.getJSON("/js/spice/forecast_daily/" + this.latitude + "/" + this.longitude + "/" + m.time).done(function(n) { m.rawHourly = n;
                    this.hours = this._getHoursGraphData(n, this.isMetric, i, m.time);
                    m.hours = this.hours;
                    this.set("selected", i) }.bind(this)) } else { var k = m.rawHourly || this._data;
                m.hours = this._getHoursGraphData(k, this.isMetric, i, m.time);
                this.hours = m.hours;
                this.set("selected", i) } }, _getMoreLink: function(m) { var k = "https://darksky.net"; if (m.time) { var i = new Date();
                i.setDate(i.getDate() + m.index); var j = i.toISOString().substr(0, 10);
                k += "/details/" + this.latitude + "," + this.longitude + "/" + j } else { k += "/forecast/" + this.latitude + "," + this.longitude } return k + "/" + this._getTargetUnit() + "/" + this._getTargetLanguage() }, _getTargetUnit: function() { var i = this.isMetric ? "ca24" : "us12"; return i }, _getTargetLanguage: function() { var i = window.locale.split("_")[0]; if (c.indexOf(i) === -1) { return "en" } return i }, _mapData: function(o, j) { if (!o.currently) { return } var n = o.currently;
            this.wind = this._convertWindSpeed(n.windSpeed, j);
            this.wind += " " + this._convertWindDirection(n.windBearing); for (var m = 0; m < this.days.length; m++) { var k = o.daily.data[m];
                this.days[m].high = this._convertTemperature(k.temperatureMax, j);
                this.days[m].low = this._convertTemperature(k.temperatureMin, j);
                this.days[m].time = k.time;
                this.days[m].temperature = (m === 0) ? this._convertTemperature(n.temperature, j) : this.days[m].high;
                this.days[m].wind = this._convertWindSpeed(k.windSpeed, j);
                this.days[m].wind += " " + this._convertWindDirection(k.windBearing) } this.temperature = this.days[this.selected].temperature }, _getHoursGraphData: function(B, j, r, t) { if (!B || !B.hourly || !B.hourly.data) { return } t = new Date(t * 1000); var z = B.hourly.data,
                y = { data: [] },
                s = { mobileLabels: [] },
                q = 1,
                x = z.length,
                k = 0,
                m = [];
            s.data = { datasets: [], labels: [] }; for (var v = 0; v < x; v += q) { var C = z[v]; if (!C) { continue } var n = new Date(C.time * 1000); if (t && (n < t)) { continue } var p = this._getSingleHourInfo(C, n),
                    o = p.hourString,
                    A = p.temperature,
                    u = p.temperatureLabel;
                y.data.push(A);
                s.data.labels.push(this._getSingleGraphLabel(u, o)); if (!r && q === 1) { s.firstHour = o } if (q === 1) { q = 3;
                    k = v;
                    x = v + 24 } } m = g.map(function(D) { return z[k + D] });
            s.mobileLabels = this._getMobileHoursLabels(m);
            s.data.datasets.push(y); return s }, _getSingleGraphLabel: function(j, i) { if (!i) { return } return [j + "°", i] }, _getMobileHoursLabels: function(k) { if (!k) { return } var r = []; for (var o = 0; o < k.length; o++) { var n = k[o]; if (!n) { continue } var q = new Date(n.time * 1000),
                    j = this._getSingleHourInfo(n, q),
                    m = j.hourString,
                    p = j.temperatureLabel;
                r.push(this._getSingleGraphLabel(p, m)) } return r }, _getSingleHourInfo: function(n, r) { if (!n) { return } r = r || new Date(n.time * 1000); var s = {},
                j = "en-US",
                m, p = this._convertTemperature(n.temperature),
                i = this._convertTemperature(n.temperature, this.isMetric); if (this.toLocaleStringSupportsLocales()) { m = r.toLocaleString(j, { hour: "numeric", hour12: b.device.isEnglish }) } else { m = r.getHours(); if (b.device.isEnglish) { var k = 12,
                        q = (m >= k) ? "PM" : "AM",
                        o = (!m || m === k) ? k : m % k;
                    m = o + " " + q } m = m.toString() } if (!b.device.isEnglish) { m = m.replace(/(\d{2})[^:]+/, "$1");
                m = m.replace(/^0/, "");
                m += ":00" } s = { hourString: m, temperature: p, temperatureLabel: i }; return s }, _convertWindSpeed: function(j, i) { if (i) { return Math.round(j * 1.609344) + " kph" } return Math.round(j) + " mph" }, _convertWindDirection: function(j) { var i = Math.round(j / 45),
                k = e[0],
                m = e[i] || k; return m }, _convertTemperature: function(j, i) { if (i) { j = Math.round((j - 32) * (5 / 9));
                j = (Math.abs(j) === 0) ? Math.abs(j) : j; return j } return Math.round(j) }, _getIcon: function(j, i) { if (h.indexOf(j) === -1) { j = "cloudy" } return "/assets/weather/svg/new/" + j + ".svg" } }) }(DDG);
! function(b) { var a = b.Models.AnswerItems.Base;
    b.Models.AnswerItems.Place = function(c) { a.call(this, c);
        this.subtitle = this.getSubtitle();
        this.directions = this.getDirectionsURL();
        this.directionsTitle = this.getDirectionsTitle();
        this.staticMapTitle = lp("maps_places", "Open Expanded Map");
        this.mapURL = b.directionSource.getMapURL(this);
        this.shortAddress = this.getShortAddress();
        this.hours = this.getHours();
        this.ratingClass = this.rating ? this.rating.toString().replace(".", "-") : false;
        this.morePhotosText = this.getMorePhotosText();
        this.moreAtExternalServiceText = this.getMoreAtExternalServiceText();
        this.viewOnExternalServiceText = this.getViewOnExternalServiceText();
        this.distanceStr = this.getDistanceString(); if (b.device.is2x || b.device.is3x) { this.ratingImage = this.ratingImageRetina ? this.ratingImageRetina : this.ratingImage } this._setReviews(this.reviews) };
    b.Models.AnswerItems.Place.prototype = $.extend({}, a.prototype, { select: function() { a.prototype.select.call(this);
            this._loadReviews() }, getSubtitle: function() { var e = this.getPriceSymbols(),
                c = this.getCategories(); if (!e) { return c } if (!c) { return e } return e + " · " + c }, getPriceSymbols: function() { if (!this.price) { return } var c = ""; for (var e = 0; e < this.price; e++) { c += "$" } return c }, getCategories: function() { if (!this.categories || !this.categories.length) { return } return this.categories.map(function(e) { return e.name }).join(", ") }, getDirectionsTitle: function() { return b.directionSource.getMapTitleText() }, getDirectionsURL: function() { return b.directionSource.getDirectionsURL(this) }, getShortAddress: function() { return this.addressLines ? this.addressLines[0] : null }, getDistanceString: function() { if (!this.distance) { return } var c = b.geo.getUOM(),
                f, e; if (c === "metric") { f = b.geo.metersToKilometers(this.distance);
                e = (f) ? l("%s km", f) : "" } else { f = b.geo.metersToMiles(this.distance);
                e = (f) ? l("%s mi", f) : "" } return e }, getHours: function() { if ($.isEmptyObject(this.hours)) { return false } var e = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; var c = (new Date()).getDay(); return e.map(function(g, f) { if (f === c) { this.hoursToday = this.hours[g] } return { weekDay: g, hours: this.hours[g], isToday: f === c } }.bind(this)) }, toggleHoursExpand: function() { if (this.hours) { this.set("hoursExpanded", !this.hoursExpanded) } }, getMorePhotosText: function() { var c = this.name; return l("See more photos of %s", c) }, getViewOnExternalServiceText: function() { var c = this.source; return l("View on %s", c) }, getMoreAtExternalServiceText: function() { var c = this.source; return l("More at %s ", c) }, getUserOnServiceText: function(c) { var e = c.name; var f = this.source; return lp("maps_places", "%s on %s", e, f) }, isExpandable: function() { if (typeof this.canExpand === "undefined") { return this.canExpand = !this.isSideModule && (!!this.moreAtExternalServiceText || (this.review_detail && this.review_detail.length > 0)) } return this.canExpand }, toggleExpand: function() { this.set("expanded", !this.expanded) }, _loadReviews: function() { if (this._loadedReviews) { return } this._loadedReviews = true;
            $.ajax({ dataType: "jsonp", url: "/local.js?q=" + encodeURIComponent(this.name) + "&tg=maps_places&id=" + this.itemId + "&strong_hint=" + this.itemId + "&fsh=1&l=" + b.settings.region.getId(), success: function(c) { c = b.localAPI.getPlacesResponse(c); if (!c.results || !c.results.length) { return } var e = c.results.filter(function(f) { return f.itemId === this.itemId }.bind(this)); if (e && e[0]) { this._setReviews(e[0].reviews) } }.bind(this), error: function() {} }) }, _setReviews: function(c) { if (!c || !c.length) { return } c.forEach(function(e) { var f = { year: "numeric", month: "short", day: "numeric" };
                e.formattedDate = new Date(e.timeCreated * 1000).toLocaleDateString(false, f);
                e.user.userOnServiceText = this.getUserOnServiceText(e.user); if (b.device.is2x || b.device.is3x) { e.ratingImage = e.ratingImageRetina ? e.ratingImageRetina : e.ratingImage } e.ratingClass = e.rating ? e.rating.toString().replace(".", "-") : "" }.bind(this));
            this.set("reviews", c) } }) }(DDG);
! function(a) { a.Models.AnswerItems.Product = a.Models.AnswerItems.Base.extend({ idField: ["ASIN", "img_m", "img"] }) }(DDG);
! function(g) { var f = g.Models.AnswerItems.Base,
        e = { YouTube: { embedURL: "https://www.youtube-nocookie.com/embed/", searchURL: "https://www.youtube.com/results?search_query=", userURL: "https://www.youtube.com/channel/", url: "https://www.youtube.com/watch?v=", params: { wmode: "transparent", iv_load_policy: 3, autoplay: 1, html5: 1, showinfo: 0, rel: 0, modestbranding: 1, playsinline: 1, theme: "light" } }, Vimeo: { embedURL: "https://player.vimeo.com/video/", searchURL: "https://www.vimeo.com/search?q=", userURL: "https://vimeo.com/", url: "https://vimeo.com/", params: { api: 0, autoplay: 1 } } };
    g.Models.AnswerItems.Video = f.extend({ idField: "id", transform: function(h) { var i = e[h.provider];
            h.embedURL = i.embedURL + h.id + "?" + $.param(i.params);
            h.faviconURL = g.get_favicon_url(h.provider.toLowerCase());
            h.musicVideoData = a(h);
            h.url = i.url + h.id;
            h.searchURL = i.searchURL + rq;
            h.userURL = i.userURL + h.channel_id;
            h.username = h.display_name;
            h.viewCount = b(h);
            h.publishedDate = c(h.published); return h }, getITunesData: function(j) { var k = this.musicVideo(); if (!k) { return j() } if (this._iTunesData) { return j(null, this._iTunesData) } var h = this,
                i = "/iit/" + encodeURIComponent(k.title);
            $.ajax({ url: i, dataType: "json", success: function(m) { h._iTunesData = m;
                    j(null, m) }, error: function() { j() } }) }, canShowItemDetail: function() { var h = f.prototype.canShowItemDetail.call(this); return h && g.settings.get("k5") !== "2" } }); var b = function(i) { var j = 0; if (i.statistics && i.statistics.viewCount) { j = parseInt(i.statistics.viewCount, 10); if (!$.isNumeric(j)) { j = 0 } } if (!j && i.duration.match(/\d+:\d+:\d+/)) { return lp("video", "Preview") } var h = lnp("video", "%d view", "%.0f views", j); return h.replace(/(\d)(?=(\d{3})+(\.\d+|)\b)/g, "$1,") },
        a = function(p) { if (!p.category || p.category !== "Music") { return } var o = p.title.replace(/\(.*\)|\[.*\]/g, "");
            o = o.replace(/\s+f(?:ea|)t\..*$/g, "");
            o = o.replace(/^\s+|\s+$/g, ""); var i = o.split(" - "),
                m = i[0],
                j = i[1] || m,
                q = j !== m ? j + " " + m : j,
                k = "/iit/" + encodeURIComponent(o),
                n = encodeURIComponent("!a " + q),
                h = encodeURIComponent("!spotify " + q); return { title: o, artist: m, song: j, iTunesURL: k, amazonURL: n, spotifyURL: h } },
        c = function(i) { var h = DDG.getDateFromString(i); return h ? h.toDateString().substr(4) : "" } }(DDG);
! function(c) { var b = c.Models.AnswerItems,
        a = b.Base;
    b.News = a.extend({ idField: "url", transform: function(e) { e.showImage = e.image || e.fetch_image; if (e.relative_time) { e.relativeTimeShort = e.relative_time.replace(/(\d+) ([a-z]).*/, "$1$2") } if (!e.favicon_url) { e.favicon_url = e.url } this.on("change:visible", this._onVisibleChanged.bind(this)); return e }, _fetchImage: function(e) { if (this._fetchedImage) { return } this._fetchedImage = true;
            $.getJSON("/f.js?vqd=" + window.vqd + "&o=json&i=1&u=" + e, this._onImageFetched.bind(this)) }, _onVisibleChanged: function() { if (!this.visible) { return } if (this.fetch_image && !this.image) { this._fetchImage(this.url) } }, _onImageFetched: function(e) { if (e && e.image) { this.set("image", e.image) } } }) }(DDG);
! function(f) { var a = f.Models.AnswerItems.Base,
        h = 120,
        j = 160,
        k = 160,
        b = 1.8,
        e = 0.7,
        g = 1100,
        c = 80,
        m = 1.4,
        i = 150;
    f.Models.AnswerItems.About = function(n) { a.call(this, n); if (this.hasInfobox) { this.infobox = new f.Models.Modules.AboutInfoBox({ Infobox: this.Infobox, RelatedTopics: this.RelatedTopics, minimizeHeight: n.minimizeHeight }) } if (this.infobox && this.infobox.maps.length) { this.headerImage = this.Image && !this.ImageIsLogo;
            this.headerType = this.headerImage ? 2 : 1;
            this.header = new f.Models.Modules.AboutHeader({ imageURL: this.headerImage ? this.Image : null, imageWidth: this.ImageWidth, imageHeight: this.ImageHeight, mapURL: this.infobox.maps[0].value }) } if (this.infobox && this.infobox.profiles.length) { this.infobox.profiles.push({ data_type: "wikipedia", value: this.AbstractURL }); if (this.OfficialUrl) { this.infobox.profiles.push({ data_type: "official_site", value: this.OfficialUrl }); var o = f.searchExperiments.assign("muxabouti"); if (o === "b") { this.isExperimentB = true } } this.profiles = new f.Models.Modules.AboutProfiles({ title: this.Heading, entity: this.Entity, data: this.infobox.profiles }) } var p = this.answerMeta; if (p && ((p.id && p.id === "wikihow") || (p.is_stackexchange && p.is_stackexchange === 1))) { this.hasClickableHeader = true } };
    f.Models.AnswerItems.About.prototype = $.extend({}, a.prototype, { headerType: 0, isTooHigh: false, toggleExpand: function() { this.infobox && this.infobox.toggleExpand();
            this.set("expanded", !this.expanded) }, expand: function() { if (!this.expanded) { this.toggleExpand() } }, collapse: function() { if (this.expanded) { this.toggleExpand() } }, hasPredictableExpandableContent: function() { return (this.infobox && this.infobox.canExpand()) || (this.shortAbstract !== this.fullAbstract) }, canModuleExpand: function() { return this.hasPredictableExpandableContent() || this.isTooHigh }, getAbstract: function() { return this.expanded ? this.fullAbstract : this.shortAbstract }, showMoreAtBottom: function() { if (this.infobox) { return false } if (!this.canModuleExpand()) { return true } if (this.isTooHigh) { return true } return false }, transform: function(n) { if (n.Results && n.Results.length) { n.OfficialUrl = n.Results[0].FirstURL } n.minEllipsisHeight = n.minimizeHeight ? c : k;
            n.ImageHeight = n.ImageHeight || 0; if (n.Image && n.ImageWidth && n.ImageHeight) { var q = (f.device.width <= g) ? e : 1; var o = f.scaleToFit(n.ImageWidth, n.ImageHeight, h, j);
                n.ImageWidth = parseInt(o.width, 10);
                n.ImageHeight = parseInt(o.height, 10);
                n.defaultTextHeight = Math.max(n.minEllipsisHeight, (n.ImageHeight * q) / 2) } else { if (n.Image) { delete n.Image } } if (n.Image && window.iqbi && !f.settings.safeSearch.isOff()) { delete n.Image } if (n.AbstractSource) { n.moreAtText = n.AbstractSource } else { if (n.meta) { n.moreAtText = n.meta.src_name } } n.Abstract = f.Utils.Strings.removeUnwantedHtml(n.Abstract) || "";
            n.hasCode = n.Abstract.match(/\<code/i);
            n.hasMarkup = n.Abstract.match(/\<\//);
            n.fullAbstract = n.Abstract;
            n.shortAbstract = this.trimParagraphs(n);
            n.hasInfobox = n.Infobox; var p = DDG.parseAbstract(n.Heading);
            n.title = p.main ? p.main.trim() : n.title;
            n.subTitle = p.subTitle; return n }, trimParagraphs: function(u) { if (!u.Abstract) { return "" } if (u.hasMarkup) { return u.Abstract } var v = u.Abstract.length,
                q, o = /\.\s/g,
                n = v,
                s = u.minimizeHeight ? m : b,
                r = Math.max(u.minEllipsisHeight, u.ImageHeight) * s; if (u.Abstract.length <= r) { return u.Abstract } while (q = o.exec(u.Abstract)) { var t = q.index; if (Math.abs(r - t) < v) { v = Math.abs(r - t);
                    n = t } } var p = u.Abstract.substring(0, n + 1); if ((u.Abstract.length - p.length) < i) { p = u.Abstract } return p } }) }(DDG);
! function(b) { var a = b.Models.AnswerItems.Base;
    b.Models.AnswerItems.MapLocation = function(c) { a.call(this, c); if (this.hasValidLatLon() && b.search.isLatLonQuery()) { this.displayLatLon = this._getDisplayLatLon() } this.latLng = [this.lat, this.lon] };
    b.Models.AnswerItems.MapLocation.prototype = $.extend({}, a.prototype, { hasValidLatLon: function() { return this.lat && !isNaN(this.lat) && this.lon && !isNaN(this.lon) }, _getDisplayLatLon: function() { var c, e, f = '"'; if (this.lat > 0) { c = this.lat + f + " N, " } else { c = (this.lat * -1) + f + " S, " } if (this.lon > 0) { e = this.lon + f + " E" } else { e = (this.lon * -1) + f + " W" } return c + e } }) }(DDG);
! function(b) { var c = 300,
        a = b.Models.Base;
    b.Models.Header = function(g) { a.call(this, g);
        this.welcomeMessageHeight = 0; var f = b.opensearch.installed.version,
            e = b.opensearch.getDaysSinceCohort(f),
            i = !b.settings.isDefault("kaz"),
            h = b.opensearch.installed.variant; if (i && f && h.match(/^[bcd]$/)) { this.showWelcomeMessage = true;
            this.welcomeMessageHeight = 180; if ((h === "b" || h === "c") && e > 0) { b.settings.set("kaz");
                this.showWelcomeMessage = false;
                this.welcomeMessageHeight = 0 } else { if (h === "d") { b.settings.set("kaz") } } } else { if (i && !f) { b.settings.set("kaz") } } this._headerHeight = b.get_header_height() + 1 };
    b.Models.Header.prototype = $.extend({}, a.prototype, { updateScrollPosition: function(h) { var e = (h < this._previousScroll) ? 1 : 0,
                g, f;
            this.scrolledToTop = this.showWelcomeMessage ? h <= this.welcomeMessageHeight : h === 0;
            this.scrolledPastHeaderThreshold = (h > this._headerHeight + c);
            this.scrolledPastHeader = h > this._headerHeight;
            this.canUpdateHeaderPosition = false;
            this.newHeaderPosition = -this._headerHeight; if (this.scrolledToTop) { this._scrollBuffer = 0;
                this._showingFloatedHeader = false;
                this.newHeaderPosition = 0 } g = e && !this._showingFloatedHeader;
            f = !e && this._showingFloatedHeader; if (this.scrolledPastHeaderThreshold && (g || f) && this._pastScrollBuffer(h, e)) { this.newHeaderPosition = (e) ? 0 : -this._headerHeight;
                this.canUpdateHeaderPosition = true;
                this._scrollBuffer = 0;
                this._showingFloatedHeader = !this._showingFloatedHeader } if (this.showWelcomeMessage && !this.scrolledToTop) { this.newHeaderPosition -= this.welcomeMessageHeight } this._previousScroll = h;
            this._previousScrollDirection = e }, _pastScrollBuffer: function(f, e) { if (this._previousScrollDirection !== e) { this._scrollBuffer = 0 } if (!this._scrollBuffer) { this._scrollBuffer = f + ((e) ? -50 : 100) } if (e) { return f < this._scrollBuffer } return f > this._scrollBuffer } }) }(DDG);
! function(c) { var b = c.Models.Base,
        a = "$1,300,000",
        f = "29",
        e = { spread: { title: lp("SERP footer content", "Help Spread DuckDuckGo"), body: lp("showcase_spread", "Help your friends and family join the Duck Side!"), icon: "spread", url: "https://duckduckgo.com/spread", id: "sp" }, bangs: { title: lp("SERP footer content", "Learn About Bangs"), body: lp("SERP footer content", "Discover shortcuts to go to search results on other sites."), icon: "bangs", url: "https://duckduckgo.com/bang", id: "ba" }, app: { title: lp("showcase_app", "Get Our App & Extension"), body: lp("showcase_app", "Protect your data on every device."), icon: "woman", url: "https://duckduckgo.com/app", id: "bl" }, donations: { title: lp("SERP footer content", "Donating for Privacy"), body: lp("SERP footer content", "Over %s in DuckDuckGo privacy donations.", a), icon: "donations", url: "https://duckduckgo.com/donations", id: "dn" }, course: { title: lp("SERP footer content", "Privacy Newsletter"), body: lp("showcase_newsletter", "Learn about online privacy right in your inbox."), icon: "newsletter", url: "https://duckduckgo.com/newsletter", id: "su" }, syntax: { title: lp("SERP footer content", "Fine-tune Your Search"), body: lp("SERP footer content", "Learn how to search like the pros."), icon: "private-searches", url: "https://help.duckduckgo.com/results/syntax", id: "syntax" }, tips: { title: lp("SERP footer content", "Protect Your Devices"), body: lp("SERP footer content", "Check out our privacy device guides."), icon: "privacy-simplified", url: "https://spreadprivacy.com/tag/device-privacy-tips/", id: "tips" }, hiring: { title: lp("SERP footer content", "Join Our Team!"), body: lp("SERP footer content", "Help us raise the standard of trust online."), icon: "employees", url: "https://duckduckgo.com/hiring/", id: "hiring" }, traffic: { title: lp("SERP footer content", "%s Billion Searches", f), body: lp("SERP footer content", "We get a ton of searches, and all of them are anonymous."), icon: "traffic", url: "https://duckduckgo.com/traffic/", id: "traffic" }, themes: { title: lp("SERP footer content", "Get New Themes"), body: lp("SERP footer content", "You're in control. Customize the look-and-feel of DuckDuckGo."), icon: "design", url: "https://duckduckgo.com/settings#theme", id: "theme" }, about: { title: lp("SERP footer content", "Learn About DuckDuckGo"), body: lp("SERP footer content", "Learn how we're dedicated to keeping you safe online."), icon: "hatched", url: "https://duckduckgo.com/about", id: "about" }, google: { title: lp("SERP footer content", "Say Goodbye To Google"), body: lp("SERP footer content", "Learn how you can free yourself from Google for good."), icon: "milestone", url: "https://spreadprivacy.com/how-to-remove-google/", id: "google" }, duckcom: { title: lp("SERP footer content", "Get Started at Duck.com"), body: lp("SERP footer content", "Get to DuckDuckGo faster. Share duck.com with your friends."), icon: "paper-plane", url: "https://duck.com/", id: "duckcom" }, bubble: { title: lp("SERP footer content", "Escape The Filter Bubble"), body: lp("SERP footer content", "Read about how Google influences what people click."), icon: "launch-small", url: "https://spreadprivacy.com/google-filter-bubble-study/", id: "bubble" }, profit: { title: lp("SERP footer content", "How We Are Profitable"), body: lp("SERP footer content", "The world needs an alternative to the collect-it-all business model."), icon: "beanstalk", url: "https://spreadprivacy.com/duckduckgo-revenue-model/", id: "profit" }, anonymous: { title: lp("SERP footer content", "We Protect Your Privacy"), body: lp("SERP footer content", "We don't store your search history or follow you around the web."), icon: "shield", url: "https://spreadprivacy.com/how-anonymous-is-duckduckgo/", id: "anonymous" } },
        g = [
            [e.tips, e.donations, e.anonymous],
            [e.traffic, e.course, e.bangs],
            [e.spread, e.hiring, e.syntax],
            [e.app, e.course, e.spread],
            [e.themes, e.about, e.google],
            [e.bubble, e.profit, e.duckcom]
        ];
    c.Models.Footer = function(h) { b.call(this, h);
        this.cards = [];
        this.links = [{ url: "https://spreadprivacy.com", icon: "globe", id: "bl" }, { url: "https://twitter.com/duckduckgo", icon: "twr", id: "tw" }, { url: "https://reddit.com/r/duckduckgo", icon: "reddit", id: "rd" }, { url: "https://duckduckgo.com/newsletter", icon: "newsletter", id: "nl" }]; if (!c.device.isDesktop) { this.links.push({ url: "https://duckduckgo.com/app", icon: "phone", id: "ip" }) } this._initCards() };
    c.Models.Footer.prototype = $.extend({}, b.prototype, { _initCards: function() { var h = {},
                j = g[Math.floor(Math.random() * g.length)]; while (this.cards.length < 3) { var i = Math.floor(Math.random() * j.length); if (!h[i]) { h[i] = true;
                    this.cards.push(j[i]) } } } }) }(DDG);
! function(e) { var c = e.Models.Base,
        f = 900000,
        b = 18000000,
        g = "geoip",
        h = "manual",
        a = "precise";
    e.Models.UserLocation = function(i) { i = i || {}; if (typeof i === "string") { i = this._fromString(i) || {} } if (!this._isValidLatLon(i.lat, i.lon)) { i.lat = null;
            i.lon = null } if (!this._isValidLocationType(i.type)) { i.type = a } c.call(this, i); if (this.isValid()) { if (!this.timestamp) { this.timestamp = new Date().getTime() } } };
    e.Models.UserLocation.GEOIP_LOCATION = g;
    e.Models.UserLocation.MANUAL_LOCATION = h;
    e.Models.UserLocation.PRECISE_LOCATION = a;
    e.Models.UserLocation.prototype = $.extend({}, c.prototype, { isValid: function() { return this._isValidLatLon(this.lat, this.lon) }, isSameAs: function(i) { return this.lat === i.lat && this.lon === i.lon && this.desc === i.desc }, isExpired: function() { if (!this.timestamp) { return false } if (this.desc && this.desc === "Antarctica, Antarctica") { return true } var i = new Date().getTime() - this.timestamp,
                j = e.device.isMobile ? f : b; return i > j }, toString: function() { return [this.lat, this.lon, this.desc, this.timestamp, this.type, this.geoipLat, this.geoipLon].join("|") }, setDescByGeocoding: function(i) { this._geocode(function(k) { if (!k) { return i() } var m = k.text; if (k.context && k.context.length) { for (var j = 0; j < k.context.length; j++) { if (k.context[j].id.match(/(neighborhood|locality|place)/)) { m = k.context[j].text; break } } } this.set("desc", m);
                i() }.bind(this)) }, _fromString: function(o) { var n = o.split("|"); if (n.length !== 4 && n.length !== 7) { return null } var j = this._isValidLocationType(n[4]) ? n[4] : a; var k = null; var m = null; if (j === h) { k = n[5] ? parseFloat(n[5]) : null;
                m = n[6] ? parseFloat(n[6]) : null; if (!this._isValidLatLon(k, m)) { k = null;
                    m = null } } var i = { lat: parseFloat(n[0]), lon: parseFloat(n[1]), desc: n[2], timestamp: parseInt(n[3], 10), type: j, geoipLat: k, geoipLon: m }; return i }, _isValidLatLon: function(i, j) { return !!(typeof i === "number" && typeof j === "number" && !isNaN(i) && !isNaN(j)) }, _isValidLocationType: function(i) { return [g, h, a].indexOf(i) !== -1 }, _geocode: function(i) { var j = encodeURIComponent(this.lon + ", " + this.lat);
            $.ajax({ url: "/local.js?ha=1&q=" + j, dataType: "jsonp", success: function(k) { if (!k || !k.features || !k.features.length) { return i() } i(k.features[0]) }, error: function() { i() } }) } }) }(DDG);
! function(f) { var e = f.Models.Base,
        i = true,
        h = 10000,
        c = 600000,
        b = 3,
        g = 1,
        a = "kar";
    f.Models.UserLocator = function(m) { e.call(this, m);
        this.userLocation = new f.Models.UserLocation();
        this.errorGettingLocation = false;
        this.waitingForLocation = false;
        this._retries = 0;
        this._checkedForUpdate = false;
        this._waitTimeout = null; if (!f.settings.isDefault(a)) { var k = f.settings.get(a); var j = new f.Models.UserLocation(k); if (j.isValid()) { if (!j.desc) { j.setDescByGeocoding(function() { this.setLocation(j) }.bind(this)) } this.setLocation(j, false) } } };
    f.Models.UserLocator.prototype = $.extend({}, e.prototype, { canGetLocation: function() { var j = f.device.isAndroid && f.device.isDDGApp; return !!(w.rpl && !j && w.navigator && w.navigator.geolocation && w.navigator.geolocation.getCurrentPosition) }, hasLocation: function() { return w.rpl && this.userLocation.isValid() }, updateLocation: function(k, j) { k = k || {}; if (!this.canGetLocation() || this.userLocation.type !== f.Models.UserLocation.PRECISE_LOCATION || (!k.force && this._checkedForUpdate) || (!k.force && this.userLocation.isValid() && !this.userLocation.isExpired())) { j && j(); return } if (!k.retry) { f.pixel.fire("lupd", k.updateType) } this._stopWaitTimeout();
            this._waitTimeout = w.setTimeout(function() { this._waitTimeout = null;
                this.set("waitingForLocation", true);
                this.set("errorGettingLocation", false);
                this.set("lastUpdateType", k.updateType || "na") }.bind(this), 150);
            w.navigator.geolocation.getCurrentPosition(function(o) { if (!this._waitTimeout && !this.waitingForLocation) { j && j(); return } this._stopWaitTimeout(); var n = new f.Models.UserLocation({ lat: o.coords.latitude, lon: o.coords.longitude });
                this._checkedForUpdate = true;
                this.set("errorGettingLocation", false);
                this.set("waitingForLocation", false); var m = this.setLocation(n);
                f.pixel.fire("lups", k.updateType, { d: m });
                j && j() }.bind(this), function(m) { if (!this._waitTimeout && !this.waitingForLocation) { j && j(); return } this._stopWaitTimeout(); if ((m.code === 3 || m.code === 2) && this._retries <= b) { this._retries += 1;
                    k.retry = true;
                    this.updateLocation(k, j); return } this._checkedForUpdate = true;
                this.set("errorGettingLocation", m.code);
                this.set("waitingForLocation", false);
                f.pixel.fire("lupe", k.updateType, m.code);
                j && j() }.bind(this), { enableHighAccuracy: (this._retries ? false : i), timeout: h, maximumAge: (this._retries ? c * 6 : c) }) }, cancelLocation: function() { this._stopWaitTimeout();
            this.set("waitingForLocation", false);
            this.set("errorGettingLocation", false) }, clearLocation: function() { this._stopWaitTimeout();
            this.set("userLocation", new f.Models.UserLocation());
            this.set("errorGettingLocation", false);
            this.set("waitingForLocation", false);
            f.settings.clear(a, { saveToCookie: true, saveToCloud: false });
            this.emit("meaningfulUserLocationChange") }, _stopWaitTimeout: function() { if (this._waitTimeout) { w.clearTimeout(this._waitTimeout);
                this._waitTimeout = null } }, setGeoIPLocation: function(j) { if (!j || j.type !== f.Models.UserLocation.GEOIP_LOCATION || !j.isValid()) { return } this.geoipLocation = j; if (this.hasLocation() && this.userLocation.type === DDG.Models.UserLocation.MANUAL_LOCATION && this.geoipLocation.lat !== this.userLocation.geoipLat && this.geoipLocation.lon !== this.userLocation.geoipLon) { f.pixel.fire("lmgc") } }, setLocation: function(k, j) { j = typeof j === "undefined" ? true : j; var m = 0; if (!this.userLocation.isSameAs(k)) { m = f.geo.distance(this.userLocation, k);
                this.set("userLocation", k) } if (j) { f.settings.set(a, this.userLocation.toString(), { saveToCookie: true, saveToCloud: false }) } if (m && m > g) { this.emit("meaningfulUserLocationChange", m) } return m } });
    f.userLocator = new f.Models.UserLocator() }(DDG);
! function(e) { var c = e.Models.Base,
        b = 4,
        a = 2;
    e.Models.ModuleImageHeader = function(f) { f = f || {};
        this.images = f.images || [];
        this.loadMoreImages = f.loadMoreImages || false;
        this.maxNumberOfImages = e.device.widthBreakpoint() === "xs" ? a : b; if (this.loadMoreImages) { this.numberOfImages = this.maxNumberOfImages } else { if (this.images && this.images.length) { this.numberOfImages = this.images.length > this.maxNumberOfImages ? this.maxNumberOfImages : this.images.length } } this.layout = f.layout || this._getLayout();
        c.call(this, f); if (this.loadMoreImages && this.images.length < this.maxNumberOfImages) { this.imagesModel = e.duckbar.tabs.images.model;
            this.bindEvents([
                [this.imagesModel, "change:items", this._updateImages],
                [this.imagesModel, "change:failed", this._updateImages]
            ]);
            this.imagesModel.loadDeferred() } };
    e.Models.ModuleImageHeader.prototype = $.extend({}, c.prototype, { _getLayout: function() { var f = {};
            f["layout_" + this.numberOfImages] = true; return f }, _updateImages: function(f) { if (!this.imagesModel.items.length || this._loadedImages) { return } this._loadedImages = true; var g = this.maxNumberOfImages - this.images.length; for (var h = 0; h < g; h++) { this.images.push({ url: this.imagesModel.items[h].thumbnail }) } this.set("imagesLoaded", true) } }) }(DDG);
! function(b) { var a = b.Models.Base;
    b.Models.ResultSnippet = function(c) { a.call(this, c); if (c.text) { this.organicResultSnippet = c.text } else { this.organicResultSnippet = this.item.a } this.snippets = [this.organicResultSnippet];
        this._appendAdExtensions(); if (this.isAd) { this.href = this.item.c; if (window.kn && window.kn === "1" && this.href.indexOf("http") !== -1) { this.targetBlank = true } } else { if (this.organicResultSnippet.match(/^[A-Z][a-z][a-z]\s[0-9]+?,\s[0-9]+\s·\s/)) { this.organicResultSnippet = this.organicResultSnippet.replace(/^([A-Z][a-z][a-z]\s[0-9]+?,\s[0-9]+\s·)/, '<span class="result__date">$1</span>') } } };
    b.Models.ResultSnippet.prototype = $.extend({}, a.prototype, { _appendAdExtensions: function() { if (this.showExtensionData && this.item.ae) { if (this.item.ae.annotation) { this.snippets.push(this.item.ae.annotation);
                    this.hasAnnotation = true } if (this.item.ae.callout) { this.snippets.push(this.item.ae.callout.join(" &#183; "));
                    this.hasCallout = true } } } }) }(DDG);
! function(b) { var a = b.Models.Base;
    b.Models.ResultExtras = function(h) { a.call(this, h); var c = this.item.c,
            g = this.item.d,
            k = this.item.i,
            f = this._splitUrl(c, g),
            j = b.settings.get("kn");
        this.link = $.extend({}, f, { href: c, prefix: f.protocol === "https" ? f.protocol + "://" : null, targetBlank: this._openInNewWindow(j, c) }); if (k !== "") { var e = b.get_query_encoded(),
                i = b.settings.get("kf");
            this.icon = { hide: i === "-1", imageUrl: this._getImageUrl(k), siteSearchUrl: this._getSiteSearchUrl(e, f.domain), lazyLoad: b.deep.pageNumber === 1, title: this._getTitle(this.isAd, g) } } };
    b.Models.ResultExtras.prototype = $.extend({}, a.prototype, { _splitUrl: function(c, f) { c = c || "";
            f = f || "";
            f = f.split("/"); var e = { protocol: c.indexOf("https") !== -1 ? "https" : "http", domain: f.shift() || "", path: f.join("/") || "" }; return e }, _openInNewWindow: function(e, c) { if (!e) { return false } return e === "1" && c.indexOf("http") !== -1 }, _getImageUrl: function(e) { var c = ""; if (typeof e === "string" && e.indexOf("http") === 0) { c = DDG.getImageProxyURL(e) } else { c = DDG.get_favicon_url(e) } return c }, _getSiteSearchUrl: function(e, f) { var c = "/?q=" + e; if (!b.search.isSiteQuery) { c += "+site:" + f } if (window.kurl) { c += kurl } return c }, _getTitle: function(c, f) { if (c) { return "" } var e = f,
                g = l("Search domain %s", e); return g } }) }(DDG);
! function(e) { var c = e.Views.Base,
        a = "has-ad",
        b = "has-ad--sitelinks";
    e.Views.Ads = function(f) { c.call(this, f);
        this.bindEvents([
            [this.model, "change:ads", this._updateHeight],
            [this.model, "change:defaultAds", this._updateHeight],
            [this.model, "change:pendingAds", this._updateHeight]
        ]) };
    e.Views.Ads.prototype = $.extend({}, c.prototype, { show: function() { this.$el.toggleClass(a, this.model.hasAds()) }, fallbackToDefault: function() { if (this.model.isBlocked() || this.model.ads.length) { return } var f = this.model.getAds(); if (f && f.length) { this.$el.addClass(this.HAS_AD);
                nrn("a", f) } else { if (this.$el.hasClass(this.HAS_AD)) { this.$el.removeClass(this.HAS_AD) } } }, _updateHeight: function() { if (this.model.isBlocked() || this.model.rightRailBoth) { return } this.show();
            this.$el.toggleClass(b, this.model.hasSiteLinks()) }, _onLinkClick: function(f) { adClick(this.source) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.AdSitelinks = function(c) { this.$organicResultContainer = $(c.organicResultContainer);
        a.call(this, c) };
    b.Views.AdSitelinks.prototype = $.extend({}, a.prototype, { _render: function() { this.$parent.append($(this.model.getSitelinkHtml())); if (this.model.hasSitelinkDescriptions) { this.$organicResultContainer.attr("data-sld", true) } this.$parent.find("a.sponsored__sitelink").click(function(c) { adClick(this.model.source, this.$organicResultContainer, c); return nrl(c, c.currentTarget) }.bind(this)) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.ResultSnippet = function(c) { this.template = (c.model.isAd) ? "result_snippet_ad" : "result_snippet";
        a.call(this, c); if (c.model.isAd) { this.$el.find("a").click(function(f) { window.adClick(c.model.item.s, c.parentDiv, f); return window.nrl(f, this) }) } };
    b.Views.ResultSnippet.prototype = $.extend({}, a.prototype, {}) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.ResultExtras = function(c) { this.template = (c.model.isAd) ? "result_extras_ad" : "result_extras";
        this.parentDiv = c.parentDiv;
        this.titleLockIcon = c.titleLockIcon;
        a.call(this, c) };
    b.Views.ResultExtras.prototype = $.extend({}, a.prototype, { _enroll: function() { if (this.model.isAd) { return false } var c = $(this.parentDiv);
            this.demexp = DDG.searchExperiments.demexp && DDG.searchExperiments.demexp.activeGroup; if (this.demexp && this.demexp !== "a") { c.addClass("http"); if (this.model.link.protocol === "http") { c.addClass(this.demexp);
                    this.template = "result_extras_unencrypted";
                    this.model.link.prefix = "http://"; if (this.demexp === "c" || this.demexp === "e") { this.model.icon = false } } } }, _render: function(c) { var e = $(this.parentDiv);
            e.data("protocol", this.model.link.protocol);
            this._enroll();
            a.prototype._render.call(this, $.extend({}, c, { icon: this.model.icon, link: this.model.link }));
            this._cacheElems(".js-result-extras", ["site_search", "icon", "tooltip", "url", "url-tooltip", "close"]);
            this.bindEvents([
                [this.$site_search, "click", this._onIconClick],
                [this.$url, "click", this._onUrlClick],
                [this.$close, "click", this._onCloseClick]
            ]); if (this.demexp && this.demexp !== "a") { if (this.$icon.length) { this.bindEvents([
                        [this.$icon, "click", this._onLockClick],
                        [this.$icon, "mouseenter", this._showTooltip],
                        [this.$icon, "mouseleave", this._hideTooltip]
                    ]) } if (this.titleLockIcon) { this.bindEvents([
                        [this.titleLockIcon, "click", this._onLockClick],
                        [this.titleLockIcon, "mouseenter", this._showTooltip],
                        [this.titleLockIcon, "mouseleave", this._hideTooltip]
                    ]) } if (!DDG.device.isMobileDevice) { this.bindEvents([
                        [this.$url, "mouseenter", this._showTooltip],
                        [this.$url, "mouseleave", this._hideTooltip]
                    ]) } } }, _onIconClick: function(c) { window.fl = 1 }, _wrapLinks: function() { $.noop() }, _showTooltip: function() { var c = this.$tooltip.length ? this.$tooltip : this.$urltooltip;
            c.addClass("is-showing");
            b.pixel.fire("dem", { t: "d" });
            this._showingTooltip = true; if (b.device.isMobile) { b.$doc.on("click.http-tooltip", this._hideTooltip.bind(this)) } }, _hideTooltip: function() { var c = this.$tooltip.length ? this.$tooltip : this.$urltooltip;
            c.removeClass("is-showing");
            this._showingTooltip = false; if (b.device.isMobile) { b.$doc.off("click.http-tooltip") } }, _onUrlClick: function(f) { if (DDG.device.isMobileDevice && this.demexp && this.demexp !== "a") { if (!this._showingTooltip) { f.preventDefault();
                    f.stopPropagation();
                    this._showTooltip(); return } this._hideTooltip() } var c = this.$url[0]; if (this.model.isAd) { window.adClick(this.model.item.s, this.parentDiv, f) } else { window.organicClick(this.parentDiv, f) } return window.nrl(f, c) }, _onLockClick: function(c) { c.stopPropagation(); if (!this._showingTooltip) { this._showTooltip() } else { this._hideTooltip() } }, _onCloseClick: function(c) { c.stopPropagation();
            c.preventDefault();
            this._hideTooltip() } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.SERPMessages = function(c) { this.ads = c.ads;
        this.searchbar = c.searchbar;
        this._pendingMessages = [];
        a.call(this, c); if (c.messages.spelling) { this.showMessage("spelling", c.messages.spelling) } if (c.messages.safeSearch) { this.showMessage("safeSearch") } if (c.messages.siteSearch) { this.showMessage("siteSearch") } };
    b.Views.SERPMessages.prototype = $.extend({}, a.prototype, { isReady: false, ready: function() { this.isReady = true;
            this._pendingMessages.forEach(function(c) { this.showMessage(c[0], c[1]) }.bind(this));
            this._pendingMessages = [] }, showMessage: function(e, c) { if (!this.isReady) { return this._pendingMessages.push([e, c]) } if (e === "spelling") { this._showSpellingMessage(c) } else { if (e === "safeSearch") { this._showSafeSearchMessage() } else { if (e === "siteSearch" && !this._showingMessage) { this._showSiteSearchMessage() } } } }, _showSafeSearchMessage: function() { if (b.page.isSafeDDG || !b.settings.safeSearch.isStrict()) { return } if (this.$safeSearch) { return } var c = b.deep.getResultCount() ? 1 : 0;
            this.$safeSearch = b.exec_template("safe_search", { noResults: !c, searchTerm: "<b>" + rqd + "</b>" });
            this.$el.prepend(this.$safeSearch);
            this.$(".js-safe-search-temp").on("click", function(f) { f.preventDefault();
                b.pixel.fire("sss", "m", { v: -1, p: 0, r: c });
                b.settings.safeSearch.setTemporaryId("-1", function() { b.search.requery() }) });
            this.$(".js-safe-search-perm").on("click", function(f) { f.preventDefault();
                b.pixel.fire("sss", "m", { v: -1, p: 1, r: c });
                b.settings.safeSearch.setId("-1", function() { b.search.requery() }) });
            this._showingMessage = true;
            b.page.showingSafeSearch = 1;
            b.pixel.fire("ssi", { r: c }); if (!c) { DDG.deep.hideNoResults = true } }, _showSiteSearchMessage: function() { if (this.$siteSearch || !b.deep.getResultCount()) { return } var e = sfq,
                c = b.search.getSiteQuery(e); if (c.sites.length) { this.$siteSearch = DDG.$exec_template("site_query", { queryEncoded: encodeURIComponent(c.query), isExcluding: c.isExcluding, hasMultipleSites: c.sites.length > 1, sites: c.sites, forceBreak: b.device.isMobile && c.sites.length > 1 });
                this.$el.append(this.$siteSearch);
                this._showingMessage = true } }, _showSpellingMessage: function(c) { if (this.$safeSearch || this.$spelling || !b.search.spelling.isValidType()) { return } this.$spelling = new b.Views.SpellingMessage({ appendTo: this.$el.selector, model: b.search.spelling }) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.SpellingMessage = function(c) { this.model = c.model;
        this.ia = c.ia;
        a.call(this, c) };
    b.Views.SpellingMessage.prototype = $.extend({}, a.prototype, { template: "spelling_", _render: function(c) { this.template += this.model.type;
            a.prototype._render.call(this);
            this._showSpellingMessage() }, _showSpellingMessage: function() { b.pixel.fire("spd", this.model.type); if (this.model.type === "nmrc") { this.$el.find(".js-spelling-suggestion-link").html(this.model.suggestion) } else { this.$el.find(".js-spelling-suggestion-link").attr({ href: this.model.makeSpellingURL(this.model.link, false, this.ia), "data-query": this.model.query }).html(this.model.suggestion).click(this._onSpellingLinkClick.bind(this, this.model.query)) } this.$el.find(".js-spelling-recourse-link").attr({ href: this.model.makeSpellingURL(this.model.recourseLink, true, this.ia), "data-query": this.model.recourseQuery }).html(this.model.recourseText).click(this._onSpellingLinkClick.bind(this, this.model.recourseQuery)) }, _onSpellingLinkClick: function(c, f) { DDG.pixel.fire("sp", this.model.type); if (!b.settings.isDefault("kg")) { f.preventDefault();
                b.page.searchbar.updateQuery(c) } } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.TwitterEasterEgg = function(c) { this.username = c.username;
        a.call(this, c);
        this._fetchImage() };
    b.Views.TwitterEasterEgg.prototype = $.extend({}, a.prototype, { _fetchImage: function() { $.ajax({ url: "/tw.js?o=json&user=" + this.username, dataType: "json", success: function(c) { this.image = c && c.profile_image;
                    this._renderEasterEgg() }.bind(this) }) }, _renderEasterEgg: function() { if (!this.image) { return } this.$el.append(b.exec_template("twitter_easter_egg", { image: this.image }));
            this._cacheElems(".js-logo", ["ddg", "praise", "avatar"]);
            this.$el.attr("href", "/spread");
            setTimeout(this._animate.bind(this), 1000) }, _animate: function() { this.$ddg.hide();
            this.$praise.show();
            setTimeout(function() { this.$praise.hide();
                this.$avatar.show() }.bind(this), 1000);
            setTimeout(function() { this.$avatar.hide();
                this.$ddg.show() }.bind(this), 3000) } }) }(DDG);
! function(c) { var b = c.Views.Base,
        e = "set-header--floating",
        a = 20;
    c.Views.Header = function(f) { b.call(this, f);
        this.views.headerLinks = new c.Views.HeaderLinks({ appendTo: ".js-header-aside" }); if (this.model.showWelcomeMessage) { this.views.welcomeMessage = new c.Views.WelcomeMessage({ appendTo: ".js-welcome-wrap", model: this.model }) } this.bindEvents([
            [c.device, "scroll", this._onScroll]
        ]) };
    c.Views.Header.prototype = $.extend({}, b.prototype, { _onScroll: function(f) { this.model.updateScrollPosition(c.device.scrollTop()); if (this.model.scrolledToTop) { this._reset(); return } if (this.model.scrolledPastHeader) { this.views.headerLinks.hide() } if (this.model.scrolledPastHeaderThreshold && !c.hasClass(this.$el[0].id, e)) { this._updateHeaderPosition();
                setTimeout(function() { c.addClass(this.$el[0].id, c.$html, e) }.bind(this), a) } if (this.model.canUpdateHeaderPosition) { this._updateHeaderPosition() } }, _updateHeaderPosition: function() { this.$el.css("top", this.model.newHeaderPosition) }, _reset: function() { this.$el.css("top", 0);
            c.removeClass(this.$el[0].id, c.$html, e) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Footer = function(c) { a.call(this, c);
        this._cacheElems(".js-footer", ["card", "link"]);
        this.bindEvents([
            [this.$card, "click", this._onItemClick],
            [this.$link, "click", this._onItemClick],
            [this.model, "change:visible", this._show]
        ]); if (b.settings.isDefault("kav")) { this.model.set("visible", true) } };
    b.Views.Footer.prototype = $.extend({}, a.prototype, { template: (b.device.isDesktop) ? "footer" : "footer_mobile", _show: function() { if (this._showingFooter) { return } b.$html.addClass("has-footer");
            this._setContentMinHeight();
            this.$el.show();
            b.device.on("resize", this._setContentMinHeight.bind(this));
            this._showingFooter = true }, _onItemClick: function(f) { var c = $(f.currentTarget); var g = c.data("id");
            b.pixel.fire("fic", g, { ic: +(c.hasClass("footer__card")) }) }, _setContentMinHeight: function() { this.$after.css("min-height", b.device.height) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.ClickableItem = function(c) { a.call(this, c) };
    b.Views.ClickableItem.prototype = $.extend({}, a.prototype, { _render: function(c) { a.prototype._render.call(this, c);
            this.bindEvents([
                [this.$el, "click", this._onClick],
                [this.$el, "mousedown", this._onMouseDown]
            ]) }, _onMouseDown: function(f) { if ($(f.target).is("a")) { return } f.stopPropagation(); var g = 0; if (b.device.isIE && (nkdc(f) || nkdm(f))) { g = 1 } var h = f.which && f.which == 2; var c = f.which && f.which == 3; if (g || h || c) { fm = 1; if (!c) { this._onClick(f, 1) } } else { fm = 0 } }, _onClick: function(g, f) { g.stopPropagation();
            this.answer.engaged(); var c; if (g.target && g.target.nodeName === "A") { c = g.target } else { c = this.$el[0];
                c.href = this.$el.attr("data-link") } if (c.href) { b.history.set({ iai: this.answer.getQuerystringItemId(this.model) }, function() { if (!DDG.isInternalURL(c.href)) { this.answer.clickedExternalLink({}, g) } nrg(null, null, g, f, c) }.bind(this)); return g.preventDefault() } this.model.select() }, _onExternalLinkClick: function(c) { c.stopPropagation();
            this.answer.engaged();
            this.answer.clickedExternalLink({}, c); if (c.ctrlKey) { b.history.set({ iai: this.answer.getQuerystringItemId(this.model) }); return a.prototype._onExternalLinkClick.call(this, c) } b.history.set({ iai: this.answer.getQuerystringItemId(this.model), pn: this.model.pageNo }, function() { a.prototype._onExternalLinkClick.call(this, c) }.bind(this)) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.ModuleImageHeader = function(e) { this.answer = e.answer;
        this.model = new b.Models.ModuleImageHeader({ images: this._getImages(e.model), loadMoreImages: this.answer.nameId === "about" });
        this.model.imageURL = e.model.imageURL; var c = $.extend(true, {}, e);
        c.model = this.model;
        a.call(this, c);
        this.bindEvents([
            [this.model, "change:imagesLoaded", this._onImagesLoaded]
        ]) };
    b.Views.ModuleImageHeader.prototype = $.extend({}, a.prototype, { template: "module_image_header", _render: function(c) { a.prototype._render.call(this, this.model);
            this.bindEvents([
                [this.$el, "click", this._onClick]
            ]) }, _getImages: function(f) { var c = []; var e = f.image || f.imageURL; if (e) { c.push({ url: e }) } if (f.thumbnails) { for (var g = 0; g < f.thumbnails.length; g++) { c.push({ url: f.thumbnails[g] }) } } return c }, _onImagesLoaded: function() { this._rerender() }, _onClick: function(c) { if (this.answer.nameId === "about") { c.preventDefault();
                b.duckbar.open("images");
                this.answer.set("isMapExpanded", false) } } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.WebAttribution = function(c) { a.call(this, c) };
    b.Views.WebAttribution.prototype = $.extend({}, a.prototype, { template: "web_attribution", _render: function(c) { a.prototype._render.call(this, { src: this.model.getAttributionSource() }) } }) }(DDG);
! function(c) { var a = c.Views.Base,
        b = 160;
    c.Views.NoResults = function(e) { this.vertical = e.vertical || "web";
        this.resultType = e.resultType || l("Results");
        a.call(this, e) };
    c.Views.NoResults.prototype = $.extend({}, a.prototype, { template: "no_results", show: function() { this.$el.removeClass("is-hidden") }, hide: function() { this.$el.addClass("is-hidden") }, _render: function() { var h = (!c.deep.bn || c.deep.bn.ivc) ? 1 : 0,
                g = (c.deep.bn && c.deep.bn.ibc) ? 1 : 0,
                f = c.deep.is506 && Math.random() < 0.1,
                e = !c.history.get("norrc") && (!h || f);
            a.prototype._render.call(this, { query: rqd, resultType: this.resultType.toLowerCase(), showWebLink: (this.vertical !== "web"), showRetryMessage: e, minHeight: c.device.height - b });
            this._pixelData = { r: e ? 1 : 0, i506: c.deep.is506 ? 1 : 0, ivc: h, ibc: g, irt: c.history.get("norrc") ? 1 : 0, v: this.vertical };
            c.pixel.fire("nor", this._pixelData);
            this.bindEvents([
                [".js-no-results-retry", "click", this._onRetryClick],
                [".js-no-results-web", "click", this._onWebClick]
            ]) }, _onRetryClick: function() { this._pixelData.age = c.vqd.age();
            c.pixel.fire("norrc", this._pixelData);
            c.history.set("norrc", 1);
            setTimeout(function() { window.location.reload() }, 250) }, _onWebClick: function(f) { f.preventDefault();
            c.pixel.fire("norwc", this._pixelData);
            c.duckbar.open("web") } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.RelatedSearches = function(c) { a.call(this, c) };
    b.Views.RelatedSearches.prototype = $.extend({}, a.prototype, { template: "related_searches", _render: function(c) { c.related = this.model.related.map(function(e) { return { text: e, url: "/?q=" + encodeURIComponent(e) + (kurl ? kurl : "") } });
            a.prototype._render.call(this, c);
            this.bindEvents([
                [".js-related-searches-link", "click", this._onRelatedSearchClick]
            ]);
            this._pixelParams = { r: this.model.getResultCount(), l: this.model.related.length };
            b.pixel.fire("reli", this._pixelParams) }, _onRelatedSearchClick: function(c) { b.pixel.fire("relc", this._pixelParams) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.WelcomeMessage = function(c) { this.model = c.model;
        a.call(this, c);
        b.pixel.fire("wcmi") };
    b.Views.WelcomeMessage.prototype = $.extend({}, a.prototype, { template: "welcome_message", _render: function(e) { var c = b.opensearch.installed.variant;
            $("html").addClass("has-welcome-message has-welcome-message--" + c); if (c === "c") { e.inlineIllustration = true } else { if (c === "d") { setTimeout(function() { this.$parent.addClass("is-showing") }.bind(this), 1000) } } a.prototype._render.call(this, e);
            this._cacheElems(".js-welcome", ["dismiss"]);
            this.bindEvents([
                [this.$dismiss, "click", this._onDismissClick]
            ]) }, _onDismissClick: function(c) { c.preventDefault();
            b.pixel.fire("wcmd");
            b.settings.clear("kaz");
            this.model.set("showWelcomeMessage");
            $("html").removeClass("has-welcome-message");
            this.$el.hide() } }) }(DDG);
! function(f) { var b = f.Views.Base,
        e = f.Views.AnswerBar.Meta,
        c = 44,
        a = { expandModeIcon: "G", exitModeIcon: "×", minTopicsForMenu: 3 };
    e.MetaBar = function(h) { if (h.heading) { h.primaryText = h.heading } if (h.altMeta) { h.secondaryText = h.altMeta } $.extend(this, a, h);
        this.parent = h.parent;
        this.notFixed = h.notFixed;
        this.showParams = this.model.parameters && this.model.parameters.length;
        this.showSources = this.model.sources && this.model.sources.values.length > 1;
        b.call(this, h); var g = this.model;
        this.bindEvents([
            [g, "change:items", this._onItemsChanged],
            [g, "change:expanded", this._onExpandedChanged],
            [g, "change:canExpand", this._onExpandedChanged],
            [g, "change:topics", this._createTopicMenu],
            [f.device, "scroll", this._onScroll]
        ]) };
    e.MetaBar.prototype = $.extend({}, b.prototype, { template: "metabar", show: function() { this.$el.removeClass("is-hidden");
            this._height = this.$el.outerHeight(true) }, hide: function() { this.$el.addClass("is-hidden") }, getHeight: function() { return c }, isStuck: function() { return DDG.hasClass(this.id, "is-stuck") }, _render: function() { b.prototype._render.call(this, $.extend({}, { showMoreAt: this.sourceName, showDropdowns: this.showParams || this.showSources, searchTerm: this.model.query, itemType: l("Results") }, this)); if (Modernizr.touch || is_mobile) { this.$el.removeClass("metabar--fixed").addClass("metabar--unsticky") } this._cacheElems(".js-metabar", ["primary", "loading", "mode", "dropdowns"]);
            this.$mode.on("click", this._onModeClick.bind(this));
            this._updateMode();
            this._updateLoadingState();
            this._createTopicMenu();
            this._createAttribution();
            this._createSourceDropdown();
            this._createParameterDropdowns(); if (this.linkPrimaryText) { this.$primary.addClass("metabar__primary-text--linked");
                this.$primary.on("click", this._onModeClick.bind(this)) } }, _createTopicMenu: function() { var g = this.views,
                h = this.model,
                i = this.model.topics; if (!g.topicMenu && i.length && i.length >= this.minTopicsForMenu) { g.topicMenu = new f.Views.AnswerBar.Meta.TopicMenu({ model: h, appendTo: this.$(".js-metabar") });
                this.$primary.hide() } }, _createAttribution: function() { if (!this.model.meta.hasAttribution() || this.model.meta.hideAttribution) { return false } var g = this.$(".js-attribution");
            this.views.attribution = new f.Views.Attribution({ answer: this.model, direction: this.sourceName ? "bottom" : "bottom-left", appendTo: g });
            g.removeClass("is-hidden") }, _createParameterDropdowns: function() { if (!this.showParams) { return } this.views.parameters = new f.Views.Dropdowns.FilterContainer({ $el: this.$dropdowns, answer: this.model }) }, _createSourceDropdown: function() { if (!this.showSources) { return } this.views.source = new e.FilterDropdown({ model: this.model.sources, answer: this.model, appendTo: this.$dropdowns }) }, _updateLoadingState: function() { if (!this._isLoaded && this.model.items.length) { this.$loading.hide();
                this.$primary.removeClass("is-loading");
                this.$dropdowns.removeClass("is-loading");
                this._isLoaded = true } }, _updateMode: function() { var r = this,
                i = r.model,
                j = i.expanded,
                h = r.$mode,
                k = f.device.isMobile,
                q = i.meta,
                g = r.exitModeIcon,
                m = function() { if (q.useExpandTextButton()) { h.removeClass("btn--icon");
                        h.addClass("metabar__grid-btn");
                        h.text(l("More " + r.model.name)) } else { h.addClass("btn--icon");
                        h.removeClass("metabar__grid-btn");
                        h.text(r.expandModeIcon) } },
                p = function() { r._modeSwitchEnabled = true;
                    h.removeClass("is-disabled");
                    h.removeClass("btn--icon");
                    h.addClass("metabar__grid-btn");
                    h.text(g);
                    h.attr("title", l("Click to collapse")) },
                o = function() { r._modeSwitchEnabled = true;
                    h.removeClass("is-disabled");
                    m();
                    h.attr("title", l("Click to expand")) },
                n = function() { r._modeSwitchEnabled = false;
                    h.addClass("is-disabled");
                    m();
                    h.attr("title", l("Grid mode disabled for this answer")) }; if (q.hideModeSwitch) { h.addClass("is-hidden") } else { if (k || j) { p() } else { if (i.canExpand) { o() } else { n() } } } }, _onScroll: function() { if (Modernizr.touch || f.device.isMobile || !this.parent || !this.model.active || this.notFixed) { return } var n = DDG.hasClass(this.id, "is-stuck"),
                g = DDG.hasClass(this.id, "at-bottom"); if (!this.model.expanded) { if (n) { DDG.removeClass(this.id, this.$el, "is-stuck");
                    this.emit("stuck", false) } if (g) { DDG.removeClass(this.id, this.$el, "at-bottom") } return } var k = f.device.scrollTop(),
                m = this.parent.getHeight(),
                j = 0,
                i = m - c,
                h = DDG.get_header_height();
            j += !DDG.isHeaderFixed ? h : 0;
            i += j; if (k > j && !n) { DDG.addClass(this.id, this.$el, "is-stuck");
                this.emit("stuck", true) } else { if (k <= j && n) { DDG.removeClass(this.id, this.$el, "is-stuck");
                    this.emit("stuck", false) } } if (!g && k > i) { DDG.addClass(this.id, this.$el, "at-bottom") } else { if (g && k < i) { DDG.removeClass(this.id, this.$el, "at-bottom") } } }, _onModeClick: function(g) { g.preventDefault();
            g.stopPropagation(); if (!this._modeSwitchEnabled) { return } if (f.device.isMobile) { return this.emit("close") } this.model.set("expanded", !this.model.expanded);
            this.model.engaged();
            this.model.fire("iacg", { ex: this.model.expanded ? 1 : 0 }) }, _onItemsChanged: function() { this._updateLoadingState();
            this._updateMode() }, _onExpandedChanged: function() { this._updateMode() }, _onExternalLinkClick: function(g) { this.model.clickedExternalLink();
            b.prototype._onExternalLinkClick.call(this, g) } }) }(DDG);
! function(c) { var a = c.Views.Base,
        b = c.Views.AnswerBar.Meta;
    b.TopicMenu = function(e) { this.views = { topics: {} };
        a.call(this, e);
        this.bindEvents([
            [this.model, "change:topics", this._updateTopics],
            [this.model, "change:selectedTopic", this._onSelectedTopicChanged]
        ]) };
    b.TopicMenu.prototype = $.extend({}, a.prototype, { template: "topic_menu", destroy: function() { a.prototype.destroy.call(this);
            this._removeDocHandler() }, _render: function() { a.prototype._render.call(this);
            this.$menu = this.$(".js-topic-menu");
            this._updateTopics() }, _updateTopics: function() { var h, e = this.model.topics,
                f = this.views.topics; for (var j in f) { if (!e[j]) { f[j].destroy();
                    delete f[j] } } for (var g = 0; g < e.length; g++) { h = e[g]; if (!f[h.id]) { this.views.topics[h.id] = new b.TopicMenuItem({ model: h, appendTo: this.$menu }) } } }, _addDocHandler: function() { DDG.$doc.on("click.topicmenu", this._onDocClick.bind(this));
            this._boundToDoc = 1 }, _removeDocHandler: function() { DDG.$doc.off("click.topicmenu");
            this._boundToDoc = 0 }, _onSelectedTopicChanged: function() { if (this.model.selectedTopic && !this._boundToDoc) { this._addDocHandler() } else { this._removeDocHandler() } }, _onDocClick: function() { if (this.model.selectedTopic) { this.model.selectedTopic.unselect() } } }) }(DDG);
! function(f) { var c = f.Views.Base,
        e = f.Views.AnswerBar.Meta,
        a = "is-selected",
        b = "is-highlighted";
    e.TopicMenuItem = function(g) { c.call(this, g);
        this.bindEvents([
            [this.$link, "click", this._onClick],
            [this.model, "change:highlighted", this._onHighlightedChanged],
            [this.model, "change:selected", this._onSelectedChanged],
            [this.model, "change:count", this._onCountChanged]
        ]) };
    e.TopicMenuItem.prototype = $.extend({}, c.prototype, { template: "topic_menu_item", _render: function() { c.prototype._render.call(this, this.model);
            this._cacheElems(".js-topic-menu", ["link", "count"]) }, _onHighlightedChanged: function() { this.$link.toggleClass(b, !!this.model.highlighted) }, _onSelectedChanged: function() { this.$link.toggleClass(a, !!this.model.selected) }, _onCountChanged: function() { if (this.model.hideCount) { return } this.$count.text(this.model.items.length) }, _onClick: function(g) { g.preventDefault();
            g.stopPropagation();
            this.model.select(); if ($.isFunction(this.model.engaged)) { this.model.engaged() } } }) }(DDG);
! function(c) { var a = c.Views.Dropdowns.SelectListDropdown,
        b = c.Views.AnswerBar.Meta;
    b.FilterDropdown = function(e) { e = e || {};
        e.showSelected = true;
        this.answer = e.answer;
        a.call(this, e) };
    b.FilterDropdown.prototype = $.extend({}, a.prototype, { _render: function(f) { a.prototype._render.call(this, f); var e = c.history.getComposite("iaf", this.model.key); if (e) { this.model.select(e) } }, _updateHidden: function() { var e = c.history.get("iaf"); if (e) { c.hidden.set("iaf", e) } else { c.hidden.clear("iaf") } }, _onSelectedChange: function() { var e = this.model.selected.id;
            a.prototype._onSelectedChange.call(this); if (e) { c.history.setComposite("iaf", this.model.key, e);
                this.$el.addClass("is-active") } else { c.history.clearComposite("iaf", this.model.key);
                this.$el.removeClass("is-active") } this._updateHidden() }, _onItemClick: function(f) { a.prototype._onItemClick.call(this, f);
            c.pixel.fire("iafi", this.model.key);
            this.answer.engaged();
            this.answer.requery() } }) }(DDG);
! function(c) { var a = c.Views.Base,
        b = c.Views.AnswerBar;
    b.InfoBox = function(e) { a.call(this, e);
        this.$tile = this.$(".js-infobox-tile");
        this.$expand = this.$(".js-tile-expand");
        this.$lastInfo = this.$(".info:last"); if (this.model.expanded) { this._expand() } this.bindEvents([
            [this.model, "change:expanded", this._onAnswerExpandedChanged],
            [this.model, "change:active", this._onAnswerActiveChanged],
            [this.$expand, "click", this._onExpandClick],
            ["a", "click", function() { c.pixel.fire("ibc") }],
            [c.device, "resize", this._onResize]
        ]) };
    b.InfoBox.prototype = $.extend({}, a.prototype, { template: "infobox", _expand: function() { if (!this._canExpand()) { return } this.$tile.addClass("is-open") }, _collapse: function() { if (!this._canExpand()) { return } this.$tile.removeClass("is-open") }, _canExpand: function() { if (!this.$lastInfo || typeof this._isExpandable === "boolean") { return this._isExpandable } if (this.model.expanded) { return this._isExpandable = true } var e = this.$lastInfo.position().top + this.$lastInfo.outerHeight(true),
                f = this.$tile.outerHeight(); return (this._isExpandable = e > f) }, _showHideExpandLink: function() { if (this._canExpand()) { this.$expand.removeClass("is-hidden") } else { this.$expand.addClass("is-hidden") } }, _onExpandClick: function() { this.model.set("expanded", !this.model.expanded);
            this.model.engaged();
            this.model.fire("iasm") }, _onResize: function() { delete this._isExpandable;
            this._showHideExpandLink() }, _onAnswerActiveChanged: function() { if (this.model.active) { delete this._isExpandable;
                this._showHideExpandLink() } }, _onAnswerExpandedChanged: function() { if (this.model.expanded) { this._expand() } else { this._collapse() } } }) }(DDG);
! function(e) { var c = e.Views.ClickableItem,
        f = "is-hidden",
        a = "is-selected",
        b = "highlight",
        g = 8;
    e.Views.AnswerBar.Tile = function(i) { this.answer = i.answer;
        this.noDetail = i.noDetail;
        c.call(this, i);
        this.bindEvents([
            [this.model, "change:visible", this._updateVisible],
            [this.model, "change:partiallyVisible", this._updateVisible],
            [this.model, "change:selected", this._onSelectedChanged],
            [this.model, "change:highlighted", this._onHighlightedChanged],
            [this.answer, "change:active", this._onAnswerActiveChanged],
            [this.answer, "change:expanded", this._onAnswerExpandedChanged],
            [e.device, "resize", this._onResize]
        ]); var h = this.answer.meta.rerender; if (h) { this.bindEvents(h.map(function(j) { return [this.model, "change:" + j, this._rerender] }.bind(this))) } };
    e.Views.AnswerBar.Tile.prototype = $.extend({}, c.prototype, { show: function() { this.$el.removeClass(f) }, hide: function() { this.$el.addClass(f) }, getMargins: function() { return { x: parseFloat(this.$el.css("margin-left"), 10), top: parseFloat(this.$el.css("margin-top"), 10), bottom: g } }, _render: function() { this.template = this.model.getItemTemplate();
            c.prototype._render.call(this, this.model.toTemplateObject());
            e.ImageLoader.registerAll(this.$(".js-lazyload"), this.model.id);
            e.ImageLoader.registerAll(this.$(".js-lazysvg"), this.model.id, { svg: true });
            this.$ellipsis = this.$(".js-ellipsis"); var h = this.$("a"); if (h.length) { h.on("touchstart touchend", function(i) { i.stopPropagation() }) } if (this.answer.meta.itemsHighlight !== false && !e.device.isIDevice) { this.$el.on("mouseenter", this._onMouseEnter.bind(this));
                this.$el.on("mouseleave", this._onMouseLeave.bind(this)) } this._updateEllipsis({ force: true }) }, _updateEllipsis: function(h) { h = h || {}; if (h.force) { this._hasBeenEllipsized = false } if (this._hasBeenEllipsized || !this.answer.active || !this.model.visible || !this.$ellipsis.length || e.device.isMobile) { return } this.$ellipsis.ellipsis({ id: this.model.id });
            this._hasBeenEllipsized = true }, _updateVisible: function() { if (this.model.visible || this.model.partiallyVisible) { e.ImageLoader.trigger(this.model.id);
                this._updateEllipsis() } }, _updateMargin: function() { if (e.device.isMobile) { return } var i = g; if (!this.noDetail && this.model.canShowItemDetail() && this.answer.expanded && this.model.selected) { var h = this.answer.items[this.answer.items.length - 1].gridRow; if (!h || h !== this.model.gridRow) { i *= 2 } else { i -= 1 } i += this.answer.getDetailHeight() } i += "px"; if (this._marginBottom === i) { return } this._marginBottom = i;
            this.$el.css({ marginBottom: i }) }, _rerender: function() { c.prototype._rerender.call(this);
            this._onHighlightedChanged();
            this._onSelectedChanged() }, _onHighlightedChanged: function() { this.$el.toggleClass(b, !!this.model.highlighted) }, _onSelectedChanged: function() { if (this.model.selected) { e.history.set({ iai: this.answer.getQuerystringItemId(this.model) }) } this.$el.toggleClass(a, !!this.model.selected);
            this._updateMargin() }, _onAnswerActiveChanged: function() { this._updateEllipsis() }, _onAnswerExpandedChanged: function() { this._updateMargin();
            this._updateEllipsis({ force: true }) }, _onClick: function(i, h) { if (this.answer.id === "images" || this.answer.id === "videos") { this.answer.set("expanded", 1) } this.answer.fire("iatc"); if (this.model.selected) { this.answer.engaged(); return this.model.unselect() } if (!this.noDetail && this.model.canShowItemDetail()) { i.preventDefault();
                this.answer.engaged(); return this.model.select() } return c.prototype._onClick.call(this, i, h) }, _onMouseEnter: function(h) { if (e.keyboard.active) { return } this.model.highlight() }, _onMouseLeave: function(h) { this.model.unhighlight() }, _onResize: function(h) { this._updateEllipsis({ force: true });
            this._updateMargin() }, _onExternalLinkClick: function(h) { this.answer.fire("iatc"); return c.prototype._onExternalLinkClick.call(this, h) } }) }(DDG);
! function(g) { var f = g.Views.AnswerBar.Tile,
        b = "is-loading",
        c = "is-paused",
        e = "is-unavailable",
        a, i = 0;
    g.Views.AnswerBar.AudioTile = function(j) { f.call(this, j);
        this.bindEvents([
            [g.keyboard, "space." + this.answer.id, this._onSpace]
        ]) };
    g.Views.AnswerBar.AudioTile.prototype = $.extend({}, f.prototype, { play: function() { if (i) { this.showError("Playback Unavailable"); return } this.$el.addClass(b); if (!this.$action) { this.$action = this.$(".audio-controls__action");
                this.$time = this.$(".audio-controls__time");
                this.$progress = this.$(".audio-controls__progress");
                this.$loadProgress = this.$(".audio-controls__progress-loading");
                this.$loadProgressFill = this.$(".audio-controls__progress-loading .rotated-fill");
                this.$playProgress = this.$(".audio-controls__progress-playback");
                this.$playProgressFill = this.$(".audio-controls__progress-playback .rotated-fill") } if (!a) { g.require("audio", function(j) { a = j; if (a && a.ready) { if (g.device.isIDevice || g.device.isAndroid) { this.$el.removeClass(b); return } } else { i = 1 } this.play() }.bind(this)); return } this.$el.removeClass(c);
            this.$action.text("║");
            this.isPlaying = 1;
            this.hasStartedPlaying = 0; if (this.sound) { a.play(this.model.id);
                this._onLoadProgress() } else { this.sound = a.play(this.model.id, this.model.streamURL, { autoPlay: true, whileloading: this._onLoadProgress.bind(this), whileplaying: this._onPlayProgress.bind(this), onload: this._onLoadFinished.bind(this), onfinish: this._onPlayFinished.bind(this) }) } }, pause: function() { if (!a || !a.ready) { return } a.pause(this.model.id);
            this.$el.removeClass(b);
            this.$el.addClass(c);
            this.$action.text("►");
            this.isPlaying = 0 }, stop: function() { if (!a || !a.ready) { return } a.stop(this.model.id);
            this.$el.removeClass(b);
            this.$el.removeClass(c);
            this.$action.text("►"); if (!this.$el.hasClass(e)) { this.$time.text("") } this.$loadProgress.removeClass("gt50");
            this.$playProgress.removeClass("gt50");
            h(this.$loadProgressFill, 0);
            h(this.$playProgressFill, 0);
            this.isPlaying = 0 }, showError: function(j) { this.$time.text(j);
            this.$el.addClass(e) }, _onSelectedChanged: function() { if (this.answer.meta.autoplay === false && !this._userSelected) { if (this.model.selected) { this.model.unselect() } return } f.prototype._onSelectedChanged.call(this); if (this.model.selected) { this.play() } else { this.stop() } }, _onClick: function(j) { this._userSelected = true;
            j.preventDefault();
            this.answer.fire("iatc"); if (this.model.selected) { this.isPlaying ? this.pause() : this.play() } else { this.model.select() } }, _onSpace: function(j) { this._userSelected = true; if (this.model.selected) { if (this.isPlaying) { j.preventDefault();
                    this.pause() } else { if (this.answer.active) { j.preventDefault();
                        this.play() } } } }, _onLoadProgress: function() { var j = (this.sound.bytesLoaded / this.sound.bytesTotal) * 100; if (j > 50) { this.$loadProgress.addClass("gt50"); return h(this.$loadProgressFill, 100) } h(this.$loadProgressFill, j) }, _onLoadFinished: function(j) { if (j) { return } this.showError("Stream Unavailable");
            a.stop(); if (this.answer.autoplaying) { this.answer.selectNextItem() } }, _onPlayProgress: function() { if (!this.sound || !this.model.duration) { return } if (!this.hasStartedPlaying) { this.$el.removeClass(b);
                this.hasStartedPlaying = 1 } var k = this.model.duration - this.sound.position,
                j = (this.sound.position / this.model.duration) * 100;
            this.$time.text("-" + DDG.formatDuration(k)); if (j > 50) { this.$playProgress.addClass("gt50") } h(this.$playProgressFill, j) }, _onPlayFinished: function() { this.stop(); if (this.answer.meta.autoplay !== false) { this.answer.autoplaying = 1;
                this.answer.selectNextItem() } } }); var h = function(k, m) { var j = (360 / 100 * m) + "deg";
        k.css({ "-moz-transform": "rotate(" + j + ")", "-webkit-transform": "rotate(" + j + ")", "-o-transform": "rotate(" + j + ")", transform: "rotate(" + j + ")" }) } }(DDG);
! function(e) { var c = e.Views.Base,
        g = "can-expand",
        a = "has-chomp-expanded",
        f = 200,
        b = 150;
    e.Views.AnswerBar.Detail = function(i) { this.answer = i.answer;
        this.template = i.template;
        this.canExpand = i.canExpand;
        this.canWrap = i.canWrap;
        this.hasInfobox = i.hasInfobox;
        c.call(this, i); if (this.canExpand) { this.bindEvents([
                [this.answer, "change:expanded", this._updateExpandableContent],
                [this.answer, "change:active", this._updateExpandableContent],
                [e.device, "resize", this._updateExpandableContent]
            ]) } var h = this.answer.meta.rerender; if (h) { this.bindEvents(h.map(function(j) { return [this.model, "change:" + j, this._rerender] }.bind(this))) } };
    e.Views.AnswerBar.Detail.prototype = $.extend({}, c.prototype, { _render: function(m) { var i = this.model.toTemplateObject(),
                h = $.extend({}, i, m),
                p = this.model.templates.wrap_detail,
                k = this.template; if (this.canWrap && p) { h = { content: e.exec_template(k, i) };
                this.template = p } c.prototype._render.call(this, h);
            this.template = k; var n = this.$(".js-sized-img"); if (n.length) { n.on("load error", function() { $(this).css({ height: "auto", width: "auto" }) }) } var j = this.$("img"); if (j.length) { j.error(function() { $(this).hide() }) } if (this.canExpand) { this.$expandContent = this.$(".js-ellipsis,.js-chomp"); if (this.$expandContent.length) { this.expandContent = this.$expandContent.html();
                    this.expandUseEllipsis = this.$(".js-ellipsis").length;
                    this.$expandLink = this.$(".js-chomp-link");
                    this._updateExpandableContent(); if (this.$expandLink.length) { this.$expandLink.on("click", function() { this.answer.set("expanded", !this.answer.expanded);
                            this.answer.fire("iasm") }.bind(this)) } var o = this.$(".js-detail-img"); if (o.length && !o.width()) { o.load(function() { this._updateExpandableContent() }.bind(this)) } } } }, _updateExpandableContent: function() { if (!this.answer.active || !this.expandContent) { return } this.$expandContent.html(this.expandContent);
            this._hasCode(); if (this.answer.expanded) { if (is_mobile || this.$expandContent.outerHeight() < this.$expandContent.prop("scrollHeight") - 1) { this.$expandLink.addClass(g) } this.$el.addClass(a) } else { this.$el.removeClass(a); var h; if (this.expandUseEllipsis) { h = this.$expandContent.ellipsis(this._getEllipsisOptions()) } else { if (this.$expandContent.outerHeight() < this.$expandContent.prop("scrollHeight") - 1) { h = true } } if (e.device.isMobile && this.hasInfobox) { h = true } this.$expandLink.toggleClass(g, h) } this._highlightSyntaxCheck() }, _hasCode: function() { if (this.model.meta && this.model.meta.topic) { this.isReference = this.model.meta.topic.indexOf("reference") > -1;
                this.isProgramming = this.model.meta.topic.indexOf("programming") > -1;
                this.isStackExchange = this.model.id.indexOf("stackexchange") > -1; if (this.isReference || this.isProgramming || this.isStackExchange) { this.$el.addClass("has-code") } } }, _highlightSyntaxCheck: function() { if (this.isReference || this.isProgramming) { var h = this.$el.find("pre"); if (h.length) { DDG.require("prettify", function() { h.addClass("prettyprint");
                        window.prettyPrint() }) } } }, _getEllipsisOptions: function() { var h = { firstParagraph: true }; if (this.$el.find("code").length) { h.maxHeight = f } if (this.model.parentId === "lyrics") { h.maxHeight = b } return h }, _onExternalLinkClick: function(h) { this.answer.clickedExternalLink();
            c.prototype._onExternalLinkClick.call(this, h) } }) }(DDG);
! function(c) { var b = c.Views.AnswerBar.Detail,
        e = 0.55,
        a = 500;
    c.Views.AnswerBar.ImageDetail = function(f) { this.parentPadding = f.parentPadding;
        b.call(this, f);
        this.bindEvents([
            [this.model, "change:selected", this._onSelectedChanged],
            [c.device, "resize", this._onResize]
        ]) };
    c.Views.AnswerBar.ImageDetail.prototype = $.extend({}, b.prototype, { _zoom: 1, _panX: 0, _panY: 0, setZoom: function(g, f) { this._zoom = g;
            this._updateTransform(f) }, setPan: function(f, h, g) { this._panX = f / this._zoom;
            this._panY = h / this._zoom;
            this._updateTransform(g) }, getPanDimensions: function() { return { width: this._width * this._zoom, height: this._height * this._zoom } }, _reportImage: function(f) { f.preventDefault(); if (!this.views.modal) { this.views.modal = new c.Views.ReportImageModal({ thumbnail: this.model.thumbnail, image: this.model.image }) } this.views.modal.show() }, _render: function() { b.prototype._render.call(this, { detail: this._getDimensions(), isMobile: c.device.isMobile, linkImage: !c.device.isMobile });
            this.$imgWrapper = this.$(".js-image-detail-wrapper");
            this.$transBg = this.$(".js-detail-image-bg"); if (this.model.selected) { this._onSelectedChanged() } this._cacheElems(".js-image-report", ["link"]);
            this.bindEvents([
                [this.$link, "click", this._reportImage]
            ]) }, _getDimensions: function() { var m = c.device,
                g = m.isMobile; var k = g ? m.width : m.width * e,
                j = g ? m.height : this.answer.getDetailHeight() - (this.parentPadding * 2),
                h = this.model,
                i = Math.min(h.width, k),
                f = i / h.width * h.height; if (f > j) { f = j;
                i = f / h.height * h.width } this._width = i;
            this._height = f; return { width: i + "px", height: f + "px", transBgWidth: Math.floor(i - 1) + "px", transBgHeight: Math.floor(f - 1) + "px" } }, _loadHighRes: function() { if (this.$highRes) { return } this.$highRes = this.$(".js-detail-img-high");
            this.$highRes.attr("src", c.getImageProxyURL(this.model.image_mobile || this.model.image)).css({ display: "block" }).on("load", this._onHighResLoaded.bind(this)) }, _animateTransform: function() { if (!$.Velocity) { return this._updateTransform() } this.$imgWrapper.velocity("stop").velocity({ scale: this._zoom, translateX: this._panX, translateY: this._panY }, { easing: "ease-out", duration: c.animation_speed }) }, _updateTransform: function(f) { if (f) { return this._animateTransform() } if ($.Velocity) { this.$imgWrapper.velocity("stop"); if (this._zoom) { $.Velocity.hook(this.$imgWrapper, "scale", this._zoom) } if (this._panX) { $.Velocity.hook(this.$imgWrapper, "translateX", this._panX + "px") } if (this._panY) { $.Velocity.hook(this.$imgWrapper, "translateY", this._panY + "px") } } else { var g = ""; if (this._zoom) { g += "scale(" + this._zoom + ") " } if (this._panX || this._panY) { g += "translate(" + (this._panX || 0) + "px," + (this._panY || 0) + "px) " } this.$imgWrapper.css({ transform: g, "-webkit-transform": g, "-moz-transform": g, "-ms-transform": g, "-o-transform": g }) } }, _onSelectedChanged: function() { if (this.model.selected) { this._loadHighResTimeout = setTimeout(this._loadHighRes.bind(this), c.device.isMobileDevice ? a : 0) } else { clearTimeout(this._loadHighResTimeout) } }, _onResize: function() { if (!this.$imgs) { this.$imgs = this.$(".js-detail-img") } var f = this._getDimensions();
            this.$imgs.css({ height: f.height, width: f.width });
            this.$transBg.css({ width: f.transBgWidth, height: f.transBgHeight }) }, _onHighResLoaded: function() { this.$(".js-detail-img-thumb").fadeOut() } }) }(DDG);
! function(e) { var c = e.Views.AnswerBar.Detail,
        f = 0.75,
        a = 110,
        b = 76;
    e.Views.AnswerBar.VideoDetail = function(g) { this.parentPadding = g.parentPadding;
        c.call(this, g);
        this.bindEvents([
            [this.model, "change:selected", this._updateContent],
            [e.settings, "change:k5", this._updateContent],
            [e.device, "resize", this._onResize]
        ]) };
    e.Views.AnswerBar.VideoDetail.prototype = $.extend({}, c.prototype, { template: "videos_detail", destroy: function() { clearTimeout(this._embedTimeout);
            c.prototype.destroy.call(this) }, _render: function() { c.prototype._render.call(this);
            this.$videoWrap = this.$(".js-video");
            this.$video = this.$(".js-video-media");
            this._updateSize();
            this._updateContent() }, _renderEmbed: function() { if (!this.model.selected) { return } var g = DDG.exec_template(DDG.templates.videos_detail_embed, this.model);
            this.$video.empty().append(g) }, _renderPrivacy: function() { this.views.privacy = new e.Views.AnswerBar.VideoDetailOverlay({ model: this.model, appendTo: this.$video }) }, _shouldShowPrivacy: function() { return !e.device.isMobile && this.model.selected && e.settings.isDefault("k5") }, _shouldShowEmbed: function() { return this.model.selected && e.settings.get("k5") == 1 }, _updateSize: function() { var h = e.device,
                k = h.widthBreakpoint(),
                i = h.gutterSize(),
                n = i ? i + a : this.parentPadding * 2,
                j = i ? this.parentPadding * 2 : this.parentPadding * 2 + b,
                m = h.width - n,
                o = !h.isMobileLandscape() && (k === "m" || k === "s" || k === "xs") ? m : m * f,
                p = this.answer.getDetailHeight() - j,
                r = 16 / 9,
                g = o,
                q = o / r; if (q > p) { q = p;
                g = q * r } this.$videoWrap.css({ width: g + "px" });
            this.$video.css({ height: q + "px", width: g + "px" }) }, _updateContent: function() { if (this._shouldShowPrivacy()) { this._renderPrivacy() } else { if (this._shouldShowEmbed()) { if (e.device.isMobile) { this._embedTimeout = setTimeout(this._renderEmbed.bind(this), e.animation_speed + 100) } else { this._renderEmbed() } } else { this.$video.empty() } } }, _onResize: function() { this._updateSize() } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.AnswerBar.VideoDetailOverlay = function(c) { a.call(this, c) };
    b.Views.AnswerBar.VideoDetailOverlay.prototype = $.extend({}, a.prototype, { template: "videos_detail_privacy", shouldShow: function() { return DDG.settings.isDefault("k5") }, _render: function() { a.prototype._render.call(this);
            this._cacheElems(".js-video-privacy", ["watch", "leave", "remember", "remember-label"]);
            this.bindEvents([
                [this.$watch, "click", this._onWatchClick],
                [this.$leave, "click", this._onLeaveClick],
                [this.$remember, "touchstart", this._onRememberTouchStart],
                [this.$rememberlabel, "touchstart", this._onRememberTouchStart]
            ]) }, _shouldRemember: function() { return this.$remember[0].checked }, _updateSetting: function(c) { var e = this._shouldRemember();
            DDG.settings.set("k5", c, { saveToCloud: e, saveToCookie: e }) }, _onWatchClick: function(c) { c.preventDefault();
            this._updateSetting("1");
            this.destroy() }, _onLeaveClick: function(c) { c.preventDefault();
            this._updateSetting("2");
            nug(this.model.url);
            this.destroy() }, _onRememberTouchStart: function(c) { c.stopPropagation() } }) }(DDG);
! function(e) { var b = e.Views.Base,
        g = "is-hidden",
        f = "has-open-detail",
        c = "can-scroll",
        a = { images_detail: "ImageDetail", videos_detail: "VideoDetail" },
        h = { images_detail: 1, videos_detail: 1 };
    e.Views.AnswerBar.DetailSlider = function(i) { b.call(this, i);
        this.bindEvents([
            [this.model, "change:active", this._onActiveChanged],
            [this.model, "change:selectedItem", this._onSelectedItemChanged],
            [e.device, "resize", this._onResize]
        ]) };
    e.Views.AnswerBar.DetailSlider.prototype = $.extend({}, b.prototype, { template: "detail_slider", _zoom: 1, _panX: 0, _panY: 0, _focused: false, destroy: function() { this._hide();
            b.prototype.destroy.call(this) }, position: function(i) { if (e.device.isMobile) { return } if (this._top === i) { return } this._top = i;
            this.$el.css({ top: i }) }, _show: function() { if (this._isShowing) { return } this.$el.removeClass(g);
            this._updateSelectedItem(); if (e.device.isMobile) { e.$html.addClass(f);
                this._focus() } this._isShowing = 1 }, _hide: function() { if (!this._isShowing) { return } this.$el.addClass(g); if (e.device.isMobile) { e.$html.removeClass(f) } this.gestures.reset();
            this.destroyChildViews();
            this.views = {};
            this._isShowing = 0 }, _focus: function() { this.$el.addClass("has-focus");
            this._focused = 1 }, _unfocus: function() { this.$el.removeClass("has-focus");
            this._focused = 0 }, _render: function() { var m = $.extend({}, this.model),
                i = e.device.isMobile; if (!i) { m.detailHeight = this.model.getDetailHeight() + "px" } if (i && !Modernizr.touch) { m.mobileAndNoTouch = 1 } b.prototype._render.call(this, m); var j = this.model.meta.detailOverlay; if (i && j) { this.overlayClass = e.Views.AnswerBar[j] } if (this.model.items.length) { var n = this.model.items[0],
                    k = n.getItemDetailTemplate(); if (h[k]) { this.$el.addClass("detail--xd") } } this._cacheElems(".js-detail", ["panes", "close", "next", "prev"]);
            this.gestures = new e.Utils.GestureRecognizer({ el: this.$el });
            this.gestures.on("tap", this._onTap.bind(this));
            this.gestures.on("double-tap", this._onDoubleTap.bind(this));
            this.gestures.on("swipe", this._onSwipe.bind(this));
            this.gestures.on("panmove", this._onPanMove.bind(this));
            this.gestures.on("panend", this._onPanEnd.bind(this));
            this.gestures.on("pinchmove", this._onPinchMove.bind(this));
            this.gestures.on("pinchend", this._onPinchEnd.bind(this));
            this.bindEvents([
                [this.$close, "click touchstart", this._onCloseClick],
                [this.$next, "click", this._onNextClick],
                [this.$prev, "click", this._onPrevClick]
            ]); if (this.model.selectedItem) { this._show() } }, _createPane: function(k, m) { if (!k) { return } var j = k.getItemDetailTemplate(),
                i = a[j] || "Detail"; return new e.Views.AnswerBar.DetailSliderPane({ answer: this.model, model: k, pos: m, detailView: i, appendTo: this.$panes }) }, _swipeToItem: function(i, j) { this._swipeVelocity = j; if (i === "prev") { this.model.selectPrevItem() } else { this.model.selectNextItem() } }, _setZoom: function(j, i) { this._zoom = j; if (this._zoom <= 1) { this._setPan(0, 0) } this.views.cur && this.views.cur.setZoom(j, i) }, _setPan: function(i, o, k) { if (this._zoom < 1) { this._panX = 0;
                this._panY = 0 } else { this._panX = i;
                this._panY = o } if (this.views.cur && this._zoom > 1 && k) { var n = this.views.cur.getPanDimensions(); if (n) { var j = Math.abs(n.width - e.device.width) / 2,
                        m = Math.abs(n.height - e.device.height) / 2; if (this._panX - j > 0) { this._panX = j } else { if (this._panX + j < 0) { this._panX = j * -1 } } if (this._panY - m > 0) { this._panY = m } else { if (this._panY + m < 0) { this._panY = m * -1 } } } } this.views.cur && this.views.cur.setPan(this._panX, this._panY, k) }, _updateDOM: function() { var i = this.views,
                j = this._swipeVelocity; if (i.prev) { i.prev.resetPosition(-1, j) } if (i.cur) { i.cur.resetPosition(0, j) } if (i.next) { i.next.resetPosition(1, j) } delete this._swipeVelocity;
            this.$prev.toggleClass(c, !!i.prev);
            this.$next.toggleClass(c, !!i.next && !i.next.model.hidden) }, _updateSelectedItem: function() { if (this.views.prev && this.views.prev.model === this.model.selectedItem) { this.views.next && this.views.next.destroy();
                this.views.next = this.views.cur;
                this.views.cur = this.views.prev;
                this.views.prev = this._createPane(this.model.getPrevItem(), -1) } else { if (this.views.next && this.views.next.model === this.model.selectedItem) { this.views.prev && this.views.prev.destroy();
                    this.views.prev = this.views.cur;
                    this.views.cur = this.views.next;
                    this.views.next = this._createPane(this.model.getNextItem(), 1) } else { this.destroyChildViews();
                    this.views = { prev: this._createPane(this.model.getPrevItem(), -1), cur: this._createPane(this.model.selectedItem), next: this._createPane(this.model.getNextItem(), 1) } } } this._updateDOM(); if (this.overlayClass && this.overlayClass.prototype.shouldShow()) { this.views.overlay && this.views.overlay.destroy();
                this.views.overlay = new this.overlayClass({ model: this.model.selectedItem, appendTo: this.$el }) } if (e.device.isMobile && this.model.indexOfSelectedItem() >= (this.model.items.length - 1)) { this.model.loadMore() } this._setZoom(1, true);
            this._setPan(0, 0) }, _clearVerticalPan: function() { this.$el.removeClass("is-closing");
            this._setPan(0, 0, true);
            this._focus() }, _onPanMove: function(j) { if (this._zoom > 1) { var i = this._panX + j.deltaX,
                    k = this._panY + j.deltaY;
                this._setPan(i, k) } else { if (j.axis === "x") { if (this._panAxis !== "x") { if (this._panAxis === "y") { this._clearVerticalPan() } this._panAxis = "x" } if (this._prevDirection && this._prevDirection !== j.direction) { this._updateDOM() } else { if (this.views.prev) { this.views.prev.translateX(j.distX) } if (this.views.next) { this.views.next.translateX(j.distX) } if (this.views.cur) { this.views.cur.translateX(j.distX) } } this._prevDirection = j.direction } else { if (j.axis === "y") { if (this._panAxis !== "y") { this.$el.addClass("is-closing");
                            this._panAxis = "y";
                            this._unfocus();
                            this._updateDOM() } this._setPan(0, this._panY + j.deltaY) } } } }, _onPanEnd: function(j) { if (this._panAxis === "y") { this._clearVerticalPan() } delete this._panAxis;
            delete this._prevDirection; if (this._zoom <= 1 && !j.multitouch && !j.swiped) { this._updateDOM() } if (this._zoom > 1 && (Math.abs(j.velocityX) > 0.1 || Math.abs(j.velocityY) > 0.1)) { var i = this._panX + j.velocityX * e.animation_speed,
                    k = this._panY + j.velocityY * e.animation_speed;
                this._setPan(i, k, true) } }, _onPinchMove: function(i) { this._setZoom(i.pinchDelta * this._zoom) }, _onPinchEnd: function() { if (this._zoom < 1) { this._setZoom(1, true) } }, _onTap: function(i) { var j = i.e;
            this._updateDOM(); if (this._zoom > 1) { return } if (!this._focused) { j.preventDefault();
                j.stopPropagation();
                this._focus() } else { if (!j.target || j.target.nodeName !== "A") { this._unfocus() } } }, _onDoubleTap: function(i) { if (this._zoom > 1) { this._setZoom(1, true);
                this._focus() } else { this._setZoom(2, true);
                this._unfocus() } }, _onSwipe: function(i) { if (this._zoom > 1) { return } if (this._panAxis === "x" && i.axis === "x") { if (i.direction === "right" && this.model.getPrevItem()) { this._swipeToItem("prev", i.velocityX) } else { if (i.direction === "left" && this.model.getNextItem()) { this._swipeToItem("next", i.velocityX) } else { this._updateDOM() } } } else { if (this._panAxis === "y" && i.axis === "y") { if (this.model.selectedItem) { this.model.selectedItem.unselect() } } } }, _onCloseClick: function(i) { i.stopPropagation();
            i.preventDefault(); if (this.model.selectedItem) { this.model.selectedItem.unselect() } }, _onNextClick: function() { this.model.selectNextItem() }, _onPrevClick: function() { this.model.selectPrevItem() }, _onActiveChanged: function() { if (!this.model.active) { this._hide() } else { if (this.model.selectedItem) { this._show() } } }, _onSelectedItemChanged: function() { if (this.model.selectedItem) { this._updateSelectedItem();
                this._show() } else { this._hide() } }, _onResize: function() { if (e.device.isMobile) { return } this.$el.css({ height: this.model.getDetailHeight() + "px" }) } }) }(DDG);
! function(e) { var c = e.Views.Base,
        a = 16,
        f = 200,
        b = 500;
    e.Views.AnswerBar.DetailSliderPane = function(g) { this.answer = g.answer;
        this._pos = g.pos;
        this.detailView = g.detailView;
        c.call(this, g);
        this.bindEvents([
            [this.answer, "change:expanded", this._onExpandedChanged],
            [e.device, "resize", this._onResize]
        ]) };
    e.Views.AnswerBar.DetailSliderPane.prototype = $.extend({}, c.prototype, { template: "detail_slider_pane", resetPosition: function(h, g) { if (this._pos === h && !this._translateX) { return } this._prevX = this._getLeft();
            this._translateX = 0;
            this._pos = h; if (e.device.isMobile && $.Velocity) { this._transitionPosition(g) } else { this._updatePosition() } }, translateX: function(g) { if (this._translateX === g) { return } this._prevX = this._getLeft();
            this._translateX = g;
            this._updatePosition() }, setZoom: function(h, g) { this.views.detail && this.views.detail.setZoom && this.views.detail.setZoom(h, g) }, setPan: function(g, i, h) { this.views.detail && this.views.detail.setPan && this.views.detail.setPan(g, i, h) }, getPanDimensions: function() { if (this.views.detail && this.views.detail.getPanDimensions) { return this.views.detail.getPanDimensions() } }, _render: function() { c.prototype._render.call(this, this._getMeasurements()); var g = this.model.getItemDetailTemplate();
            this.views.detail = new e.Views.AnswerBar[this.detailView]({ model: this.model, answer: this.answer, template: g, parentPadding: a, appendTo: this.$el });
            this._prevX = this._getLeft();
            this._updatePosition();
            this.$el.css({ display: "block" }); if (!$.Velocity) { e.require("velocity", function() { this._updatePosition() }.bind(this)) } }, _updateDOM: function() { this.$el.css(this._getMeasurements()) }, _updatePosition: function() { var g = this._getLeft(); if ($.Velocity) { this.$el.velocity("stop");
                $.Velocity.hook(this.$el, "translateX", g + "px") } else { var h = "translateX(" + g + "px)";
                this.$el.css({ transform: h, "-webkit-transform": h, "-moz-transform": h, "-ms-transform": h, "-o-transform": h }) } }, _transitionPosition: function(h) { h = h || 1; var k = this._getLeft(),
                j = this._prevX,
                i = k - j,
                g = h ? (Math.abs(i) / (h * 100) * 100) : e.animation_speed;
            g = Math.max(Math.min(g, b), f);
            this.$el.velocity("stop").velocity({ translateX: [k, j] }, { easing: "ease-out", duration: Math.round(g) }) }, _getLeft: function() { var g = (this._pos || 0) * e.device.width; if (this._translateX) { g += this._translateX } return g }, _getMeasurements: function() { var i = e.device,
                m = i.isMobile,
                k = i.isMobilePortrait(),
                o = m ? e.device.height : this.answer.getDetailHeight(),
                n = a,
                q = n * 2,
                j = i.isMobile ? n : this.answer.expanded ? n : n + i.gutterSize(),
                p = k ? q : n,
                g = o - p - n,
                h = e.device.width;
            h -= (n + j); return { lineHeight: g + "px", height: g + "px", width: h + "px", padding: [p, n, n, j].join("px ") + "px" } }, _onExpandedChanged: function() { this._updateDOM() }, _onResize: function() { this._updateDOM();
            this._updatePosition() } }) }(DDG);
! function(f) { var c = f.Views.Base,
        e = f.Views.AnswerBar.Answers,
        b = "is-expanded",
        h = 0.8,
        g = 800,
        a = 1;
    e.Base = function(j) { this.views = { items: [], itemsById: {} };
        j.id = j.model.id;
        c.call(this, j);
        this._deferShow = j.deferShow; var i = this.model;
        this.bindEvents([
            [f.device, "resize", this._onResize],
            [f.keyboard, "escape." + this.model.id, this._onEscape],
            [i, "change:active", this._onActiveChanged],
            [i, "change:expanded", this._onExpandedChanged],
            [i, "change:items", this._onItemsChanged],
            [i, "change:isRequerying", this._onRequeryingChanged]
        ]); if (this.isValid()) { if (i.active) { this.show() } if (i.expanded) { this._expand() } if (i.items.length) { this._updateItems() } } };
    e.Base.prototype = $.extend({}, c.prototype, { template: "base", isValid: function() { if (this.requiredTemplates) { for (var o = 0; o < this.requiredTemplates.length; o++) { var n = this.requiredTemplates[o],
                        k = n + "_mobile"; for (var m = 0; m < this.model.items.length; m++) { var p = this.model.items[m]; if (!p.templates || (!p.templates[n] && !p.templates[k])) { return false } } } } if (this.maxItems && (this.model.items.length > this.maxItems)) { return false } return true }, show: function() { this.$el.addClass("is-active");
            f.keyboard.set("namespace", this.model.id); if (this.shouldExpandOnShow()) { this.model.set("expanded", 1) } if (this.model.expanded) { f.history.set({ iax: this.model.nameId }) } if (this._showingNoResults) { this._fireNoResultsPixel() } }, hide: function() { this.$el.removeClass("is-active");
            f.keyboard.set("namespace") }, getHeight: function() { if (this._height) { return this._height } return this.$el && (this._height = this.$el.outerHeight()) }, getWidth: function() { if (this._width) { return this._width } return this.$el && (this._width = this.$el.width()) }, showNoResults: function(i) { if (!this.$noResults) { this.$noResults = f.$exec_template("no_ia_results", i);
                this.$el.append(this.$noResults) } this._fireNoResultsPixel();
            this.$noResults.show();
            this._showingNoResults = 1 }, hideNoResults: function() { this.$noResults.hide();
            this._showingNoResults = 0 }, shouldExpandOnShow: function() { var i = this.model.meta.autoExpand && this.model.meta.autoExpandRows; return this._isQuerystringIAX() && !i }, calculateIAHeight: function() { var j = viewport_height - f.get_header_height(),
                i = viewport_height < g ? a : h; return Math.round(j * i) }, _render: function(i) { c.prototype._render.call(this, i);
            this.$el.click(function() { this.model.engaged() }.bind(this)) }, _updateItems: function() {}, _expand: function() { this.$el.addClass(b);
            f.history.set({ iax: this.model.nameId }) }, _collapse: function() { this.$el.removeClass(b);
            f.history.clear("iax") }, _fireNoResultsPixel: function() { if (this.model.active) { f.pixel.fire("iafd", this.model.pixelId, f.duckbar.activeTabOpenType) } }, _isQuerystringIAX: function() { var j = f.history.get("iax"),
                i = (j == 1 || j == 0) ? f.history.get("ia") : j; return (this.model.id === i || this.model.nameId === i) }, _onActiveChanged: function() { if (this.model.active && !this._deferShow) { this.show() } else { this.hide() } }, _onExpandedChanged: function() { if (this.model.expanded) { this._expand() } else { this._collapse() } }, _onRequeryingChanged: function(k) { this.$el.toggleClass("is-requerying", k); if (!k) { for (var j = 0; j < this.views.items.length; j++) { this.views.items[j].destroy() } this.views.items = [];
                this.views.itemsById = {} } }, _onItemsChanged: function() { if (this.isValid()) { this._updateItems() } }, _onResize: function() { this._height = null;
            this._width = null }, _onEscape: function() { this.model.set("expanded") }, _onExternalLinkClick: function(i) { this.model.clickedExternalLink();
            c.prototype._onExternalLinkClick.call(this, i) } }) }(DDG);
! function(c) { var b = c.Views.AnswerBar.Answers,
        a = b.Base;
    b.Detail = function(e) { a.call(this, e) };
    b.Detail.prototype = $.extend({}, a.prototype, { template: "base", maxItems: 1, requiredTemplates: ["detail"], show: function() { a.prototype.show.call(this); if (this.model.items.length) { this.emit("item-shown", this.model.items[0]) } }, _updateItems: function() { if (this.views.items.length || !this.model.items.length) { return } var e = this.model.items[0];
            this.views.items.push(new c.Views.AnswerBar.Detail({ model: e, answer: this.model, template: e.getDetailTemplate(), canExpand: true, canWrap: true, hasInfobox: !!e.infoboxData, appendTo: this.$el })); if (e.infoboxData) { this.views.infobox = new c.Views.AnswerBar.InfoBox({ model: this.model, data: e.infoboxData, appendTo: this.$el }) } if (this.model.meta.hasAttribution()) { this.views.attribution = new c.Views.Attribution({ answer: this.model, className: e.infoboxData ? "attribution-wrap--infobox" : "attribution-wrap--top", direction: "bottom-left", appendTo: this.$el }) } } }) }(DDG);
! function(g) { var f = g.Views.AnswerBar.Answers,
        b = f.Base,
        h = 100,
        e = 2000,
        c = 4,
        a = 5,
        i = { audio_item: "AudioTile", places_item: "PlaceTile" };
    f.Tiles = function(k) { var j = k.model,
            m = j.id;
        this._scrollLeft = 0;
        this.noDetail = k.noDetail;
        this.bindEvents([
            [j, "change:isLoading", this._onIsLoadingChanged],
            [j, "change:failed", this._onLoadFailed],
            [j, "change:selectedItem", this._onSelectedItemChanged],
            [j, "change:isRequerying", this._onIsRequeryingChanged],
            [j, "no-results", this.removeLoadMore],
            [g.keyboard, "left." + m, this.selectPrevItem],
            [g.keyboard, "right." + m, this.selectNextItem]
        ]);
        b.call(this, k);
        this._updateLoadingMore(); if (this.model.failed) { this._onLoadFailed() } };
    f.Tiles.prototype = $.extend({}, b.prototype, { template: "tiles", requiredTemplates: ["item"], destroy: function() { clearTimeout(this._expandTimeout);
            clearTimeout(this._flickTimeout);
            b.prototype.destroy.call(this) }, _updateItems: function() { if (!this.model.items.length) { return this.showNoResults() } else { if (this._showingNoResults) { this.hideNoResults() } } this.removeLoadMore(); for (var j = 0; j < this.model.items.length; j++) { var k = this.model.items[j];
                k.num = k.num || j + 1; if (!this.views.itemsById[k.id]) { this._appendItem(k) } } if (this.model.meta.next) { this.addLoadMore() } delete this._height;
            this._updateScrollNav();
            this._selectItemFromQuerystring() }, _appendItem: function(m) { var j = m.getItemTemplate(),
                n = i[j] || "Tile",
                k = new g.Views.AnswerBar[n]({ model: m, answer: this.model, noDetail: this.noDetail, appendTo: this.$jsTiles });
            this.views.items.push(k);
            this.views.itemsById[m.id] = k;
            k.width = this.getTileWidth(k) }, show: function() { b.prototype.show.call(this); var j = this.model;
            this._updateWidths(); if (j.selectedItem) { g.history.set({ iai: j.getQuerystringItemId(j.selectedItem) }) } this._onResize(); if (this.views.items.length) { this._selectItemFromQuerystring();
                this._selectItemFromMeta() } this.model.items.map(function(k) { if (k.visible) { this.emit("item-shown", k) } }.bind(this)) }, hide: function() { clearTimeout(this._flickTimeout);
            clearTimeout(this._expandTimeout);
            b.prototype.hide.call(this) }, shouldExpandOnShow: function() { return false }, selectNextItem: function() { this.model.selectNextItem(); if (this.model.indexOfSelectedItem() >= (this.model.items.length - 1)) { this.model.loadMore() } }, selectPrevItem: function() { this.model.selectPrevItem() }, getTileWidth: function(j) { if (j.$el) { var k = this.model.meta; if (k.variableTileWidth || k.itemsWidthVaries || k.itemsExpand) { return j.$el.outerWidth() + (this.getTileMargins().x * 2) } if (!this.tileWidth) { this.tileWidth = j.$el.outerWidth() + (this.getTileMargins().x * 2) } } return this.tileWidth }, getSelectedTileWidth: function() { return this.model.selectedItem && this.getTileWidth(this.views.itemsById[this.model.selectedItem.id]) }, getTileMargins: function() { if (this._tileMargins) { return this._tileMargins } if (!this.views.items.length) { return { x: 0, top: 0, bottom: 0 } } return this._tileMargins = this.views.items[0].getMargins() }, getLoadMoreWidth: function() { if (!this._showingLoadMore) { return 0 } return this.views.items.length && this.getTileWidth(this.views.items[0]) }, _render: function() { b.prototype._render.call(this, { id: this.model.id, meta: this.model.meta });
            this.$tileview = this.$(".tileview");
            this.$tileWrap = this.$(".tile-wrap");
            this.$jsTiles = this.$(".js-tiles");
            this.$jsTiles.on("mousewheel", this._onMouseWheel.bind(this)); if (window.addEventListener) { this.$jsTiles[0].addEventListener("wheel", this._onMouseWheel.bind(this)) } this.$jsTiles.addClass("tileview__" + this.model.id);
            this.$jsTiles.bind("touchend", this._onJsTilesTouchEnd.bind(this));
            this.$loadMore = g.$exec_template("tiles_load_more", { id: this.model.id, name: this.model.name });
            this._onResize() }, _createDetailSlider: function() { if (this.views.detail || this.noDetail) { return } this.views.detail = new g.Views.AnswerBar.DetailSlider({ model: this.model, appendTo: this.$el }) }, _updateVisibleItems: function() { var s = this._scrollLeft - g.device.gutterSize(),
                q = s + viewport_width,
                x = 0,
                u = { offscreenRight: [], offscreenLeft: [], visible: [] },
                p, r, j; for (p = 0; r = this.views.items[p]; p++) { var n = x + r.width,
                    m = x,
                    k = n,
                    o = 0,
                    t = 0; if (m < s) { u.offscreenLeft.push(r); if (k > s) { t = 1 } } else { if (k > q) { u.offscreenRight.push(r); if (m < q) { t = 1 } } else { o = 1;
                        u.visible.push(r) } } j = (o || t) && this.model.active && !r.model.visible;
                r.model.set({ visible: o, partiallyVisible: t });
                x += r.width; if (j) { this.emit("item-shown", r.model) } } if (this._showingLoadMore) { var v = { width: this.getLoadMoreWidth() }; if (x + v.width > q) { v.visible = 0;
                    u.offscreenRight.push(v) } else { v.visible = 1;
                    u.visible.push(v) } } return u }, _selectItemFromQuerystring: function() { var j = this.model,
                n = g.history.get("iai"),
                m = g.history.get("ia"),
                k; if (!j.active || j.selectedItem) { return } if (m === j.nameId && typeof n !== "undefined") { k = j.itemsById[n]; if (!k && $.isNumeric(n)) { k = j.items[n] } if (k) { if (this._rowsToShow && !k.visible) { this._loadMore() } k.select();
                    this._scrollToTile(this.views.itemsById[k.id], { animated: false }) } else { if (j.meta.next) { this._loadMore() } } } }, _selectItemFromMeta: function() { var j = this.model,
                m = j.meta; if (!j.active || j.selectedItem) { return } if (!j.selectedItem && m.selectedItem) { var k = j.itemsById[m.selectedItem]; if (!k) { k = j.items[m.selectedItem] } k && k.select();
                this._scrollToTile(this.views.itemsById[k.id], { animated: false }) } }, _updateScrollNav: function() { if (!this.views.items.length || !this.model.active) { return } if (!this.$leftScrollNav) { this.$leftScrollNav = g.$exec_template("tiles_scroll_nav", { dir: "prev" });
                this.$rightScrollNav = g.$exec_template("tiles_scroll_nav", { dir: "next" });
                this.$jsTiles.prepend(this.$leftScrollNav);
                this.$jsTiles.prepend(this.$rightScrollNav);
                this.$leftScrollNav.bind("click", this._onLeftScrollClick.bind(this));
                this.$rightScrollNav.bind("click", this._onRightScrollClick.bind(this)) } var m = this._updateVisibleItems(),
                k = m.offscreenLeft.length,
                j = m.offscreenRight.length;
            this.$leftScrollNav.attr("data-items", k);
            this.$rightScrollNav.attr("data-items", j);
            this.$leftScrollNav.removeClass("can-scroll");
            this.$rightScrollNav.removeClass("can-scroll"); if (k > 0) { this.$leftScrollNav.addClass("can-scroll") } if (j > 0) { this.$rightScrollNav.addClass("can-scroll") } if (this.model.active && this.model.meta.next && !this.model.expanded && j < 3) { this._loadMore() } this.emit("scrolled", m) }, _scrollHorizontal: function(j) { var k = this._scrollLeft,
                q = g.device.gutterSize(),
                m = this._getTotalTileWidth(),
                o = viewport_width - q,
                r; if (j === "right") { r = Math.min(k + o, m + q) } else { r = Math.max(k - o, 0) } var p, s = 0; for (var n = 0, u; u = this.views.items[n]; n++) { if (r >= s && r <= (s + u.width)) { p = u } s += u.width } if (!p && this._showingLoadMore && this.$loadMore) { p = { "$el": this.$loadMore } } this._scrollToTile(p) }, _scrollToTile: function(o, j) { if (!o || !o.$el) { return } var k = j && typeof j.animated !== "undefined" ? j.animated : true,
                n = this.model,
                r = n.meta,
                q = 0,
                m = 0,
                s, p = this._getTotalTileWidth() + g.device.gutterSize() + h - g.device.width; for (; s = this.views.items[m]; m++) { if (s === o) { break } q += s.width } if (r.itemsExpand && m > this._lastExpandedTileIndex) { q -= this._lastExpandedTileDiff } q = Math.min(q, p); if (this._scrollLeft === q) { return } this._scrollLeft = q; if (k) { this._autoScrolling = true;
                this.$jsTiles.stop().animate({ scrollLeft: this._scrollLeft }, g.animation_speed, function() { this._autoScrolling = false }.bind(this)) } else { this.$jsTiles.scrollLeft(this._scrollLeft) } this._updateScrollNav() }, _updateDetailViewPosition: function() { var m = this.model.selectedItem; if (!m || g.device.isMobile || !this.views.detail) { return } if (!this.model.expanded) { this.views.detail.position("auto"); return } var k = this.views.itemsById[m.id],
                j = parseInt(k.$el.position().top, 10),
                o = this.getTileMargins(),
                n = j + parseInt(k.$el.outerHeight(), 10) + o.bottom; if (this.views.metabar && !this.views.metabar.isStuck() && g.settings.get("ko").match(/^(d|s|-1)$/)) { n += this.views.metabar.getHeight() } this.views.detail.position(n + "px") }, _updateWidths: function() { delete this.tileWidth; for (var k = 0, j; j = this.views.items[k]; k++) { j.width = this.getTileWidth(j) } }, _getTotalTileWidth: function() { var k = 0; for (var j = 0; j < this.views.items.length; j++) { k += this.views.items[j].width } k += this.getLoadMoreWidth(); return k }, showNoResults: function(j) { b.prototype.showNoResults.call(this, j);
            this.$leftScrollNav && this.$leftScrollNav.hide();
            this.$rightScrollNav && this.$rightScrollNav.hide();
            this.$el.addClass("has-no-results") }, hideNoResults: function() { b.prototype.hideNoResults.call(this);
            this.$leftScrollNav && this.$leftScrollNav.show();
            this.$rightScrollNav && this.$rightScrollNav.show();
            this.$el.removeClass("has-no-results") }, addLoadMore: function() { if (this._showingLoadMore) { return } if (this.model.canLoadOnScroll() && !g.device.isMobile) { this.$loadMore.hide() } this.$jsTiles.append(this.$loadMore);
            this.$loadMore.click(this._onLoadMoreClick.bind(this));
            this._showingLoadMore = true }, removeLoadMore: function() { this.$loadMore.remove();
            this._showingLoadMore = false }, _loadMore: function() { if (this.model.isLoading) { return } if (this._rowsToShow) { this.views.metabar && this.views.metabar.show(); if (is_mobile && !this.model.canLoadOnScroll()) { this._loadMoreMobile() } else { this.$(".tile.is-hidden").removeClass("is-hidden");
                    delete this._rowsToShow; if (!this.model.meta.next) { this.removeLoadMore() } } return } this.model.loadMore() }, _loadMoreMobile: function() { var m, p, q, o = c,
                n = g.device.width,
                j = this.views.items.length,
                k = function(r) { return j - r < a - 1 }; for (m = 0; m < j && o; m++) { p = this.views.items[m];
                q = p.$el; if (q.is(":visible")) { continue } if (n - q.outerWidth() < 0 && !k(m)) { n = g.device.width;
                    o-- } if (o) { p.model.set({ visible: 1, partiallyVisible: 0 });
                    q.removeClass("is-hidden");
                    n -= q.outerWidth() } } this._rowsToShow += c - o; if (this.views.items[j - 1].$el.is(":visible")) { delete this._rowsToShow;
                this.views.metabar && this.views.metabar.show(); if (!this.model.meta.next) { this.removeLoadMore() } } }, _updateLoadingMore: function() { if (this.$loadMore) { if (this.model.isLoading) { this.$loadMore.addClass("is-loading") } else { this.$loadMore.removeClass("is-loading") } } }, _updateAfterItemExpand: function() { clearTimeout(this._expandTimeout); var j = this.getSelectedTileWidth();
            this._expandTimeout = setTimeout(function() { this._updateWidths();
                this._updateScrollNav(); if (this.model.selectedItem) { var k = this.getSelectedTileWidth();
                    this._lastExpandedTileDiff = k - j;
                    this._lastExpandedTileIndex = this.model.indexOfSelectedItem() } else { delete this._lastExpandedTileIndex;
                    delete this._lastExpandedTileDiff } }.bind(this), g.animation_speed + 150) }, _onLeftScrollClick: function(j) { j.preventDefault();
            this._scrollHorizontal("left") }, _onRightScrollClick: function(j) { j.preventDefault();
            this._scrollHorizontal("right") }, _onJsTilesTouchEnd: function() { this._scrollLeft = this.$jsTiles.scrollLeft();
            this._updateVisibleItems(); if (this._flickTimeout) { clearTimeout(this._flickTimeout) } this._flickTimeout = setTimeout(function() { if (this._scrollLeft !== this.$jsTiles.scrollLeft()) { this._scrollLeft = this.$jsTiles.scrollLeft();
                    this._updateVisibleItems() } }.bind(this), e) }, _onMouseWheel: function(m) { if (this._autoScrolling) { return } if (this.model.selectedItem) { var k = this.views.itemsById[this.model.selectedItem.id]; if (k && k.hideViews) { k.hideViews() } } var j = m.originalEvent ? (m.originalEvent.wheelDeltaX * -1) : m.deltaX; if (!j) { return } m.preventDefault();
            this.$jsTiles.scrollLeft(this._scrollLeft + j);
            this._scrollLeft = this.$jsTiles.scrollLeft();
            this._updateScrollNav(); return false }, _onEscape: function() { if (this.model.selectedItem) { this.model.selectedItem.unselect() } else { b.prototype._onEscape.call(this) } }, _onLoadMoreClick: function(j) { j.preventDefault();
            this._loadMore();
            this.model.fire("iasm") }, _onResize: function() { b.prototype._onResize.call(this);
            this._updateWidths();
            this._updateScrollNav();
            delete this._height;
            delete this._tileMargins }, _onIsLoadingChanged: function() { this._updateLoadingMore() }, _onLoadFailed: function() { if (!this.model.failed) { return } this.removeLoadMore();
            this._updateItems() }, _shouldScrollToTileOnItemSelect: function() { if (g.device.isMobile) { return false } var j = this.model.selectedItem; return j && !j.visible }, _onSelectedItemChanged: function() { delete this._height; var j = this.model,
                n = j.meta; if (!j.selectedItem) { g.history.clear("iai"); if (n.itemsExpand) { this._updateAfterItemExpand() } return } var m = j.selectedItem,
                k = this.views.itemsById[m.id]; if (this._shouldScrollToTileOnItemSelect()) { this._scrollToTile(k) } if (n.itemsExpand) { this._updateAfterItemExpand() } if (m.canShowItemDetail() && !this.views.detail) { this._createDetailSlider() } this._updateDetailViewPosition() }, _onIsRequeryingChanged: function(j) { if (j) { if (g.device.scrollTop() > this.$el.scrollTop()) { this._scrollToTile(this.views.items[0]) } delete this._rowsToShow } } }) }(DDG);
! function(e) { var c = e.Views.AnswerBar.Answers,
        b = c.Tiles,
        f = 10,
        a = 5;
    c.GridTiles = function(h) { var g = h.model;
        b.call(this, h);
        this.bindEvents([
            [g, "change:canExpand", this._onCanExpandChanged],
            [g, "change:selectedTopic", this._onSelectedTopicChanged]
        ]);
        this._createMetaBar() };
    c.GridTiles.prototype = $.extend({}, b.prototype, { _updateItems: function() { b.prototype._updateItems.call(this); if (this._rowsToShow) { this._updateHiddenRows() } }, _appendItem: function(h) { b.prototype._appendItem.call(this, h); if (e.device.isMobile) { var g = this.views.items[this.views.items.length - 1];
                this.bindEvents([
                    [g, "rerender", this._updateHiddenRows]
                ]) } }, shouldExpandOnShow: function() { var g = this.model.meta.autoExpand && this.model.meta.autoExpandRows; return this.model.canExpand && this._isQuerystringIAX() && !g }, _shouldScrollToTileOnItemSelect: function() { var h = this.model,
                i = h.selectedItem,
                g = e.device.isMobile,
                j = h.expanded && !g; return j || !i.visible }, show: function() { b.prototype.show.call(this); var g = this.model,
                h = g.meta; if (!g.expanded && g.canExpand) { if (h.autoExpand) { this.model.set("expanded", 1); if (h.autoExpandRows) { this._rowsToShow = h.autoExpandRows;
                        this._updateHiddenRows(); if (!h.alwaysShowMetabar) { this.views.metabar && this.views.metabar.hide() } } h.autoExpand = 0 } } }, _updateVisibleItems: function() { var h = { offscreenRight: [], offscreenLeft: [], visible: [] },
                g, j, m, k = this.views.items.length; if (!k) { return } if (this.model.expanded) { if (e.device.isMobile && this.model.meta.autoExpandRows && !this.model.isRequery && (this.model.meta.autoExpand || this._rowsToShow)) { if (this.model.name === "Images") { k = f * this.model.meta.autoExpandRows } else { k = a * this.model.meta.autoExpandRows } } for (g = 0; j = this.views.items[g]; g++) { if (g < k) { m = this.model.active && !j.model.visible;
                        j.model.set({ visible: 1, partiallyVisible: 0 });
                        h.visible.push(j); if (m) { this.emit("item-shown", j.model) } } } } else { h = b.prototype._updateVisibleItems.call(this) } return h }, _collapse: function() { b.prototype._collapse.call(this); if (this.model.selectedItem) { this.model.selectedItem.unselect() } e.device.scrollTop(0); if (is_mobile) { this.emit("close"); return } this.$jsTiles.removeClass("has-tiles--grid").addClass("has-tiles");
            this.$tileview.removeClass("tileview--grid").addClass("tileview");
            delete this._height;
            delete this._tileMargins;
            this._updateScrollNav() }, _expand: function() { b.prototype._expand.call(this);
            this.$tileview.removeClass("tileview").addClass("tileview--grid");
            this.$jsTiles.removeClass("has-tiles").addClass("has-tiles--grid");
            this._updateVisibleItems();
            delete this._height;
            delete this._tileMargins; if (this.views.detail && this.model.selectedItem) { this._updateDetailViewPosition();
                this._scrollToTile(this.views.itemsById[this.model.selectedItem.id]) } }, getHeight: function(h) { var g = b.prototype.getHeight.call(this, h); return (h && h.subtractMenu && this.views.metabar) ? g - this.views.metabar.getHeight() : g }, setIARequery: function() { e.hidden.set("iar", this.model.id) }, clearIARequery: function() { e.hidden.clear("iar") }, _createMetaBar: function() { if (this.views.metabar) { return } this.views.metabar = new e.Views.AnswerBar.Meta.MetaBar($.extend({ model: this.model, parent: this, before: this.$tileWrap }, this.model.meta));
            this.views.metabar.on("stuck", this._onMetabarStuckChanged.bind(this));
            this.views.metabar.on("close", this.emit.bind(this, "close")) }, _scrollToTile: function(j, h) { if (!j || !j.$el) { return } var i = h && typeof h.animated !== "undefined" ? h.animated : true,
                g = this.model; if (!g.expanded) { b.prototype._scrollToTile.call(this, j, h) } else { var m = j.$el.offset().top,
                    k = this.getTileMargins(),
                    n = Math.max(m - k.top - k.bottom, 0); if (this.views.metabar) { n -= this.views.metabar.getHeight() } if (e.isHeaderFixed) { n -= e.get_header_height() } n = Math.round(n); if (is_mobile_device || !i) { e.device.scrollTop(n) } else { e.device.scrollTop(n, true) } } }, _updateHiddenRows: function() { if (!this.model.expanded || !this._rowsToShow) { return } var n = 0,
                h = null,
                j = 0,
                m, g, k = 0; for (; m = this.views.items[k]; k++) { if (j) { m.hide(); continue } if (m.model.gridRow) { n = m.model.gridRow } else { g = m.$el.position().top; if (h === null || g !== h) { n++;
                        h = g } } if (n > this._rowsToShow) { j = 1;
                    m.hide(); continue } m.show() } j && this.addLoadMore() }, _getGridTileAt: function(g, m) { g = g || 0;
            m = m || 0; for (var j = 0, h; h = this.views.items[j]; j++) { var k = h.$el.offset(); if (k.left >= g && k.top >= m) { return h } } return null }, _scrollToSelectedTopic: function() { if (!this.model.selectedTopic) { return } this._scrollToTile(this.views.itemsById[this.model.selectedTopic.items[0].id]) }, _onCanExpandChanged: function() { if (this.model.expanded && !this.model.canExpand) { this.model.set("expanded") } }, _onMetabarStuckChanged: function() { if (this.model.expanded && !e.device.isMobile) { this._updateDetailViewPosition() } }, _onResize: function() { b.prototype._onResize.call(this);
            this._updateHiddenRows();
            this._updateDetailViewPosition() }, _onSelectedTopicChanged: function() { var g = this.model.selectedTopic;
            this.$(".active-topic").removeClass("active-topic"); if (g) { var k = this.views.itemsById;
                this._scrollToSelectedTopic();
                DDG.addClass(this.model.id, this.$el, "at-topic"); for (var h = 0; h < g.items.length; h++) { var j = k[g.items[h].id];
                    j.$el.addClass("active-topic") } } else { DDG.removeClass(this.model.id, this.$el, "at-topic") } }, _onJsTilesTouchEnd: function() { if (!this.model.expanded) { b.prototype._onJsTilesTouchEnd.call(this) } }, _onMouseWheel: function(g) { if (!this.model.expanded) { b.prototype._onMouseWheel.call(this, g) } } }) }(DDG);
! function(g) { var f = g.Views.AnswerBar.Answers,
        c = f.GridTiles,
        k = 163,
        m = 60,
        a = 120,
        h = 48,
        j = 240,
        i = 2,
        e = 300;
    f.Images = function(n) { this.scrollHandler = this._onScroll.bind(this);
        c.call(this, n) };
    f.Images.prototype = $.extend({}, c.prototype, { requiredTemplates: null, show: function() { if (!is_mobile_device) { g.device.on("scroll", this.scrollHandler) } if (this.model.expanded) { this.setIARequery() } c.prototype.show.call(this) }, hide: function() { g.device.removeListener("scroll", this.scrollHandler);
            this.clearIARequery();
            g.keyboard.clear("nativeUpDown");
            c.prototype.hide.call(this) }, showNoResults: function() { var o = {},
                n = this.model.name; if (window.iqbi && !g.settings.safeSearch.isOff() && !g.history.get("iaf")) { o.message = l("%s blocked by safe search.", n) } c.prototype.showNoResults.call(this, o) }, _updateItems: function() { c.prototype._updateItems.call(this); if (this.model.expanded) { this._recalcTileGridDimensions();
                this._updateTileWidths();
                this._checkLoadMore() } this._updateHiddenRows();
            delete this._height;
            this._updateDetailViewPosition() }, _appendItem: function(p) { var n = is_mobile ? h : m,
                o = is_mobile ? a : k;
            p.loadHighRes = !is_mobile; if ((p.width > n) && (p.height > o)) { p.tileWidth = Math.ceil((o / p.height) * p.width) } else { if (p.width > n) { p.tileWidth = p.width } else { p.tileWidth = n } } c.prototype._appendItem.call(this, p) }, getTileWidth: function(n) { return n.model.tileWidth + (this.getTileMargins().x * 2) }, getLoadMoreWidth: function() { return this._loadMoreTileWidth || j }, _expand: function() { this.$jsTiles.css("width", this.getWidth()); if (this.model.id === "images") { if (!g.device.isMobile || !this.model.meta.autoExpandRows) { this.$el.css("min-height", g.device.height - g.get_header_height()) } } c.prototype._expand.call(this);
            this._recalcTileGridDimensions();
            this._updateTileWidths();
            g.history.set({ ia: this.model.id });
            this._checkLoadMore(); if (!this.model.meta.autoExpandRows) { this.setIARequery() } g.keyboard.set("nativeUpDown", true) }, _collapse: function() { c.prototype._collapse.call(this);
            this._clearMinHeight();
            this._toggleTrailingTileVisibility();
            this.$jsTiles.css("width", "auto");
            this._updateTileWidths();
            this.clearIARequery();
            g.keyboard.clear("nativeUpDown") }, _clearMinHeight: function() { if (!g.device.isMobile && g.settings.isDefault("kc")) { this.$el.css("min-height", "") } }, _recalcTileGridDimensions: function() { if (!this.views.items.length) { return } var s = [],
                p = 0,
                n = this.getWidth(),
                u = this.getTileMargins().x * 2,
                o = 1,
                t, v, r = 0; for (var q = 0; t = this.views.items[q]; q++) { v = t.model;
                v.gridWidth = v.tileWidth;
                delete v.killMinWidth;
                p += v.gridWidth + u;
                s.push(v);
                v.gridRow = o; if (p > n) { b(s, p - n);
                    p = 0;
                    s = [];
                    o++ } if (v.selected) { r = o } } if (o > 1) { this._toggleTrailingTileVisibility(o, n - p, r) } }, _toggleTrailingTileVisibility: function(n, r, p) { var q; for (var o = 0; q = this.views.items[o]; o++) { if (q.model.gridRow === n && r > m && p !== n) { q.model.set({ hidden: 1 });
                    q.$el.addClass("is-hidden") } else { if (q.model.hidden) { delete q.model.hidden;
                        q.$el.removeClass("is-hidden") } } } }, _updateTileWidths: function() { var q = this.getTileMargins(),
                p; for (var n = 0, o; o = this.views.items[n]; n++) { if (o.$el) { p = o.model;
                    o.$el.css({ width: this.model.expanded ? p.gridWidth : p.tileWidth, marginLeft: q.x + "px", marginRight: q.x + "px" }); if (p.killMinWidth) { o.$el.css({ minWidth: 0 }) } } } if (!is_mobile) { this.$loadMore.css({ width: ((this.model.expanded) ? e : this.getLoadMoreWidth()) + "px", marginLeft: (this.model.expanded) ? "auto" : q.x + "px", marginRight: (this.model.expanded) ? "auto" : q.x + "px" }) } }, _onResize: function() { this._width = null;
            this.$jsTiles.css("width", this.getWidth());
            c.prototype._onResize.call(this); if (this.views.items.length && this.model.expanded) { this._recalcTileGridDimensions();
                this._updateTileWidths();
                this._updateDetailViewPosition();
                this._checkLoadMore() } }, _onScroll: function() { this._checkLoadMore() }, _checkLoadMore: function() { if (!this.model.canLoadOnScroll()) { return } var p = g.device,
                q = this.views.items.length - 1,
                o = this.views.items[q],
                r = (p.height - (g.get_header_height() + this.views.metabar.getHeight())),
                n = ((r + p.scrollTop()) / k) + i; if (o && o.model.gridRow < n) { this.model.loadMore() } }, _onLoadMoreClick: function(n) { if (g.device.isMobile) { this.setIARequery() } c.prototype._onLoadMoreClick.call(this, n) } }); var b = function(o, u) { var r = Math.floor(u / o.length),
            s = is_mobile ? h : m; for (var n = 0, q; q = o[n]; n++) { var p = r; if (q.gridWidth - r < s) { p = q.gridWidth - s } q.gridWidth -= p;
            u -= p } var t = Math.ceil(u); for (n = 0; q = o[n]; n++) { if (q.gridWidth - t > s) { q.gridWidth -= t; break } else { if (n === o.length - 1) { q.gridWidth -= t;
                    q.killMinWidth = 1 } } } } }(DDG);
! function(c) { var b = c.Views.AnswerBar.Answers,
        a = b.GridTiles;
    b.Videos = function(e) { a.call(this, e) };
    b.Videos.prototype = $.extend({}, a.prototype, { show: function() { if (this.model.expanded) { this.setIARequery() } a.prototype.show.call(this) }, hide: function() { this.clearIARequery();
            a.prototype.hide.call(this) }, showNoResults: function() { var f = {},
                e = this.model.name; if (window.iqbi && !c.settings.safeSearch.isOff() && !c.history.get("iaf")) { f.message = l("%s blocked by safe search.", e) } a.prototype.showNoResults.call(this, f) }, _expand: function() { if (!this.model.meta.autoExpandRows) { this.setIARequery() } if (!c.device.isMobile || !this.model.meta.autoExpandRows) { this.$el.css("min-height", c.device.height - c.get_header_height()) } a.prototype._expand.call(this) }, _collapse: function() { this.clearIARequery();
            this._clearMinHeight();
            a.prototype._collapse.call(this) }, _clearMinHeight: function() { if (!c.device.isMobile && c.settings.isDefault("kc")) { this.$el.css("min-height", "") } }, _onLoadMoreClick: function(f) { if (c.device.isMobile) { this.setIARequery() } a.prototype._onLoadMoreClick.call(this, f) } }) }(DDG);
! function(f) { var e = f.Views.AnswerBar.Answers,
        b = e.Base,
        c = { images: { mobile: 185, desktop: 216 }, forecast: { mobile: 395, desktop: 281 }, nlp_qa: { mobile: 133, desktop: 253 }, products: { mobile: 279, desktop: 269 }, recipes: { mobile: 251, desktop: 205, desktopTall: 268 }, sound_cloud: { mobile: 330, desktop: 311 }, time: { mobile: 154, desktop: 154 }, videos: { mobile: 250.5, desktop: 238, desktopTall: 272 } },
        a = 190;
    e.Placeholder = function(g) { this.signalWait = g.signalWait;
        this.timeAdded = new Date().getTime();
        b.call(this, g);
        this.show();
        this.updateHeight() };
    e.Placeholder.prototype = $.extend({}, b.prototype, { updateHeight: function() { var i = c[this.signalWait],
                h = f.device,
                g; if (i) { if (h.isMobile) { g = i.mobile || a } else { if (h.isTeapot()) { g = i.desktop || a } else { g = i.desktopTall || i.desktop || a } } } this.$el.height(g) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.AnswerBarMenuItem = function(c) { a.call(this, c);
        this.$link = this.$(".js-zci-link");
        this.bindEvents([
            [this.model, "change:active", this._onActiveChanged],
            [this.model, "change:visible", this._onVisibleChanged],
            [this.$link, "click", this._onClick]
        ]) };
    b.Views.AnswerBarMenuItem.prototype = $.extend({}, a.prototype, { template: "duckbar_tab", _render: function() { a.prototype._render.call(this, this.model) }, _onClick: function(c) { c.preventDefault();
            this.model.toggle() }, _onActiveChanged: function(c) { this.$link.toggleClass("is-active", c) }, _onVisibleChanged: function(c) { this.$el.toggleClass("is-hidden", !c) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.AnswerBarMenu = function(c) { var e = !b.device.isMobile && (b.opensearch.isExperiment("settings_dropdown", "b") || b.opensearch.isExperiment("settings_dropdown", "c"));
        this.template = e ? "answerbar_tabs_settings" : "answerbar_tabs";
        a.call(this, c);
        this.views.items = [];
        this.views.itemsById = {}; if (e) { this._renderSettings() } this.bindEvents([
            [this.model, "change:items", this._onItemsChanged]
        ]) };
    b.Views.AnswerBarMenu.prototype = $.extend({}, a.prototype, { template: this.template, _renderSettings: function() { new b.Views.Dropdowns.SettingsDropdown({ appendTo: "#duckbar_dropdowns" }) }, _render: function(c) { a.prototype._render.call(this, c);
            this.$staticWrap = this.$("#duckbar_static");
            this.$newItem = this.$("#duckbar_new");
            this.$sep = this.$("#duckbar_dynamic_sep") }, _onItemsChanged: function() { this.model.items.forEach(function(c) { if (this.views.itemsById[c.id]) { return } this._addItem(c) }.bind(this));
            this.views.items.forEach(function(c) { if (!this.model.itemsById[c.model.id]) { this._removeItem(c) } }.bind(this)) }, _addItem: function(e) { if (e.isPendingModule) { return } var f; if (e.type === "static") { f = this.$staticWrap } else { f = this.$newItem;
                this.$sep.removeClass("is-hidden") } var c = new b.Views.AnswerBarMenuItem({ appendTo: f, model: e });
            this.views.items.push(c);
            this.views.itemsById[e.id] = c;
            f.addClass("has-zci") }, _removeItem: function(e) { for (var c in this.views.items) { if (this.views.items[c].model.id === e.model.id) { this.views.items[c].destroy();
                    delete this.views.items[c];
                    delete this.views.itemsById[e.model.id]; break } } } }) }(DDG);
! function(b) { var a = b.Models.Base;
    b.Models.GLMap = function(c) { this.locations = c.locations || [c.selectedLocation];
        this.selectedLocation = c.selectedLocation || (this.locations.length === 1 && c.locations[0]);
        this.pixelId = c.pixelId;
        this.isSatellite = false;
        a.call(this, c) };
    b.Models.GLMap.prototype = $.extend({}, a.prototype, {}) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Address.AddressDetail = function(c) { this.answer = c.answer;
        a.call(this, c);
        this.bindEvents([
            [this.$address, "click", this._onLinkClick],
            [this.$title, "click", this._onLinkClick],
            [this.$el, "click", this._onClick]
        ]) };
    b.Views.Address.AddressDetail.prototype = $.extend({}, a.prototype, { template: "address_detail", _render: function(c) { a.prototype._render.call(this, $.extend({ mapkitAppleDevice: b.device.isAppleDevice }, this.model));
            this._cacheElems(".js-address-detail", ["title", "address"]);
            this.views.directions = new b.Views.Maps.DirectionsButton({ appendTo: this.$el, loc: this.model, answer: this.answer }) }, _updateMapLinks: function() { var f = b.directionSource.getMapURL(this.model),
                c = b.get_favicon_url(b.directionSource.selected.faviconURL || f),
                e = b.directionSource.selected.name;
            this.$address.attr("href", f).attr("title", "Open in " + e);
            this.$(".js-maps-module-favicon img").attr("src", c) }, updateDropdownPosition: function(c) { this.views.directions && this.views.directions.changeVerticalPos(c) }, _onClick: function() { this.answer.engaged() }, _onLinkClick: function(c) { this.answer.engaged();
            c.preventDefault();
            c.stopPropagation();
            this.answer.set("isMapExpanded", true);
            this.answer.fire("iacg") } }) }(DDG);
! function(c) { var a = c.Views.Base,
        b = 5;
    c.Views.Mapkit.Map = function(e) { this.mapkit = e.mapkit || c.mapkit;
        this.geo = e.geo || c.geo;
        this.answer = e.answer;
        this._mapOffset = e.mapOffset || { top: 0, right: 0, bottom: 0, left: 0 };
        this._isFrozen = e.isFrozen || false;
        this._hideLoc = e.hideLoc || false;
        this._hideMapTypeControl = e.hideMapTypeControl || false;
        this._hideScale = e.hideScale || false;
        this._hideCompass = e.hideCompass || false;
        this._isCurrentThemeDark = c.settings.isDarkTheme();
        this._markers = e.markers || [];
        e.legalLang = c.mapkit.getLegalLang();
        a.call(this, e);
        this.bindEvents([
            [this.answer, "change:isMapExpanded", this._onIsMapExpandedChange],
            [this.answer, "change:selectedItem", this._onSelectedItemChange],
            [this.answer, "change:isRequerying", this._onRequeryingChange],
            [this.answer, "change:items", this._onItemsChange],
            [c.settings, "change:" + c.settings.THEME_KEY, this._onThemeChange]
        ]) };
    c.Views.Mapkit.Map.prototype = $.extend({}, a.prototype, { template: "mapkit_map", hide: function() { this.$el.addClass("is-hidden") }, show: function() { this.$el.removeClass("is-hidden");
            this.recenter() }, recenter: function(f) { if (!this.views.map) { return } if (f) { var e = new w.mapkit.Coordinate(f.lat, f.lon);
                this.views.map.setCenterAnimated(e) } else { this.views.map.setVisibleMapRectAnimated(this._originalMapRect) } }, updateMapOffset: function(e) { if (!this.views.map) { return } this._mapOffset = e;
            this.views.map.padding = new w.mapkit.Padding(this._mapOffset) }, updateMap: function(f) { var e = f || this._mapOffset; if (!this.views.map || !this.views.markers) { return } this.updateMapOffset(e);
            this.views.map.showItems(this.views.map.annotations, { padding: new w.mapkit.Padding(e) });
            this._originalMapRect = this.views.map.visibleMapRect }, getCenter: function() { var e = this.views.map.center; return { lat: e.latitude, lon: e.longitude } }, _isMarkerVisible: function(g) { if (!g.annotation) { return false } var j = g.annotation.coordinate,
                e = this.views.map.convertCoordinateToPointOnPage(j),
                h = e.x > this._mapOffset.left && e.x < c.device.width - this._mapOffset.right,
                i = e.y > this._mapOffset.top && e.y < c.device.height - this._mapOffset.bottom,
                f = h && i; return f }, _onRequeryingChange: function() { if (this.answer.isRequerying && this.views.map.annotations.length > 0) { this.views.map.removeAnnotations(this.views.map.annotations) } }, _onItemsChange: function() { this._markers = this.answer.itemsOnMap;
            this._renderMarkers();
            this._originalMapRect = this.views.map.visibleMapRect; if (this.answer.shouldMapViewportUpdate) { this.updateMap() } }, _onSelectedItemChange: function() { if (this.answer.isRequerying || this.answer.isSingle) { return } var e = this.answer.selectedItem; if (!e) { this.recenter() } else { if (!this._isMarkerVisible(e)) { this.recenter({ lat: e.lat, lon: e.lon }) } } }, _updateMapType: function() { if (!this.views.map || !this.answer) { return } this.answer.set("isDarkMap", this._isCurrentThemeDark || this.views.map.mapType !== "standard") }, _getMarkersWithUserLoc: function(f, j) { var g = this._markers.slice(); var e = !!this.answer.proximity; var i = c.geo.intersects(f, j); var h = c.geo.near(f, g, b); if (e || i || h) { g.push({ lat: f.lat, lon: f.lon }) } return g }, _renderUserLocation: function() { if (!this.views.userLocation && c.userLocator.hasLocation()) { this.views.userLocation = new c.Views.Mapkit.UserLocation({ model: c.userLocator, answer: this.answer, map: this.views.map }) } }, _renderMap: function() { var g = { padding: new w.mapkit.Padding(this._mapOffset), showsScale: w.mapkit.FeatureVisibility[this._hideScale ? "Hidden" : "Visible"], isScrollEnabled: true, showsMapTypeControl: !this._hideMapTypeControl, showsCompass: w.mapkit.FeatureVisibility[this._hideCompass ? "Hidden" : "Adaptive"], colorScheme: c.settings.isDarkTheme() ? w.mapkit.Map.ColorSchemes.Dark : w.mapkit.Map.ColorSchemes.Light }; if (this._markers.length > 1) { var h = c.geo.boundingBox(this._markers); var f = c.userLocator.hasLocation() && c.userLocator.userLocation; if (f) { h = c.geo.boundingBox(this._getMarkersWithUserLoc(f, h)) } g.region = this.mapkit.regionFromBoundingBox(h) } else { if (this._markers.length === 1) { var e = this._markers[0]; if (e.bbox) { g.region = this.mapkit.regionFromBoundingBox(e.bbox) } else { g.region = this.mapkit.regionFromLatLon(e.lat, e.lon) } } else { if (this.model.selectedLocation) { g.region = this.mapkit.regionFromLatLon(this.model.selectedLocation.lat, this.model.selectedLocation.lon) } } } this.views.map = new w.mapkit.Map(this.$el[0], g);
            this.views.map._impl._allowWheelToZoom = true;
            this.views.map.distances = w.mapkit.Map.Distances[c.geo.getUOM() === "metric" ? "Metric" : "Imperial"];
            this._updateMapType(); if (this._isFrozen) { setTimeout(function() { this.$el && this.$el.addClass("mapkit-static--show-legal") }.bind(this), 1000) } if (c.settings.isDefault("kay")) { c.settings.set("kay", "b", { saveToCloud: true }) } else { if (c.settings.get("kay") === "i") { this.views.map.addTileOverlay(new w.mapkit.TileOverlay(function() {})) } } this._originalMapRect = this.views.map.visibleMapRect;
            this.views.map.addEventListener("complete", function(i) { this._onMapLoad() }.bind(this));
            this.views.map.addEventListener("scroll-start", function(i) { this.emit("dragstart") }.bind(this));
            this.views.map.addEventListener("zoom-start", function(i) { this._onZoomStart() }.bind(this));
            this.views.map.addEventListener("map-type-change", function(i) { this._onMapTypeChange() }.bind(this));
            this.views.map.addEventListener("region-change-end", function(i) { this._onMapMove() }.bind(this));
            this.views.map.addEventListener("scroll-end", function(i) { this._onMapScrollZoom() }.bind(this));
            this.views.map.addEventListener("zoom-end", function(i) { this._onMapScrollZoom() }.bind(this)) }, _renderMarkers: function() { this.views.markers = this._markers.map(function(e) { var f = new c.Views.Mapkit.Marker({ model: e, answer: this.answer, isFrozen: this._isFrozen });
                this.views.map.addAnnotation(f.annotation);
                e.annotation = f.annotation; return f }.bind(this)) }, _createMap: function() { this._renderMap(); if (!this._hideLoc) { this._renderUserLocation() } this._renderMarkers() }, _render: function(e) { a.prototype._render.call(this, e);
            this.$clickOverlay = this.$(".js-mapkit-map-click-overlay"); if (this.mapkit.isMapInitialized) { this._createMap() } else { this.mapkit.init(function(g, f) { if (f) { this.mapkit.isMapInitialized = true;
                        this._createMap() } else {} }.bind(this)) } this.bindEvents([
                [this.$clickOverlay, "click", this._onClickOverlayClick]
            ]); if (this._isFrozen) { c.pixel.fire("map_si") } }, _saveCurrentViewport: function() { if (this.answer) { var h = this.views.map.region.center.latitude,
                    j = this.views.map.region.center.longitude,
                    g = this.views.map.region.span.latitudeDelta,
                    f = this.views.map.region.span.longitudeDelta,
                    e = (h + g / 2) + "," + (j - f / 2),
                    i = (h - g / 2) + "," + (j + f / 2);
                this.answer.set({ geo_bbox: { top_left: e, bottom_right: i } }) } }, _onIsMapExpandedChange: function() { if (this.answer.isMapExpanded) { this.$clickOverlay.addClass("is-hidden") } else { this.$clickOverlay.removeClass("is-hidden") } }, _onMapLoad: function() { this._saveCurrentViewport();
            this.emit("load") }, _onClickOverlayClick: function() { this.emit("click") }, _onZoomStart: function() { c.pixel.fire("map_eze") }, _onMapTypeChange: function() { this._updateMapType();
            c.pixel.fire("map_ete") }, _onMapMove: function() { this._saveCurrentViewport();
            this.emit("dragend") }, _onMapScrollZoom: function() { this.emit("scrollzoom") }, _onThemeChange: function() { if (this._isCurrentThemeDark !== c.settings.isDarkTheme()) { this.views.map.colorScheme = c.settings.isDarkTheme() ? w.mapkit.Map.ColorSchemes.Dark : w.mapkit.Map.ColorSchemes.Light;
                this._isCurrentThemeDark = !this._isCurrentThemeDark;
                this.answer.set("isDarkMap", this._isCurrentThemeDark) } } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Mapkit.StaticMap = function(c) { this._ops = {};
        a.call(this, c);
        this.bindEvents([
            [b.settings, "change:" + b.settings.THEME_KEY, this._onThemeChange],
            [b.duckbar.menu, "item-active", this._onTabChanged]
        ]) };
    b.Views.Mapkit.StaticMap.prototype = $.extend({}, a.prototype, { template: "mapkit_static_map", hide: function() { this.$el.hide() }, show: function() { this.$el.show() }, _render: function(c) { this._ops = c || this._ops;
            this._isCurrentThemeDark = b.settings.isDarkTheme();
            this._ops.url = b.mapkit.getStaticImageURL(this._ops);
            this._ops.legalLang = b.mapkit.getLegalLang();
            a.prototype._render.call(this, this._ops);
            b.pixel.fire("map_si");
            setTimeout(function() { this.$el && this.$el.addClass("mapkit-static--show-legal") }.bind(this), 1000);
            this.bindEvents([
                [this.$el, "click", this._onClick]
            ]) }, _onThemeChange: function() { if (this._isCurrentThemeDark !== b.settings.isDarkTheme()) { this._isCurrentThemeDark = !this._isCurrentThemeDark;
                this._rerender() } }, _onClick: function() { this.emit("click");
            b.pixel.fire("map_se") }, _onTabChanged: function() { if (this.$el && !this.$el.is(":visible")) { return } var e = this.$el.outerWidth(); var c = this.$el.outerHeight(); if (this._ops.width !== e || this._ops.height !== c) { this._ops.width = e;
                this._ops.height = c;
                this._rerender() } } }) }(DDG);
! function(c) { var a = c.Views.Base,
        b = { circle: "circle", number: "numbered", dot: "dot" };
    c.Views.Mapkit.Marker = function(e) { this.mapkit = e.mapkit || c.mapkit;
        this.answer = e.answer;
        this.model = e.model;
        this.markerType = b.circle; if (e.markerType) { this.markerType = e.markerType } else { if (this.answer && this.answer.items.length > 1) { this.markerType = (e.isFrozen && this.model.number > 3) ? b.dot : b.number } } e.markerType = this.markerType;
        e.number = (this.markerType === b.number) ? this.model.number : false;
        a.call(this, e);
        this.bindEvents([
            [this.answer, "change:selectedItem", this._updateSelectedState],
            [this.model, "change:selected", this._updateSelectedState],
            [this.model, "change:highlighted", this._onHighlightedChange]
        ]); if (this.answer.selectedItem) { this._updateSelectedState() } };
    c.Views.Mapkit.Marker.prototype = $.extend({}, a.prototype, { template: "mapkit_marker", _render: function(e) { a.prototype._render.call(this, e);
            this.annotation = this.mapkit.marker(this.model.lat, this.model.lon, function() { return this.$el[0] }.bind(this));
            this.$mkEl = this.$el.parent();
            this.$mkEl.addClass("mapkit-marker");
            this.bindEvents([
                [this.$el, "mouseenter", this._onMouseEnter],
                [this.$el, "mouseleave", this._onMouseLeave],
                [this.$el, "click", this._onClick],
                [this.$el, "touchstart", this._onClick]
            ]) }, _updateSelectedState: function() { this.$el.toggleClass("mgl-marker--selected", !!this.model.selected);
            this.$mkEl.toggleClass("mapkit-marker--selected", !!this.model.selected); if (!this.answer.selectedItem || this.model.selected) { this.$el.removeClass("mgl-marker--disabled");
                this.$mkEl.removeClass("mapkit-marker--disabled") } else { if (this.answer.selectedItem && !this.model.selected) { this.$el.addClass("mgl-marker--disabled");
                    this.$mkEl.addClass("mapkit-marker--disabled") } } }, _onHighlightedChange: function() { this.$el.toggleClass("mgl-marker--highlighted", !!this.model.highlighted);
            this.$mkEl.toggleClass("mapkit-marker--highlighted", !!this.model.highlighted) }, _onMouseEnter: function() { this.model.highlight() }, _onMouseLeave: function() { this.model.unhighlight() }, _onClick: function() { this.model.select() } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Mapkit.CloseControl = function(c) { a.call(this, c);
        this.bindEvents([
            [this.model, "change:isDarkMap", this._onMapTypeChange],
            [this.model, "change:isMapExpanded", this._onMapTypeChange]
        ]) };
    b.Views.Mapkit.CloseControl.prototype = $.extend({}, a.prototype, { template: "mapkit_close_control", show: function() { this.$el.show() }, hide: function() { this.$el.hide() }, _render: function(c) { c = c || {};
            a.prototype._render.call(this, $.extend({}, c, { isDarkMap: this.model.isDarkMap || b.settings.isDarkTheme(), isSafari: b.device.isSafari }));
            this.bindEvents([
                [this.$el, "click", this._onClick]
            ]) }, _onMapTypeChange: function() { if (this.model.isMapExpanded) { this._rerender() } }, _onClick: function(c) { c.preventDefault();
            c.stopPropagation();
            this.model.set("isMapExpanded", false);
            this.model.engaged();
            b.pixel.fire("map_ece") } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Mapkit.UserLocationControl = function(c) { a.call(this, c);
        this.bindEvents([
            [this.model, "change:waitingForLocation", this._onWaitingForLocationChange],
            [this.$el, "click", this._onClick]
        ]) };
    b.Views.Mapkit.UserLocationControl.prototype = $.extend({}, a.prototype, { template: "mapkit_user_location_control", hide: function() { this.$el.addClass("is-hidden") }, show: function() { this.$el.removeClass("is-hidden") }, _onWaitingForLocationChange: function() { this.$el.toggleClass("mapbox-control--waiting", this.model.waitingForLocation) }, _onClick: function(c) { c.preventDefault();
            c.stopPropagation();
            this.model.updateLocation({ force: true, updateType: "map" }) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Mapkit.UserLocationMarker = function(c) { this.mapkit = c.mapkit || b.mapkit;
        this.model = c.model;
        this.coords = { lat: this.model.userLocation.lat, lon: this.model.userLocation.lon };
        c.markerType = "loc";
        a.call(this, c) };
    b.Views.Mapkit.UserLocationMarker.prototype = $.extend({}, a.prototype, { template: "mapkit_marker", _render: function(c) { a.prototype._render.call(this, c);
            this.annotation = this.mapkit.marker(this.coords.lat, this.coords.lon, function() { return this.$el[0] }.bind(this)) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Mapkit.UserLocation = function(c) { this.answer = c.answer;
        this.map = c.map;
        a.call(this, c);
        this.bindEvents([
            [this.model, "change:userLocation", this._onUserLocationChange]
        ]) };
    b.Views.Mapkit.UserLocation.prototype = $.extend({}, a.prototype, { template: "mapkit_user_location", _addToDOM: function() { this.views.marker = new b.Views.Mapkit.UserLocationMarker({ model: this.model });
            this.map.addAnnotation(this.views.marker.annotation);
            this._updateLocation() }, _updateLocation: function() { var c = this.model.userLocation.lat; var e = this.model.userLocation.lon;
            this.views.marker.annotation.coordinate = b.mapkit.coord(c, e) }, _onUserLocationChange: function() { if (b.userLocator.hasLocation()) { this._updateLocation() } } }) }(DDG);
! function(c) { var b = c.Views.Base,
        a = "mapbox-position-picker__marker--moving";
    c.Views.Mapkit.PositionPicker = function(e) { this.model = e.model;
        b.call(this, e) };
    c.Views.Mapkit.PositionPicker.prototype = $.extend({}, b.prototype, { template: "mapkit_position_picker", show: function() { this.views.map && this.views.map.show() }, hide: function() { this.views.map && this.views.map.hide() }, _getPosition: function() { if (!this.views.map) { return null } var e = this.views.map.getCenter(); return new c.Models.UserLocation({ lat: e.lat, lon: e.lon, type: c.Models.UserLocation.MANUAL_LOCATION }) }, _render: function(e) { b.prototype._render.call(this, e);
            this._cacheElems(".js-mapkit-position-picker", ["map", "marker"]);
            this._createMap() }, _createMap: function() { this.views.map = new c.Views.Mapkit.Map({ model: this.model, appendTo: this.$map, hideLoc: true, hideMapTypeControl: true, hideScale: true, hideCompass: true });
            this.bindEvents([
                [this.views.map, "load", this._onMapLoaded],
                [this.views.map, "dragstart", this._onMapMoveStart],
                [this.views.map, "dragend", this._onMapMoveEnd]
            ]) }, _onMapLoaded: function() { this.$map.removeClass("is-loading") }, _onMapMoveStart: function() { this.$marker.addClass(a) }, _onMapMoveEnd: function() { this.$marker.removeClass(a);
            this.model.set("selectedLocation", this._getPosition()) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Attribution = function(c) { this.answer = c.answer;
        this.direction = c.direction;
        a.call(this, c);
        this.$(".js-attribution-link").click(this._onLinkClick.bind(this)) };
    b.Views.Attribution.prototype = $.extend({}, a.prototype, { template: "attribution", _onLinkClick: function(f) { f.preventDefault();
            f.stopPropagation(); if (!this.views.modal) { this.views.modal = new b.Views.AttributionModal({ answer: this.answer, direction: this.direction, appendTo: this.$el }) } var c = this.views.modal; if (c.isShowing) { c.hide() } else { b.pixel.fire("iaa", this.answer.pixelId);
                c.show() } this.answer.engaged() } }) }(DDG);
! function(b) { var a = b.Views.Modal;
    b.Views.AttributionModal = function(c) { a.call(this, c) };
    b.Views.AttributionModal.prototype = $.extend({}, a.prototype, { template: "attribution_modal", _render: function(e) { var f = e.answer.meta,
                g = f.developer,
                c = false;
            g.forEach(function(h) { if (h && h.name && h.name !== "DDG Team" && h.name !== "DuckDuckGo" && h.name !== "duckduckgo") { h.show = c = true } });
            a.prototype._render.call(this, { direction: e.direction, devs: c && g, meta: f }) } }) }(DDG);
! function(e) { var c = e.Views.Feedback,
        b = e.Views.Base,
        f = "is-hidden",
        a = "feedback-btn--clicked";
    c.Button = function(g) { this.category = g.category;
        this.clickPixel = g.clickPixel;
        this.noFaces = g.noFaces || false;
        this.extraData = g.extraData || {};
        b.call(this, g) };
    c.Button.prototype = $.extend({}, b.prototype, { template: "feedback_button", _render: function(g) { b.prototype._render.call(this, g);
            this._cacheElems(".js-feedback", ["start", "love", "nolove", "icon-wrap"]);
            this.bindEvents([
                [this.$start, "click", this._onStartClick],
                [this.$love, "click", this._onLoveClick],
                [this.$nolove, "click", this._onNoLoveClick]
            ]) }, _addModal: function(g) { if (!this.views.modal) { this.views.modal = new c.Modal({ category: this.category, extraInfo: $.param(this.extraData), appendTo: $("body") });
                this.views.modal.on("hidden", this._hideFaces.bind(this)) } this.views.modal.show(g) }, _showFaces: function() { this.$iconwrap.removeClass(f);
            setTimeout(function() { this.$el.addClass(a) }.bind(this), 100) }, _hideFaces: function() { this.$el.removeClass(a);
            setTimeout(function() { this.$iconwrap.addClass(f) }.bind(this), 200) }, _onStartClick: function(g) { g.preventDefault(); if (this.clickPixel) { e.pixel.fire(this.clickPixel) } if (this.noFaces) { this._addModal(false) } else { this._showFaces();
                e.$doc.one("click", this._onDocumentClick.bind(this)) } return false }, _onDocumentClick: function(g) { if (!this.$love.is(g.target) && !this.$nolove.is(g.target)) { this._hideFaces() } }, _onLoveClick: function(g) { g.preventDefault();
            this._addModal(true) }, _onNoLoveClick: function(g) { g.preventDefault();
            this._addModal(false) } }) }(DDG);
! function(c) { var b = c.Views.Feedback,
        a = c.Views.Base,
        e = "is-hidden";
    b.ReportAdsButton = function(f) { this.category = f.category;
        this.extraData = f.extraData || {};
        this.whichAd = f.whichAd;
        a.call(this, f) };
    b.ReportAdsButton.prototype = $.extend({}, a.prototype, { template: "report_ads_button", _render: function(f) { a.prototype._render.call(this, f);
            this._cacheElems(".js-report-ad", ["start"]);
            this.bindEvents([
                [this.$start, "click", this._onAdReportClick]
            ]) }, _showModal: function(f) { if (!this.views.modal) { this.views.modal = new b.Modal({ category: "ads", adInfo: JSON.stringify(f), appendTo: $("body") }) } this.views.modal.show(false);
            this.views.modal.on("submitted", this._hideReportAdButton.bind(this)) }, _hideReportAdButton: function() { this.$start.addClass(e) }, _onAdReportClick: function(g) { g.preventDefault(); var f = this._getAdData();
            this._showModal(f);
            f.adt = encodeURIComponent(f.adt);
            f.adsnippet = encodeURIComponent(f.adsnippet);
            c.pixel.fire("readsb", f) }, _getAdData: function() { var f = c.page.ads.getAds();
            f = f[this.whichAd]; return { whichad: this.whichAd, adt: f.t, adsrc: f.d, adgood: f.relevancy ? f.relevancy.is_good_v8 : 0, adsnippet: f.a } } }) }(DDG);
! function(j) { var g = j.Views.Feedback,
        b = j.Views.Modal,
        f = "fbc",
        c = 50,
        n = 500,
        e = "other",
        k = "security",
        a = "is-hidden",
        m = "is-invisible",
        i = "is-disabled",
        h = ["ads"];
    g.Modal = function(o) { this.sourceName = o.sourceName || "";
        this.defaultCategory = o.category || "";
        this.category = o.category || "";
        this.categoryValue = o.categoryValue || "";
        this.issue = "";
        this.extraInfo = o.extraInfo;
        this.adInfo = o.adInfo;
        o.model = o.model || new j.Models.Feedback();
        this.hasIssues = this._checkHasIssues();
        this.requiresSuggestion = h.indexOf(this.category) !== -1;
        b.call(this, o);
        this.bindEvents([
            [this.model, "change:success", this._onFeedbackSuccess],
            [this.model, "change:error", this._onFeedbackError]
        ]) };
    g.Modal.prototype = $.extend({}, b.prototype, { template: "feedback_modal", show: function(o) { this.$suggestionlabel.html(o ? lp("feedback form", "What did you like?") : lp("feedback form", "What could be better?"));
            this._isPositive = o;
            this.$form.removeClass(a);
            this.$success.addClass(a);
            this._showHideSuggestions();
            this._toggleSubmitButton(); if (!this._isPositive && this.category && this.hasIssues) { this.$issues.removeClass(m);
                this.$dropdown.val(this.category);
                this._setCategoryIssues(this.categoryValue) } b.prototype.show.call(this) }, _render: function(r) { var p = [{ text: lp("feedback form", "Pick a category"), val: "" }]; var o = [{ text: l("Results"), val: "organics" }, { text: lp("feedback form", "Wikipedia Info"), val: "wikipedia" }, { text: lp("feedback form", "Advertisements"), val: "ads" }, { text: l("Images"), val: "images" }, { text: l("Videos"), val: "videos" }, { text: l("News"), val: "news" }, { text: lp("feedback form", "Maps / Location Info"), val: "maps" }, { text: l("Products"), val: "products" }, { text: lp("feedback form", "Search Box"), val: "search box" }, { text: lp("feedback form", "Security Issue (Opens in New Tab)"), val: "security" }, { text: lp("feedback form", "Settings"), val: "settings" }, { text: lp("feedback form", "Date Filters"), val: "filters" }, { text: lp("feedback form", "Other"), val: e }]; if (r.categoryName) { this.categoryName = r.categoryName; for (var q = 0; q < o.length; q++) { if (o[q].val === r.category) { o[q].text = this.categoryName; break } } } b.prototype._render.call(this, $.extend({}, r, { defaultCategory: this.categoryName || this.defaultCategory, options: p.concat(o), query: j.get_query(), inputMax: c, textareaMax: n }));
            this._cacheElems(".js-feedback", ["form", "success", "dropdown", "issues", "suggestion", "suggestion-label", "submit"]); if (this.category) { this.$dropdown.val(this.category) } this.bindEvents([
                [this.$dropdown, "change", this._onCategoryChange],
                [this.model, "issue-selected", this._onIssueChange],
                [this.$submit, "click", this._onSubmitClick],
                [this.$suggestion, "input", this._toggleSubmitButton]
            ]) }, hide: function() { this._reset();
            b.prototype.hide.call(this) }, _showSuccessMessage: function() { this.$success.removeClass(a);
            this.$form.addClass(a) }, _onSubmitClick: function(y) { y.preventDefault(); if (this.$submit.hasClass(i)) { return } this.$submit.addClass(i); var o = j.duckbar.getActiveTab(),
                p = o ? o.pixelId : "",
                s = j.duckbar.sideModules || {}; var A = Object.keys(s).map(function(B) { return B.toLowerCase() + "_module" }).concat([p]).join(", "); var x = this.$suggestion.val(); if (this.extraInfo) { x += " | " + this.extraInfo } var u = { ia: A, comment: x, rating: this._isPositive ? 1 : -1, looking_for: this.categoryValue || this.category, category_issue: this.issue, adx: j.page.ads.adx, adx_name: j.page.ads.adxExperiment }; if (u.looking_for === "ads") { u.ads_issue = u.category_issue;
                delete u.category_issue;
                delete u.ad_issue } if (u.category_issue === "great") { u.rating = 1 } var r = j.page.ads.getAds(); var q = (u.rating === -1 && u.looking_for === "ads" && r); if (this.adInfo && u.looking_for === "ads") { this.adInfo = JSON.parse(this.adInfo);
                u = $.extend(u, this.adInfo) } else { if (!this.adInfo && q) { u.whichad = "all";
                    u.adt = "";
                    u.adsrc = "";
                    u.adsnippet = "";
                    u.adgood = ""; for (var t = 0; t < r.length; t++) { var z = r[t],
                            v;
                        v = (t < r.length - 1) ? v = ", " : v = "";
                        u.adt += z.t + v;
                        u.adsrc += z.d + v;
                        u.adsnippet += z.a + v; if (z.relevancy) { u.adgood += z.relevancy.is_good_v8 + v } else { u.adgood += 0 + v } } } } this.model.send(u) }, _reset: function() { this.$submit.addClass(i);
            this.category = this.defaultCategory;
            this.hasIssues = this._checkHasIssues();
            this.issue = "";
            this.$dropdown.val(this.defaultCategory);
            this.$issues.addClass(m);
            this.isOtherCategory = false;
            this.isOtherIssue = false;
            this.$suggestion.val("");
            this.requiresSuggestion = h.indexOf(this.category) !== -1;
            this.adInfo = null }, _toggleSubmitButton: function() { var o = this._shouldEnableSubmit();
            this.$submit.toggleClass(i, !o) }, _setCategoryIssues: function(p) { var o = this._getIssues(p);
            this.$issues.empty(); if (this.defaultCategory && this.category === this.defaultCategory && this.sourceName) { o.push({ text: "I don't trust " + this.sourceName + " results", val: "untrusted" }) } if (this.category !== "ads") { o.unshift({ text: "This is great!", val: "great" }) } o.push({ text: lp("feedback form", "Other"), val: e });
            this.views.issues = new g.IssueList({ model: this.model, appendTo: this.$issues, issues: o }) }, _onCategoryChange: function(q) { if (this.defaultCategory) { j.pixel.fire(f) } var p = $(q.target),
                o = p.val(); if (o === k) { return nug(DDG.get_http_redirect({ href: "https://hackerone.com/duckduckgo" })) } this.$suggestion.val("");
            this.issue = "";
            this.isOtherIssue = false;
            this.category = o;
            this.isOtherCategory = o === e;
            this.hasIssues = this._checkHasIssues();
            this.requiresSuggestion = h.indexOf(this.category) !== -1;
            this.$issues.toggleClass(m, !this.hasIssues || this._isPositive); if (this.hasIssues) { this._setCategoryIssues(this.category) } this._showHideSuggestions();
            this._toggleSubmitButton() }, _onIssueChange: function() { var o = this.$issues.find(".js-feedback-radio:checked").val();
            this.issue = o;
            this.isOtherIssue = o === e;
            this.$suggestion.val("");
            this._showHideSuggestions();
            this._toggleSubmitButton() }, _showHideSuggestions: function() { var o = true; if ((this._isPositive && this.category) || this.requiresSuggestion || (this.category && !this.hasIssues) || (this.category && this.hasIssues && this.isOtherIssue)) { o = false } var p = this.category === "ads" ? l("Feedback") : lp("feedback form", "Optional");
            this.$suggestion.attr("placeholder", p);
            this.$suggestion.toggleClass(a, o) }, _shouldEnableSubmit: function() { var p = this.$suggestion.val().trim().length > 0,
                o = this.category.length,
                r = o && this.category === "ads",
                q = this.issue.length; if (!o) { return false } if (this._isPositive && !this.isOtherCategory) { return true } if (r) { if (!p) { return false } if (q || this._isPositive) { return true } } else { if (this.isOtherCategory && p) { return true } else { if (!this.hasIssues) { return true } else { if (this.hasIssues && q) { return true } } } } return false }, _checkHasIssues: function() { if (this.category === "ads") { return true } if (!j.device.isEnglish) { return false } return DDG.Data.FeedbackIssues.hasOwnProperty(this.category) }, _getIssues: function(o) { if (o) { return DDG.Data.FeedbackIssues[o].slice() } return DDG.Data.FeedbackIssues[this.category].slice() }, _getLookingFor: function() { if ((this.category === this.defaultCategory) && this.categoryValue) { return this.categoryValue } return this.category }, _onFeedbackSuccess: function() { if (this.model.success) { this._reset();
                this._showSuccessMessage() } }, _onFeedbackError: function() { if (this.model.error) { this.hide();
                this._reset() } } }) }(DDG);
! function(c) { var b = c.Views.Feedback,
        a = c.Views.Base;
    b.FeedbackPrompt = function(e) { this.category = e.category;
        this.extraData = e.extraData || {};
        e.showYesNo = e.showYesNo !== false;
        this.categoryName = e.categoryName;
        this.categoryValue = e.categoryValue;
        this.sourceName = e.sourceName;
        a.call(this, e);
        this.bindEvents([
            [".js-feedback-prompt-yes", "click", this._onYesClicked],
            [".js-feedback-prompt-no", "click", this._onNoClicked]
        ]) };
    b.FeedbackPrompt.prototype = $.extend({}, a.prototype, { template: "feedback_prompt", _showModal: function(e) { if (!this.views.modal) { this.views.modal = new b.Modal({ sourceName: this.sourceName, category: this.category, categoryName: this.categoryName, categoryValue: this.categoryValue, extraInfo: $.param(this.extraData), appendTo: $("body") }) } this.views.modal.show(e) }, _onYesClicked: function(f) { f.preventDefault();
            c.pixel.fire("fbp", this.category, "yes", this.extraData);
            this._showModal(true) }, _onNoClicked: function(f) { f.preventDefault();
            c.pixel.fire("fbp", this.category, "no", this.extraData);
            this._showModal(false) } }) }(DDG);
! function(c) { var b = c.Views.Modal,
        e = "is-hidden",
        a = "is-disabled",
        f = "other";
    c.Views.ReportImageModal = function(g) { g.appendTo = g.appendTo || ".js-site-wrapper";
        g.model = g.model || new c.Models.Feedback();
        b.call(this, g);
        this.model.thumbnail = g.thumbnail;
        this.model.image = g.image;
        this.bindEvents([
            [this.model, "change:success", this._onFeedbackSuccess],
            [this.model, "change:error", this._onFeedbackError]
        ]) };
    c.Views.ReportImageModal.prototype = $.extend({}, b.prototype, { template: "report_image_modal", hide: function() { this._reset();
            b.prototype.hide.call(this) }, show: function() { this.$form.removeClass(e);
            this.$success.addClass(e);
            b.prototype.show.call(this) }, _onDropdownChange: function(g) { var h = this.$dropdown.val(); if (h === f) { this.$comment.focus() } this._toggleSubmitButton() }, _onFeedbackError: function() { if (this.model.error) { this.hide() } }, _onFeedbackSuccess: function() { if (this.model.success) { this._reset();
                this._showSuccessMessage() } }, _onSubmitClick: function(i) { i.preventDefault(); if (this.$submit.hasClass(a)) { return } this.$submit.addClass(a); var j = c.duckbar.getActiveTab(),
                g = j ? j.pixelId : ""; var h = { comment: this.$comment.val(), reason: this.$dropdown.val(), tab: g, type: "images" };
            this.model.send(h) }, _render: function(h) { var g = [{ text: lp("feedback form", "Pick a specific problem"), val: "" }, { text: lp("Report image modal", "Not relevant"), val: "not_relevant" }, { text: lp("Report image modal", "Copyright violation"), val: "copyright_violation" }, { text: lp("Report image modal", "Explicit content"), val: "explicit" }, { text: lp("Report image modal", "Child sexual abuse"), val: "child_abuse" }, { text: lp("feedback form", "Other"), val: f }];
            b.prototype._render.call(this, $.extend({}, h, { thumbnail: this.model.thumbnail, options: g }));
            this._cacheElems(".js-feedback", ["comment", "dropdown", "form", "submit", "success"]);
            this.bindEvents([
                [this.$dropdown, "change", this._onDropdownChange],
                [this.$submit, "click", this._onSubmitClick],
                [this.$comment, "input", this._toggleSubmitButton]
            ]) }, _reset: function() { this.$submit.addClass(a);
            this.$dropdown.val("");
            this.$comment.val("") }, _showSuccessMessage: function() { this.$success.removeClass(e);
            this.$form.addClass(e) }, _toggleSubmitButton: function() { var i = this.$comment.val().trim(),
                j = this.$dropdown.val(),
                h = j === f,
                g = h ? i.length : j.length;
            this.$submit.toggleClass(a, !g) } }) }(DDG);
! function(c) { var b = c.Views.Feedback,
        a = c.Views.Base;
    b.IssueList = function(e) { this.issues = e.issues;
        e.model = e.model;
        a.call(this, e) };
    b.IssueList.prototype = $.extend({}, a.prototype, { template: "feedback_issue_list", _render: function(e) { a.prototype._render.call(this, $.extend({}, e));
            this._cacheElems(".js-feedback", ["radio"]);
            this.bindEvents([
                [this.$radio, "change", this._onRadioChange]
            ]) }, _onRadioChange: function() { this.model.emit("issue-selected") } }) }(DDG);
! function(e) { var b = e.Views.Dropdowns.SelectListDropdown,
        c = e.Views.Dropdowns,
        a = "kam";
    c.DirectionDropdown = function(f) { this.model = f.model = e.directionSource;
        f.key = "directions";
        f.header = lp("maps_places", "Choose service");
        f.horizontalPos = "center";
        f.verticalPos = f.verticalPos || "bottom";
        f.showSelected = true;
        this._loc = f.loc;
        this._answer = f.answer;
        b.call(this, f);
        this._loadSourceFromSettings() };
    c.DirectionDropdown.prototype = $.extend({}, b.prototype, { changeVerticalPos: function(f) { if (this.views.modal) { this.views.modal.$el.removeClass("modal--popout--" + this._verticalPos);
                this.views.modal.$el.addClass("modal--popout--" + f) } this._verticalPos = this.modalOps.position = f;
            this._repositionModal() }, open: function() { b.prototype.open.call(this);
            this._answer && this._answer.engaged() }, _loadSourceFromSettings: function() { var f = e.settings.get(a); if (f) { this.model.select(f) } }, _getURL: function() { return this.model.getDirectionsURL(this._loc) }, _onItemClick: function(f) { b.prototype._onItemClick.call(this, f);
            e.settings.set(a, f, { saveToCloud: true }) } }) }(DDG);
! function(c) { var b = c.Views.Dropdowns,
        a = c.Views.Base;
    b.FilterContainer = function(e) { this._answer = e.answer; if (this._answer) { this._safeSearch = this._answer.safeSearch;
            this._region = this._answer.region;
            this._date = this._answer.date } else { this._safeSearch = this._region = this._date = true } a.call(this, e);
        this._initFilters() };
    b.FilterContainer.prototype = $.extend({}, a.prototype, { _initFilters: function() { this.views.filters = []; if (this._region) { this.views.filters.push(new b.RegionFilter({ appendTo: this.$el })) } if (this._safeSearch && !c.page.isSafeDDG) { this.views.filters.push(new b.SafeSearchFilter({ appendTo: this.$el })) } if (this._date) { this.views.filters.push(new b.DateFilter({ appendTo: this.$el })) } if (this._answer && this._answer.parameters) { this._answer.parameters.forEach(function(f) { var e = new c.Views.AnswerBar.Meta.FilterDropdown({ model: f, answer: this._answer, appendTo: this.$el });
                    this.views.filters.push(e) }.bind(this)) } this.views.filters.forEach(function(e) { e.on("opened", this._onFilterOpen.bind(this, e)) }.bind(this)) }, _onFilterOpen: function(e) { if (this._currentFilter && this._currentFilter !== e) { this._currentFilter.close() } this._currentFilter = e } }) }(DDG);
! function(c) { var b = c.Views.Dropdowns,
        a = b.Base;
    b.DateFilter = function(e) { a.call(this, e);
        c.search.on("change:dateFilterId", this._rerender.bind(this)) };
    b.DateFilter.prototype = $.extend({}, a.prototype, { modalClass: "DateFilterModal", _render: function(e) { e = e || {};
            e.isActive = c.search.dateFilterId;
            e.key = "date";
            e.buttonContent = c.search.getDateFilterName();
            a.prototype._render.call(this, e) }, open: function() { c.pixel.fire("dfc", "f", { iao: c.duckbar.activeTabId !== "web" ? 1 : 0 });
            a.prototype.open.call(this) } }) }(DDG);
! function(c) { var b = c.Views.Dropdowns,
        a = c.Views.Modal;
    b.DateFilterModal = function(e) { a.call(this, e) };
    b.DateFilterModal.prototype = $.extend({}, a.prototype, { template: "dropdown_modal", _render: function(e) { a.prototype._render.call(this, { isPopover: e.isPopover, header: e.isPopover && l("Filter by date"), values: c.search.getDateFilters(), key: "date" });
            this.$(".js-dropdown-items").click(this._onFilterClick.bind(this)) }, _onFilterClick: function(j) { j.preventDefault(); var f = $(j.currentTarget),
                k = f.attr("data-value"),
                h = c.search,
                i = c.Data.HiddenFields.DATE_FILTER; if (k && k !== "") { c.hidden.set(i, k) } else { c.hidden.clear(i) } var g = !h.dateFilterId && k;
            c.pixel.fire("dfc", "ci", { fd: g ? 1 : 0 });
            h.set("dateFilterId", k);
            h.requery() } }) }(DDG);
! function(c) { var b = c.Views.Dropdowns,
        a = b.Base;
    b.RegionFilter = function(e) { a.call(this, e); var f = c.settings.region;
        this.bindEvents([
            [f, "change:id", this._rerender],
            [f, "change:suggestedRegion", this._rerender]
        ]); if (!f.disabledSuggested()) { f.fetchSuggested() } };
    b.RegionFilter.prototype = $.extend({}, a.prototype, { template: "region_filter", modalClass: "RegionFilterModal", _render: function() { var f = c.settings.region,
                e = f.hasRegion(),
                g; if (e) { g = f.getId() } else { if (f.hasPrevRegion()) { g = f.prevId } else { g = f.suggestedRegion } } a.prototype._render.call(this, { hasActiveRegion: e, hasRegion: g, iconURL: g && f.getSmallIconURL(g), regionName: f.getName(g) });
            this._cacheElems(".js-region-filter", ["switch"]);
            this.$switch.on("click", this._onSwitchClick.bind(this)) }, open: function() { c.pixel.fire("rgc", "f", { iao: c.duckbar.activeTabId !== "web" ? 1 : 0 });
            a.prototype.open.call(this) }, _onSwitchClick: function(k) { k.preventDefault();
            k.stopPropagation(); var h, g, j = c.settings.region,
                i = new Date().getTime(); if (j.hasRegion()) { this.$switch.removeClass("is-on");
                h = j.getDefaultId();
                g = "off" } else { this.$switch.addClass("is-on");
                h = j.getPrevId() || j.suggestedRegion;
                g = "on" } var f = !j.getPrevId() && j.getId() === j.getDefaultId();
            c.pixel.fire("rgc", "s", g, { fr: f ? 1 : 0 });
            j.setId(h, { saveToSettings: true, fallbackToURLParam: true }, function() { var e = new Date().getTime() - i;
                setTimeout(function() { c.search.requery() }, Math.min(DDG.animation_speed - e, 0)) }) } }) }(DDG);
! function(e) { var c = e.Views.Dropdowns,
        b = e.Views.Modal,
        a = "is-highlighted",
        f = 300;
    c.RegionFilterModal = function(g) { g.model = e.settings.region;
        b.call(this, g);
        this.bindEvents([
            [e.keyboard, "up.modal", this._onUpArrow],
            [e.keyboard, "down.modal", this._onDownArrow],
            [e.keyboard, "enter.modal", this._onEnter]
        ]) };
    c.RegionFilterModal.prototype = $.extend({}, b.prototype, { template: "region_filter_modal", cursorIndex: -1, hide: function() { b.prototype.hide.call(this);
            this._unfocusKeyboard() }, show: function() { b.prototype.show.call(this); if (!e.device.isMobileDevice) { this.$input.focus() } }, pointAt: function(g) { b.prototype.pointAt.call(this, g);
            this._top = parseInt(this.$list.offset().top, 10) }, _render: function(g) { this._allRegions = this.model.getAll();
            b.prototype._render.call(this, $.extend({ hasRegionOrSuggested: this.model.hasRegionOrSuggested() }, g));
            this._cacheElems(".js-region-filter", ["list", "input", "clear"]);
            this._renderRegions();
            this.$input.keyup(this._onInputKeyUp.bind(this));
            this.$input.click(this._onInputClick.bind(this));
            this.$clear.click(this._onClearClick.bind(this)) }, _renderRegions: function() { var g = this._filteredRegions || this._allRegions;
            this._highlightIdx = -1; if (!g || !g.length) { this.$list.empty() } else { this.$list.html(e.exec_template("region_filter_modal_items", { regions: g, showListHeader: e.device.isMobile && this.model.hasRegionOrSuggested() && !this._filteredRegions }));
                this.$links = this.$(".js-region-filter-link");
                this.$list.find(".js-region-filter-clear").on("click", this._onClearClick.bind(this));
                this.$links.on("mouseenter touchstart", this._onItemMouseEnter.bind(this)).on("mouseleave", this._onItemMouseLeave.bind(this)).click(this._onRegionClick.bind(this)) } }, _clearFilter: function() { if (this._filteredRegions) { delete this._filteredRegions;
                this._renderRegions() } this.$input.val("") }, _updateHighlightedItem: function() { this.$("." + a).removeClass(a); if (this._highlightIdx === -1) { this.$input.focus() } else { var j = this.$links[this._highlightIdx]; if (j) { var i = $(j),
                        g = i.outerHeight(),
                        k = parseInt(i.offset().top, 10),
                        h = k + g;
                    i.addClass(a); if (h >= this._top + f) { this.$list.scrollTop(this.$list.scrollTop() + g) } else { if (k < this._top) { this.$list.scrollTop(this.$list.scrollTop() - g) } } } } }, _focusKeyboard: function() { if (!this._keyboardFocus) { this._keyboardFocus = true;
                e.$doc.on("mousemove.region", this._onMouseMove.bind(this)) } }, _unfocusKeyboard: function() { if (!this._keyboardFocus) { return } this._keyboardFocus = false;
            e.$doc.off("mousemove.region") }, _sendRegionSelectedPixel: function(o, k) { var j = this.model,
                i = j.getDefaultId(),
                n = i === o,
                m = j.getPrevRegions().indexOf(o) > -1,
                h = n ? "d" : m ? "p" : "n",
                g;
            g = !j.getPrevId() && j.getId() === i;
            e.pixel.fire("rgc", k, h, { fr: g ? 1 : 0 }) }, _onInputKeyUp: function(h) { if (e.keyboard.keyCodeIsOneOf(h.keyCode, ["up", "down", "enter", "escape"])) { return false } var g = this.$input.val().toLowerCase(); if (g) { this._filteredRegions = this._allRegions.filter(function(i) { return i.name.toLowerCase().indexOf(g.toLowerCase()) > -1 }) } else { delete this._filteredRegions } e.pixel.fire("rgc", "ku");
            this._renderRegions() }, _onItemMouseEnter: function(i) { if (this._keyboardFocus) { return } var h = $(i.target),
                g = parseInt(h.data("index"), 10); if ($.isNumeric(g) && this.highlightIdx !== g) { this._highlightIdx = g;
                this._updateHighlightedItem() } }, _onItemMouseLeave: function(i) { if (this._keyboardFocus) { return } var h = $(i.target),
                g = parseInt(h.data("index"), 10); if ($.isNumeric(g) && this.highlightIdx === g) { this._highlightIdx = -1;
                this._updateHighlightedItem() } }, _onMouseMove: function() { this._unfocusKeyboard() }, _onUpArrow: function() { this._highlightIdx--;
            this._focusKeyboard();
            this._highlightIdx = Math.max(this._highlightIdx, -1);
            this._updateHighlightedItem() }, _onDownArrow: function() { this._highlightIdx++;
            this._focusKeyboard();
            this._highlightIdx = Math.min(this._highlightIdx, this.$links.length - 1);
            this._updateHighlightedItem() }, _onEnter: function() { var i; if (this._highlightIdx > -1) { i = this._highlightIdx } else { if (this._filteredRegions && this._filteredRegions.length === 1) { i = 0 } } if ($.isNumeric(i)) { var g = this.$links[i],
                    h = $(g).data("id");
                this._sendRegionSelectedPixel(h, "ei");
                this.model.setId(h, { saveToSettings: true, fallbackToURLParam: true }, function() { e.search.requery() }) } }, _onInputClick: function(g) { g.stopPropagation() }, _onClearClick: function(g) { g.preventDefault();
            e.pixel.fire("rgc", "cl");
            this.model.reset(function() { this.model.disableSuggested(function() { e.search.requery() }) }.bind(this)) }, _onRegionClick: function(h) { var g = $(h.target),
                i = g.data("id") || g.parent().data("id");
            this._sendRegionSelectedPixel(i, "ci");
            this.model.setId(i, { saveToSettings: true, fallbackToURLParam: true }, function() { this.hide();
                e.search.requery() }.bind(this)) } }) }(DDG);
! function(c) { var b = c.Views.Dropdowns,
        a = c.Views.Dropdowns.Base;
    b.SafeSearchFilter = function(e) { e.model = c.settings.safeSearch;
        a.call(this, e);
        this.bindEvents([
            [this.model, "change:id", this._rerender]
        ]);
        this.modalOps = { entryPoint: e.entryPoint || "of" } };
    b.SafeSearchFilter.prototype = $.extend({}, a.prototype, { modalClass: "SafeSearchFilterModal", _render: function(e) { e = e || {};
            e.isActive = this.model.isActive();
            e.key = "safe-search";
            e.buttonContent = l("Safe Search:") + " " + this.model.getName();
            a.prototype._render.call(this, e) } }) }(DDG);
! function(c) { var b = c.Views.Dropdowns,
        a = c.Views.Modal;
    b.SafeSearchFilterModal = function(e) { this.entryPoint = e.entryPoint;
        e.model = c.settings.safeSearch;
        a.call(this, e) };
    b.SafeSearchFilterModal.prototype = $.extend({}, a.prototype, { template: "dropdown_modal", _render: function(e) { a.prototype._render.call(this, { isPopover: e.isPopover, header: e.isPopover && l("Safe Search"), showDescriptions: true, values: this.model.getAll(), key: "safe-search" });
            this.$(".js-dropdown-items").click(this._onFilterClick.bind(this)) }, _onFilterClick: function(g) { var f = $(g.currentTarget),
                h = f.attr("data-value");
            this.model.setId(h, function() { c.search.requery() });
            c.pixel.fire("sss", "f", { v: c.settings.safeSearch.getId(), ep: this.entryPoint }) } }) }(DDG);
! function(c) { var b = c.Views.Dropdowns,
        a = b.Base;
    b.SettingsDropdown = function(e) { a.call(this, e);
        c.require("settings", this._renderDropdown.bind(this)) };
    b.SettingsDropdown.prototype = $.extend({}, a.prototype, { template: "settings_dropdown", modalClass: "SettingsDropdownModal", _render: function(e) { $.noop() }, _renderDropdown: function(e) { e = e || {};
            a.prototype._render.call(this, e) }, open: function() { a.prototype.open.call(this);
            c.$doc.off("click.modal");
            c.$doc.on("click.modal", this._onModalClick.bind(this)) }, _onModalClick: function(g) { var f = this.views.modal.$el.has(g.target); if (!f.length) { a.prototype.close.call(this) } } }) }(DDG);
! function(c) { var b = c.Views.Dropdowns,
        a = c.Views.Modal;
    b.SettingsDropdownModal = function(e) { this.dropdownSettings = c.settings.getDropdownSettings();
        a.call(this, e) };
    b.SettingsDropdownModal.prototype = $.extend({}, a.prototype, { template: "settings_dropdown_modal", show: function() { a.prototype.show.call(this);
            c.pixel.fire("sdd", "e") }, _render: function(e) { a.prototype._render.call(this, { isPopover: e.isPopover, header: e.isPopover && lp("feedback form", "Settings") });
            this._cacheElems(".js-settings-dropdown", ["appearance", "general", "reset-appearance", "reset-general"]);
            this._renderDropdownSettings() }, _renderDropdownSettings: function() { for (var i in this.dropdownSettings) { this["$reset" + i].on("click", { category: i }, this._onReset.bind(this)); for (var k in this.dropdownSettings[i]) { var j = c.settings.getData(k),
                        f = this["$" + i],
                        e = j.type; if (k === "kae") { e = "theme" } var h = c.settings.getFieldClass(e); var g = new c.Views.Settings[h]({ id: k, settings: c.settings, data: j, appendTo: f, source: "d" });
                    c.settings.on("change:" + k, this._showResetLink.bind(this));
                    g.$el.children(".frm__label").attr("title", window.lp("settings", g.data.desc)) } } this._showResetLink() }, _onReset: function(j) { var h = j.data.category,
                g = this.dropdownSettings[h],
                k = [];
            c.pixel.fire("sdr", h); for (var i in g) { if (!c.settings.isDefault(i)) { var f = c.settings.getDefault(i); if (i === c.settings.THEME_KEY) { c.settings.setTheme(f, { saveToCloud: true, updateURLParams: true, fallbackToUrlParam: true }) } else { c.settings.set(i, f) } k.push(i) } } if (k.indexOf(c.settings.LANGUAGE_KEY) > -1) { window.location.reload() } }, _showResetLink: function() { for (var f in this.dropdownSettings) { var e = this["$reset" + f]; for (var g in this.dropdownSettings[f]) { var h = false; if (!c.settings.isDefault(g)) { h = true; break } } h ? e.show() : e.hide() } } }) }(DDG);
! function(c) { var b = c.Views.Dropdowns,
        a = b.Base;
    b.UserLocationFilter = function(e) { e.model = c.userLocator;
        a.call(this, e);
        this.bindEvents([
            [this.model, "change:waitingForLocation", this._onWaitingForLocationChange]
        ]) };
    b.UserLocationFilter.prototype = $.extend({}, a.prototype, { template: "user_location_filter_dropdown", modalClass: "UserLocationFilterModal", _render: function(e) { e = e || {};
            e.buttonContent = this.model.userLocation.desc || [this.model.userLocation.lat.toFixed(2), this.model.userLocation.lon.toFixed(2)].join(", ");
            a.prototype._render.call(this, e) }, _repositionModal: function() { if (!this.views.modal) { return } var e = this.$button.offset();
            e.top += this.$el.outerHeight() + 8;
            this.views.modal.pointAt(e) }, _onWaitingForLocationChange: function() { if (this.model.waitingForLocation) { this.$spinner = c.$exec_template("spinner", { className: "user-loc-filter__spinner" });
                this.$el.append(this.$spinner) } else { if (this.$spinner) { this.$spinner.remove();
                    delete this.$spinner } } } }) }(DDG);
! function(c) { var b = c.Views.Dropdowns,
        a = c.Views.Modal;
    b.UserLocationFilterModal = function(e) { a.call(this, e);
        this.bindEvents([
            [c.userLocator, "change:userLocation", this._onUserLocationChanged]
        ]);
        c.pixel.fire("lfmi", c.userLocator.userLocation.type) };
    b.UserLocationFilterModal.prototype = $.extend({}, a.prototype, { template: "user_location_filter_modal", _render: function(f) { a.prototype._render.call(this, f); var e = this.$(".js-user-loc-filter-modal-btn");
            this.views.button = new c.Views.UserLocationButton({ updateButton: true, clickPixel: "lfmc", updateType: "modal", appendTo: e });
            this.views.error = new c.Views.UserLocationError({ updateType: "modal", showInstructions: false, small: true, appendTo: e }) }, _onUserLocationChanged: function() { this.hide() } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.UserLocationCTA = function(c) { c.model = b.userLocator;
        a.call(this, c);
        b.pixel.fire("lctai") };
    b.Views.UserLocationCTA.prototype = $.extend({}, a.prototype, { template: "user_location_cta", _render: function() { a.prototype._render.call(this);
            this._cacheElems(".js-user-loc-cta", ["show-more", "more", "dismiss", "initial"]);
            this.views.button = new b.Views.UserLocationButton({ clickPixel: "lctac", updateType: "cta", before: this.$more });
            this.views.error = new b.Views.UserLocationError({ updateType: "cta", showInstructions: true, appendTo: this.$initial });
            this.bindEvents([
                [this.$showmore, "click", this._onShowMoreClick],
                [this.$dismiss, "click", this._onDismissClick],
                [this.model, "change:userLocation", this._onCurrentLocationChange],
                [this.model, "change:finishedSurvey", this._onFinishedSurveyChange],
                [this.model, "change:retryLocation", this._onRetryLocationChange]
            ]) }, _hide: function() { this.$el.addClass("is-hidden") }, _showSurvey: function() { this.model.set("showedSurvey", true);
            this.$initial.addClass("is-hidden");
            this._hideMore();
            this.views.survey = new b.Views.UserLocationSurvey({ model: this.model, appendTo: this.$el }) }, _hideSurvey: function() { this.$initial.removeClass("is-hidden");
            this.views.survey.destroy();
            this.model.set("showedSurvey", false);
            this.model.set("retryLocation", false) }, _showMore: function() { b.pixel.fire("lctan");
            this._showingMore = true;
            this.$more.removeClass("is-hidden");
            this.$showmore.text("Show Less") }, _hideMore: function() { this._showingMore = false;
            this.$more.addClass("is-hidden");
            this.$showmore.text("Show More") }, _onShowMoreClick: function(c) { if (this._showingMore) { this._hideMore() } else { this._showMore() } }, _onDismissClick: function(c) { c.preventDefault(); if (!this.model.showedSurvey) { b.pixel.fire("lctax") } b.settings.set("kat", "-1", { saveToCookie: true, saveToCloud: false }); if (!this.model.showedSurvey) { this._showSurvey() } else { this._hide() } }, _onCurrentLocationChange: function() { if (this.model.hasLocation()) { this._hide() } }, _onFinishedSurveyChange: function() { if (this.model.finishedSurvey) { this._hide() } }, _onRetryLocationChange: function() { if (!this.model.retryLocation) { return } b.settings.clear("kat", { saveToCookie: true, saveToCloud: false }); if (this.model.retryLocation === "manual") { this.views.button.requestManualLocation() } else { if (this.model.retryLocation === "precise") { this.views.button.requestPreciseLocation("survey", "lctar") } } this._hideSurvey() } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.UserLocationButton = function(c) { c.model = c.model || b.userLocator;
        this.updateButton = c.updateButton;
        this.clickPixel = c.clickPixel;
        this.updateType = c.updateType;
        a.call(this, c);
        this.bindEvents([
            [this.model, "change:waitingForLocation", this._onWaitingForLocationChange],
            [this.model, "change:errorGettingLocation", this._onErrorGettingLocationChange]
        ]) };
    b.Views.UserLocationButton.prototype = $.extend({}, a.prototype, { template: "user_location_button", requestPreciseLocation: function(c, e) { this.model.updateLocation({ force: true, updateType: c || this.updateType });
            b.pixel.fire(e || this.clickPixel) }, requestManualLocation: function() { b.pixel.fire("lmm"); if (!this.views.modal) { this.views.modal = new b.Views.ManualUserLocationModal({ model: this.model }) } this.views.modal.show() }, _render: function() { a.prototype._render.call(this, { waiting: this.model.waitingForLocation, showManualLocationButton: !this.updateButton, highlightManualLocationButton: this.model.errorGettingLocation, update: this.updateButton });
            this._cacheElems(".js-user-loc-btn", ["cancel", "enable", "manual", "update", "clear"]);
            this.bindEvents([
                [this.$cancel, "click", this._onCancelClick],
                [this.$enable, "click", this._onPreciseLocationClick],
                [this.$manual, "click", this._onManualLocationClick],
                [this.$update, "click", this._onUpdateLocationClick],
                [this.$clear, "click", this._onClearClick]
            ]) }, _onPreciseLocationClick: function() { if (this.model.waitingForLocation) { return } this.requestPreciseLocation() }, _onManualLocationClick: function() { if (this.model.waitingForLocation) { return } this.requestManualLocation() }, _onUpdateLocationClick: function() { if (this.model.waitingForLocation) { return } if (this.model.userLocation.type === b.Models.UserLocation.MANUAL_LOCATION) { this.requestManualLocation() } else { this.requestPreciseLocation() } }, _onCancelClick: function() { this.model.cancelLocation() }, _onClearClick: function() { if (b.userLocator.hasLocation()) { b.userLocator.clearLocation();
                b.pixel.fire("lfmx") } }, _onWaitingForLocationChange: function() { this._rerender() }, _onErrorGettingLocationChange: function() { this._rerender() } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.UserLocationError = function(c) { c.model = c.model || b.userLocator;
        this.small = Boolean(c.small);
        this.showInstructions = c.showInstructions;
        this.device = c.device || b.device;
        this.updateType = c.updateType;
        a.call(this, c);
        this.bindEvents([
            [this.model, "change:errorGettingLocation", this._onErrorGettingLocationChange]
        ]) };
    b.Views.UserLocationError.prototype = $.extend({}, a.prototype, { template: "user_location_error", _render: function() { a.prototype._render.call(this, { error: this.model.errorGettingLocation, small: this.small, instructions: this._getInstructions(), isMobile: this.device.isMobileDevice });
            this._cacheElems(".js-user-loc-error", ["help"]);
            this.bindEvents([
                [this.$help, "click", this._onHelpClick]
            ]) }, _getInstructions: function() { var c = null; if (!this.showInstructions) { return c } if (this.device.isAndroid) { if (this.device.isChrome || this.device.isBrave) { c = ["Tap the lock icon on the address bar.", "Go to 'Site Settings'.", "Ensure 'Location' is set to allow.", "Reload DuckDuckGo, and try again."] } else { c = ["Open the Settings app.", "Open 'Location', and ensure location is enabled.", "Navigate to Settings > Apps.", "Ensure your browser is allowed location access.", "Reload DuckDuckGo, and try again."] } } else { if (this.device.isIDevice) { c = ["Open the Settings app.", "Open 'Privacy', then 'Location Services'.", "Ensure 'Location Services' is enabled.", "Scroll down and locate your browser in the list.", "Ensure your browser is allowed location access.", "Reload DuckDuckGo, and try again."] } else { if ((this.device.isChrome || this.device.isFirefox) && (this.device.isWindows || this.device.isOSX)) { c = ["Click the lock icon on the address bar.", "Ensure location access is allowed.", "Reload DuckDuckGo, and try again."] } else { if (this.device.isOSX && this.device.isSafari) { c = ["Open 'System Preferences'.", "Open 'Security & Privacy', then 'Privacy'.", "Ensure 'Enable Location Services' is enabled.", "Ensure 'Safari' is enabled.", "Reload DuckDuckGo, and try again."] } } } } return c }, _onHelpClick: function() { b.pixel.fire("lhc", this.updateType) }, _onErrorGettingLocationChange: function() { this._rerender() } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.UserLocationSurvey = function(c) { this.device = c.device || b.device;
        a.call(this, c) };
    b.Views.UserLocationSurvey.prototype = $.extend({}, a.prototype, { template: "user_location_survey", _render: function() { a.prototype._render.call(this, { isMobile: this.device.isMobileDevice, showManualLocationButton: true });
            this._cacheElems(".js-user-loc-survey", ["button", "reason", "retry-manual", "retry-precise", "reason-extra", "privacy-extra", "broken-extra"]);
            this.bindEvents([
                [this.$reason, "change", this._onSurveyReasonChange],
                [this.$retrymanual, "click", this._onRetryManualClick],
                [this.$retryprecise, "click", this._onRetryPreciseClick],
                [this.$el, "submit", this._onSurveySubmit]
            ]) }, _getSurveyReason: function() { var c = this.$reason.filter(":checked"); return c && c.length && c.val() }, _onSurveyReasonChange: function() { var c = this._getSurveyReason();
            this.$button.removeClass("is-disabled");
            this.$reasonextra.addClass("is-hidden"); if (c === "privacy") { this.$privacyextra.removeClass("is-hidden") } else { if (c === "broken") { this.$brokenextra.removeClass("is-hidden") } } }, _onRetryPreciseClick: function() { this.model.set("retryLocation", "precise") }, _onRetryManualClick: function() { this.model.set("retryLocation", "manual") }, _onSurveySubmit: function(c) { c.preventDefault(); var f = this._getSurveyReason(); if (!f) { return } b.pixel.fire("lctas", f);
            this.model.set("finishedSurvey", true) } }) }(DDG);
! function(c) { var b = c.Views.Modal,
        a = 14,
        e = 10;
    c.Views.ManualUserLocationModal = function(g) { g.appendTo = g.appendTo || ".js-site-wrapper"; var f = g.model.userLocation;
        this._zoomLevel = a; if (!g.model.hasLocation() && g.model.geoipLocation) { f = g.model.geoipLocation;
            this._zoomLevel = e } this._mapModel = new c.Models.GLMap({ selectedLocation: f });
        this._initialPositionChanged = false;
        b.call(this, g) };
    c.Views.ManualUserLocationModal.prototype = $.extend({}, b.prototype, { template: "manual_user_location_modal", show: function() { b.prototype.show.call(this); if (!this.views.map) { this.views.map = new c.Views.Mapkit.PositionPicker({ appendTo: this.$map, model: this._mapModel, zoomLevel: this._zoomLevel }) } else { this.views.map.show() } this._toggleScroll() }, hide: function(f) { b.prototype.hide.call(this); if (this.views.map) { this.views.map.hide() } if (f !== false) { c.pixel.fire("lmmh") } this._toggleScroll() }, _render: function(f) { b.prototype._render.call(this, f);
            this._cacheElems(".js-manual-user-location", ["map", "map-controls", "done-btn"]);
            this.bindEvents([
                [this.$donebtn, "click", this._onPositionPicked],
                [this._mapModel, "change:selectedLocation", this._onPositionChanged]
            ]) }, _toggleScroll: function() { c.$html.toggleClass("disable-place-scroll", !!this.isShowing) }, _onPositionChanged: function() { this._initialPositionChanged = true;
            this.$donebtn.removeClass("is-disabled") }, _onPositionPicked: function() { if (!this._initialPositionChanged) { return } if (this._mapModel.selectedLocation) { if (this.model.geoipLocation) { this._mapModel.selectedLocation.geoipLat = this.model.geoipLocation.lat;
                    this._mapModel.selectedLocation.geoipLon = this.model.geoipLocation.lon } this.model.setLocation(this._mapModel.selectedLocation);
                c.pixel.fire("lmms") } setTimeout(function() { this.hide(false) }.bind(this), 50) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Maps.DirectionsButton = function(c) { this.answer = c.answer;
        this.loc = c.loc;
        a.call(this, c);
        this._updateLinkURL();
        this.bindEvents([
            [b.directionSource, "change:selected", this._updateLinkURL]
        ]) };
    b.Views.Maps.DirectionsButton.prototype = $.extend({}, a.prototype, { template: "directions_button", changeVerticalPos: function(c) { return this.views.directions && this.views.directions.changeVerticalPos(c) }, _render: function(c) { a.prototype._render.call(this, c);
            this.$link = this.$(".js-dir-btn-link");
            this.bindEvents([
                [this.$link, "click", this._onLinkClicked]
            ]); if (!b.device.isAppleDevice) { this.views.directions = new b.Views.Dropdowns.DirectionDropdown({ appendTo: this.$el, loc: this.loc, answer: this.answer }) } }, _updateLinkURL: function() { var c = b.directionSource.getDirectionsURL(this.loc);
            this.$link.attr("href", c);
            this.$link.data("wrapped", "");
            this.$link.off("click.wrap");
            this._wrapLinks() }, _onLinkClicked: function() { if (this.answer) { b.pixel.fire("iadrc", this.answer.pixelId, b.directionSource.selected.id);
                this.answer.clickedExternalLink();
                this.answer.engaged() } } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Maps.MapSidebar = function(c) { a.call(this, c);
        this.bindEvents([
            [this.model, "change:selectedItem", this._onSelectedItemChanged],
            [this.model, "change:isMapExpanded", this._onMapExpandedChanged],
            [this.model, "change:items", this._onItemsChange]
        ]) };
    b.Views.Maps.MapSidebar.prototype = $.extend({}, a.prototype, { template: "map_sidebar", _render: function() { a.prototype._render.call(this, this.model);
            this._cacheElems(".js-vertical-map", ["results-container", "detail", "close-map", "back-to-list", "back-to-serp", "search", "search-input"]);
            this.bindEvents([
                [this.$backtolist, "click", this._onBackToListClick],
                [this.$closemap, "click", this._onCloseMapClick],
                [this.$search, "submit", this._onSearchSubmit]
            ]);
            this.$searchinput.val(this.model.query) }, _onSelectedItemChanged: function(c) { if ((this.model.answerItemModel !== "Place" && this.model.answerType !== "Places") || this.model.isSingle) { return } if (c) { this.$backtoserp.hide();
                this.$backtolist.removeClass("is-hidden") } else { this.$backtoserp.show();
                this.$backtolist.addClass("is-hidden") } }, _onMapExpandedChanged: function() { if (this.model.selectedItem) { this.model.selectedItem.unselect();
                b.history.clear("iai") } }, _onItemsChange: function() { var c = this.model.meta.queryParsed; if (!this.model.shouldMapViewportUpdate && c) { this.$searchinput.val(c.what) } }, _onBackToListClick: function(c) { c.preventDefault();
            c.stopPropagation(); if (this.model.selectedItem) { this.model.selectedItem.unselect();
                b.history.clear("iai") } if (this.views.currentPlaceDetail) { this.views.currentPlaceDetail.destroy();
                delete this.views.currentPlaceDetail } this.$detail.hide();
            this.$resultscontainer.show();
            this.$backtolist.addClass("is-hidden") }, _onCloseMapClick: function(c) { c.preventDefault();
            c.stopPropagation();
            this.model.set("isMapExpanded", false);
            this.model.engaged();
            b.pixel.fire("map_ebe") }, _onSearchSubmit: function(h) { h.preventDefault(); var g = this.$searchinput.val();
            this.model.set("shouldMapViewportUpdate", true);
            this.model.set("isSearchAreaBtnVisible", false); var f = {};
            f.query = g; if (this.model.geo_bbox) { f.bbox_tl = this.model.geo_bbox.top_left;
                f.bbox_br = this.model.geo_bbox.bottom_right } var c = b.userLocator && b.userLocator.userLocation; if (c && c.lat && c.lon) { f.location_type = c.type;
                f.latitude = c.lat;
                f.longitude = c.lon } this.model.requery(f) } }) }(DDG);
! function(e) { var c = e.Views.Base,
        a = "normal",
        b = { min: "normal", normal: "min", max: "normal", initial: "min" },
        f = { min: "handle--up", normal: "handle--down", max: "handle--down", initial: "handle--down" };
    e.Views.Maps.MapSidebarMobile = function(g) { c.call(this, g);
        this.bindEvents([
            [this.model, "change:selectedItem", this._onSelectedItemChanged],
            [this.model, "change:sidebarPosition", this._onSidebarPositionChanged]
        ]);
        this.model.set("sidebarPosition", this.model.sidebarPosition || a) };
    e.Views.Maps.MapSidebarMobile.prototype = $.extend({}, c.prototype, { template: "map_sidebar_mobile", _render: function() { c.prototype._render.call(this, this.model);
            this._cacheElems(".js-vertical-map-sidebar-mobile", ["results-container", "detail", "handle", "handle-bar", "back-wrapper", "close-map", "back-to-list", "back-to-serp"]); if (this.model.selectedItem) { this.$closemap.hide();
                this.$backtolist.removeClass("is-hidden") } this.model.sidebarPosition === "min" ? this.$backwrapper.hide() : this.$backwrapper.show();
            this.$handlebar.addClass(f[this.model.sidebarPosition]);
            this.bindEvents([
                [this.$handle, "click", this._onSidebarHeaderClick],
                [this.$closemap, "click", this._onCloseMapClick],
                [this.$backtolist, "click", this._onBackToListClick]
            ]) }, _onSidebarHeaderClick: function() { this.model.set("sidebarPosition", b[this.model.sidebarPosition]) }, _onSelectedItemChanged: function(g) { if (g) { this.$backtoserp.hide();
                this.$closemap.hide();
                this.$backtolist.removeClass("is-hidden") } else { this.$backtoserp.show();
                this.$closemap.show();
                this.$backtolist.addClass("is-hidden") } }, _onSidebarPositionChanged: function(h, g) { this.model.sidebarPosition === "min" ? this.$backwrapper.hide() : this.$backwrapper.show(); if (g) { this.$handlebar.removeClass(f[g]) } this.$handlebar.addClass(f[h]) }, _onBackToListClick: function(g) { g.preventDefault();
            g.stopPropagation(); if (this.model.selectedItem) { this.model.selectedItem.unselect();
                e.history.clear("iai") } if (this.views.currentPlaceDetail) { this.views.currentPlaceDetail.destroy();
                delete this.views.currentPlaceDetail } this.$detail.hide();
            this.$resultscontainer.show();
            this.$closemap.show();
            this.$backtolist.addClass("is-hidden") }, _onCloseMapClick: function(g) { g.preventDefault();
            g.stopPropagation(); if (this.model.selectedItem) { this.model.selectedItem.unselect();
                e.history.clear("iai") } this.model.set("isMapExpanded", false);
            this.model.engaged();
            e.pixel.fire("map_ebe") } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Places.PlacesSingle = function(c) { this.answer = c.model;
        this.model = this.answer.primaryPlace;
        a.call(this, { model: this.model, appendTo: c.appendTo });
        this.bindEvents([
            [b.settings, "change:kam", this._onDirectionSourceUpdated]
        ]) };
    b.Views.Places.PlacesSingle.prototype = $.extend({}, a.prototype, { template: "places_single", _onDirectionSourceUpdated: function() { var c = b.directionSource.getMapURL(this.model);
            this.model.set("mapURL", c);
            this.model.set("directionsTitle", this.model.getDirectionsTitle());
            this._rerender(this.model) }, _render: function() { a.prototype._render.call(this, this.model); var c = { model: this.model, answer: this.answer, appendTo: this.$el };
            this.views.header = new b.Views.Places.PlaceHeader(c);
            this.views.detail = new b.Views.Places.PlaceDetail(c) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Places.PlacesSingleMap = function(c) { this.answer = c.answer;
        this.model = c.model;
        a.call(this, { model: this.model, appendTo: c.appendTo }) };
    b.Views.Places.PlacesSingleMap.prototype = $.extend({}, a.prototype, { template: "places_single_map", _render: function() { a.prototype._render.call(this, this.model); var c = { model: this.model, answer: this.answer, appendTo: this.$el }; if (this.model.thumbnails || this.model.image) { this.views.header = new b.Views.ModuleImageHeader(c) } this.views.detail = new b.Views.Places.PlaceDetail(c) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Places.PlacesMultiple = function(c) { a.call(this, c) };
    b.Views.Places.PlacesMultiple.prototype = $.extend({}, a.prototype, { template: "places_multiple", _render: function(c) { a.prototype._render.call(this, c);
            this._cacheElems(".js-places-multiple", ["map", "list", "expand"]);
            this.bindEvents([
                [this.$map, "click", this._onMapClick.bind(this)],
                [this.$expand, "click", this._onMapClick.bind(this)],
                [this.$map, "mouseenter", this._onMapMouseEnter.bind(this)]
            ]);
            this.model.glMapModel = new b.Models.GLMap({ locations: this.model.items, pixelId: this.model.pixelId });
            this.views.map = new b.Views.Mapkit.Map({ markers: this.model.itemsOnMap, model: this.model.glMapModel, answer: this.model, appendTo: this.$map, mapOffset: { top: 20, right: 0, bottom: 0, left: 0 }, isFrozen: true });
            this.views.placeListItems = this.model.topPlaces.map(function(e) { return new b.Views.Places.PlaceListItem({ appendTo: this.$list, model: e, answer: this.model }) }.bind(this)) }, _onMapClick: function(c) { c.preventDefault();
            this.model.set("isMapExpanded", true);
            this.model.fire("iacg");
            b.pixel.fire("map_se") }, _onMapMouseEnter: function() { this.model.setUserMapIntent() }, _onExternalLinkClick: function(c) { this.model.engaged() } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Places.PlaceHeader = function(c) { this.answer = c.answer;
        this.bindEvents([
            [this.$el, "click", this._onClick]
        ]);
        a.call(this, c) };
    b.Views.Places.PlaceHeader.prototype = $.extend({}, a.prototype, { template: "place_header", _render: function(c) { a.prototype._render.call(this, $.extend(c || {}, this.model));
            this._cacheElems(".js-place-header", ["map"]);
            this.bindEvents([
                [this.$map, "click", this._onMapClick.bind(this)],
                [this.$map, "mouseenter", this._onMapMouseEnter.bind(this)]
            ]);
            setTimeout(function() { this.views.map = new b.Views.Mapkit.StaticMap({ markers: [this.model], width: this.$map.outerWidth(), height: this.$map.outerHeight(), url: this.model.directions, appendTo: this.$map, showCTA: true }) }.bind(this), 0) }, _onClick: function(c) { c.stopPropagation() }, _onMapClick: function(c) { c.preventDefault();
            this.answer.set("isMapExpanded", true);
            this.answer.fire("iacg") }, _onMapMouseEnter: function() { this.answer.setUserMapIntent() }, _onExternalLinkClick: function(c) { this.answer.engaged();
            this.answer.clickedExternalLink();
            a.prototype._onExternalLinkClick.call(this, c) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Places.PlaceDetail = function(c) { this.answer = c.answer;
        a.call(this, c);
        this.bindEvents([
            [this.model, "change:reviews", this._onReviewsUpdate]
        ]) };
    b.Views.Places.PlaceDetail.prototype = $.extend({}, a.prototype, { template: "place_detail", _render: function() { a.prototype._render.call(this, this.model);
            this._cacheElems(".js-place-detail", ["hours", "hours-toggle", "phone", "title"]);
            this.bindEvents([
                [this.$hourstoggle, "click", this._onHoursToggleClick.bind(this)],
                [this.$phone, "click", this._onPhoneClick.bind(this)],
                [this.model, "change:expanded", this._rerender]
            ]);
            this.views.directions = new b.Views.Maps.DirectionsButton({ after: this.$title, loc: this.model, answer: this.answer });
            this.views.placeHours = new b.Views.Places.PlaceHours({ model: this.model, appendTo: this.$hours }) }, _rerender: function() { if (this.views.directions) { this.views.directions.destroy();
                delete this.views.directions } a.prototype._rerender.call(this) }, _onHoursToggleClick: function(c) { c.preventDefault();
            this.model.toggleHoursExpand();
            this.answer.engaged() }, _onPhoneClick: function(c, f) { this.answer.engaged() }, _onReviewsUpdate: function() { this.model.reviewsURL = b.localAPI.getPlaceReviewsURL(this.model);
            this._rerender() }, _onExternalLinkClick: function(c) { this.answer.clickedExternalLink();
            this.answer.engaged();
            a.prototype._onExternalLinkClick.call(this, c) } }) }(DDG);
! function(b) { var a = b.Views.ClickableItem;
    b.Views.Places.PlaceListItem = function(c) { this.openOnMap = !!c.answer;
        c.showLinks = !this.openOnMap;
        a.call(this, c);
        this.answer = c.answer;
        this.bindEvents([
            [this.$el, "click", this._onClick],
            [this.$el, "mouseenter", this._onMouseEnter],
            [this.$el, "mouseleave", this._onMouseLeave],
            [this.model, "change:selected", this._onSelectedChanged]
        ]) };
    b.Views.Places.PlaceListItem.prototype = $.extend({}, a.prototype, { template: "place_list_item", _render: function(c) { a.prototype._render.call(this, $.extend(c || {}, this.model));
            this._cacheElems(".js-place-list-item", ["title"]) }, _onClick: function(f, c) { if (this.openOnMap) { this.answer.set("isMapExpanded", true); return this.model.select() } f.stopPropagation();
            this.$title.click();
            a.prototype._onClick.call(this, f, c) }, _onSelectedChanged: function() { if (this.model.selected) { b.history.set({ iai: this.answer.getQuerystringItemId(this.model) }) } }, _onMouseEnter: function(c) { this.model.highlight(); if (!this.answer.isMapExpanded) { this.answer.setUserMapIntent() } }, _onMouseLeave: function(c) { this.model.unhighlight() }, _onExternalLinkClick: function(c) { c.stopPropagation();
            this.answer.clickedExternalLink();
            this.answer.engaged();
            a.prototype._onExternalLinkClick.call(this, c) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Places.PlaceHours = function(c) { a.call(this, c);
        this._cacheElems(".js-place-hours", ["close"]);
        this.bindEvents([
            [this.$close, "click", this._onCloseClick],
            [this.model, "change:hoursExpanded", this._toggle]
        ]) };
    b.Views.Places.PlaceHours.prototype = $.extend({}, a.prototype, { template: "place_hours", _render: function() { a.prototype._render.call(this, this.model) }, _toggle: function() { this.$el.toggleClass("is-hidden") }, _onCloseClick: function() { this.model.toggleHoursExpand() } }) }(DDG);
! function(b) { var a = b.Models.Base,
        c = { wiki_maps_trigger: [{ addTo: "maps" }], imdb_id: [{ dataTypeOverride: "imdb_title_id", matching: /^tt/, addTo: "profiles" }, { dataTypeOverride: "imdb_name_id", matching: /^nm/, addTo: "profiles" }], rotten_tomatoes: [{ matching: /^(tv|m)/, addTo: "profiles" }], twitter_profile: [{ addTo: "profiles" }], instagram_profile: [{ addTo: "profiles" }], youtube_channel: [{ addTo: "profiles" }], facebook_profile: [{ addTo: "profiles" }], spotify_artist_id: [{ addTo: "profiles" }], soundcloud_id: [{ addTo: "profiles" }] };
    b.Models.Modules.AboutInfoBox = function(e) { this._defaultVisibleRows = e.minimizeHeight ? 0 : 3;
        this.maps = [];
        this.profiles = [];
        a.call(this, this.transform(e)) };
    b.Models.Modules.AboutInfoBox.prototype = $.extend({}, a.prototype, { toggleExpand: function() { if (this.canExpand()) { for (var e = 0; e < this.items.length; e++) { this.items[e].visible = !this.expanded ? true : e < this._defaultVisibleRows } this.set("expanded", !this.expanded) } }, canExpand: function() { return this.items.length > this._defaultVisibleRows }, transform: function(g) { var e; if (g.Infobox) { e = g.Infobox.content;
                e.forEach(function(j) { if (!j || !j.value) { return } var h = c[j.data_type]; if (!h) { return } h.forEach(function(i) { if (!i.matching || j.value.match(i.matching)) { if (i.dataTypeOverride) { j.data_type = i.dataTypeOverride } this[i.addTo].push(j) } }.bind(this)) }.bind(this));
                e = e.filter(function(h) { return h && h.value && typeof h.value === "string" && h.value.charAt(0) !== "[" && h.label !== "Website" && h.data_type && h.data_type === "string" }) } if (e) { g.hasItems = true; for (var f = 0; f < e.length && (f < this._defaultVisibleRows); f++) { e[f].visible = true } g.items = e } return g } }) }(DDG);
! function(b) { var a = b.Models.Base;
    b.Models.Modules.AboutHeader = function(c) { a.call(this, c);
        this.staticMapTitle = lp("maps_places", "Open Expanded Map");
        this.loadMap() };
    b.Models.Modules.AboutHeader.prototype = $.extend({}, a.prototype, { loadMap: function() { if (!this.mapURL) { return } this.mapURL = this.mapURL.replace("&cb=ddg_spice_maps_maps", "");
            $.ajax({ url: this.mapURL, dataType: "json", success: this._onMapLoaded.bind(this), error: this._onMapError.bind(this) }) }, _onMapLoaded: function(c) { this.mapResponse = DDG.localAPI.getMapsResponse(c); if (this.mapResponse.results && this.mapResponse.results.length) { var e = new b.Models.AnswerItems.MapLocation(this.mapResponse.results[0]);
                this.set("mapLocation", e) } else { this.set("mapFailed", true) } }, _onMapError: function() { this.set("mapFailed", true) } }) }(DDG);
! function(e) { var c = e.Models.Base,
        b = "/assets/icons/thirdparty/{{icon}}.svg",
        a = ["film", "television"],
        f = { official_site: { url: "{{val}}", icon: "website", name: "Website", sort: 1 }, wikipedia: { url: "{{val}}", icon: "wikipedia", name: "Wikipedia", sort: 2 }, twitter_profile: { url: "https://twitter.com/{{val}}", icon: "twitter", name: "Twitter", sort: 3 }, instagram_profile: { url: "https://instagram.com/{{val}}", icon: "instagram", name: "Instagram", sort: 4 }, facebook_profile: { url: "https://facebook.com/{{val}}", icon: "facebook", name: "Facebook", sort: 5 }, spotify_artist_id: { url: "https://open.spotify.com/artist/{{val}}", icon: "spotify", name: "Spotify", sort: 6 }, imdb_title_id: { url: "https://www.imdb.com/title/{{val}}", icon: "imdb", name: "IMDb", sort: 7 }, imdb_name_id: { url: "https://www.imdb.com/name/{{val}}", icon: "imdb", name: "IMDb", sort: 8 }, rotten_tomatoes: { url: "https://rottentomatoes.com/{{val}}", icon: "rt", name: "Rotten Tomatoes", sort: 9 }, youtube_channel: { url: "https://youtube.com/channel/{{val}}", icon: "youtube", name: "YouTube", sort: 10 }, soundcloud_id: { url: "https://soundcloud.com/{{val}}", icon: "soundcloud", name: "SoundCloud", sort: 11 }, itunes: { url: "{{val}}", icon: "apple", name: "iTunes", sort: 12 }, amazon: { url: "{{val}}", icon: "amazon", name: "Amazon", sort: 13 } };
    e.Models.Modules.AboutProfiles = function(g) { c.call(this, g);
        this.links = this._createLinks(this.data); if (this._isStreamable()) { this._tryAddingITunes();
            this._tryAddingAmazon() } };
    e.Models.Modules.AboutProfiles.prototype = $.extend({}, c.prototype, { _createLinks: function(h) { if (!h || !h.length) { return } var g = h.map(this._createLinkFromInfoboxData.bind(this));
            g = g.sort(function(j, i) { return j.sort > i.sort ? 1 : -1 }); return g }, _createLinkFromInfoboxData: function(g) { return this._createLink(g.data_type, g.value) }, _createLink: function(g, k) { var i = f[g],
                h = i.url.replace("{{val}}", k),
                j = b.replace("{{icon}}", i.icon); return { url: h, name: i.name, icon: i.icon, iconURL: j, sort: i.sort } }, _addLink: function(g, h) { this.links.push(this._createLink(g, h));
            this._emitChange("links", this.links) }, _isStreamable: function() { if (a.indexOf(this.entity) > -1) { return true } }, _tryAddingITunes: function() { $.ajax({ url: "/iit/" + encodeURIComponent(this.title), dataType: "json", success: function(g) { if (!g || !g.results || !g.results.length || !g.results[0].trackViewUrl) { return } this._addLink("itunes", g.results[0].trackViewUrl) }.bind(this) }) }, _tryAddingAmazon: function() { $.ajax({ url: "/m.js?q=" + encodeURIComponent(this.title) + "&c=v&o=json&l=" + e.settings.get("kl") + "&country=" + window.ct, dataType: "json", success: function(g) { if (!g || !g.results || !g.results.length) { return } this._addLink("amazon", g.results[0].url) }.bind(this) }) } }) }(DDG);
! function(c) { var b = c.Views.Base,
        a = "is-expanded";
    c.Views.Modules.Base = function(e) { this.model = e.model;
        b.call(this, e);
        this.bindEvents([
            [this.model, "change:expanded", this._onExpandedChanged],
            [this.model, "change:active", this._onActiveChanged]
        ]) };
    c.Views.Modules.Base.prototype = $.extend({}, b.prototype, { show: function() { this.$el.show(); var e = [{ qsParam: "iax", modelState: "expanded" }, { qsParam: "iaxm", modelState: "isMapExpanded" }];
            e.map(function(g) { if (this._isModelInQuerystring(g.qsParam)) { var f = {};
                    f[g.modelState] = true;
                    this.model.set(f) } }.bind(this)) }, hide: function() { this.$el.hide();
            this.answer.set("isMapExpanded", false) }, isValid: function() { return true }, showNoResults: function() {}, _render: function() { b.prototype._render.call(this, this.model) }, _wrapLinks: function() {}, _expand: function() { c.keyboard.set("namespace", this.model.pixelId);
            DDG.addClass(this.model.id, this.$parent, a); if (this.model.nameId === "maps") { c.history.set({ iaxm: this.model.nameId }) } else { c.history.set({ iax: this.model.nameId }) } if (["j", "n"].indexOf(c.opensearch.atbVariant) < 0 || c.addToBrowser.canShowOnDesktopSerp()) { DDG.page.views.atb && DDG.page.views.atb.hide() } }, _collapse: function() { c.keyboard.set("namespace");
            DDG.removeClass(this.model.id, this.$parent, a); if (this.model.nameId === "maps") { c.history.clear("iaxm") } else { c.history.clear("iax") } }, _isModelInQuerystring: function(f) { var g = c.history.get(f),
                e = (g === 1 || g === 0) ? c.history.get("ia") : g; return !!e && (this.model.id === e || this.model.parentId === e || this.model.nameId === e) }, _onActiveChanged: function() { return this.model.active ? this.show() : this.hide() }, _onExpandedChanged: function() { return this.model.expanded ? this._expand() : this._collapse() } }) }(DDG);
! function(c) { var b = c.Views.Modules.Base,
        a = 75;
    c.Views.Modules.About = function(e) { b.call(this, e);
        this.itemModel = this.model.items[0];
        this._cacheElems(".js-about-module", ["content", "toggle", "more", "less"]);
        this.bindEvents([
            [this.model, "change:expanded", this._onExpandedChange],
            [this.itemModel.header, "change:mapLocation", this._createMapVertical],
            [this.model, "change:isMapExpanded", this._createMapVertical],
            [this.$content, "click", this._onClick],
            [this.$toggle, "click", this._onToggleClick]
        ]); if (this.itemModel.header) { this.model.set("headerType", this.itemModel.headerType); var g = e.customHeader ? e.customHeader.headerClass : c.Views.About.AboutHeader;
            this.views.header = new g({ before: this.$content, model: this.itemModel.header, answer: this.model }) } if (this.model.items.length) { this.views.item = new c.Views.About.AboutItem({ appendTo: this.$content, model: this.itemModel, answer: this.model }) } var f = this.$content[0]; if (f) { var h = f.clientHeight + (this.model.isSideModule ? a : 0); if (f.scrollHeight > h) { this.itemModel.set("isTooHigh", true) } else { if (this.model.isSideModule) { this.$el.addClass("has-content-height") } } } this._updateExpandedState() };
    c.Views.Modules.About.prototype = $.extend({}, b.prototype, { template: "about_module", _render: function(e) { b.prototype._render.call(this, e); var f = this.model.meta && this.model.meta.name; if (c.device.isEnglish) { this.views.feedback = new c.Views.Feedback.FeedbackPrompt({ sourceName: this.model.meta.src_name, category: "wikipedia", categoryName: f, categoryValue: f !== "Wikipedia" ? "about" : "", promptText: "Feedback", appendTo: this.$el, showYesNo: false }) } }, _updateExpandedState: function() { if (!this.itemModel.canModuleExpand) { return } if (this.itemModel.canModuleExpand() && !this.model.expanded) { this.$toggle.show();
                this.$more.show();
                this.$less.hide();
                this.$el.removeClass("is-expanded") } else { if (this.itemModel.canModuleExpand() && this.model.expanded) { this.$toggle.show();
                    this.$more.hide();
                    this.$less.show();
                    this.$el.addClass("is-expanded") } else { this.$more.hide();
                    this.$less.hide();
                    this.$el.removeClass("is-expanded") } } }, _createMapVertical: function() { if (!this.views.header.model.mapLocation || !this.model.isMapExpanded || this.views.verticalMap) { return } this.views.header.model.mapLocation.selected = 1;
            this.views.verticalMap = new c.Views.Verticals.VerticalMap({ ItemClass: c.Views.Modules.AboutMap, model: this.model, locations: [this.views.header.model.mapLocation], appendTo: "body" }) }, _onExpandedChange: function() { this._updateExpandedState() }, _onClick: function() { this.model.engaged && this.model.engaged(); if (c.device.isMobileDevice && !this.model.isMapExpanded) { c.pixel.fire("iasm", this.model.pixelId, this.model.openType);
                this.model.set("expanded", !this.model.expanded) } }, _onToggleClick: function(f) { f.stopPropagation();
            this.model.engaged();
            c.pixel.fire("iasm", this.model.pixelId, this.model.openType);
            this.model.set("expanded", !this.model.expanded) } }) }(DDG);
! function(b) { var a = b.Views.Modules.About;
    b.Views.Modules.AboutMap = function(c) { this.model = c.answer;
        this.itemModel = c.model;
        c.customHeader = { headerClass: b.Views.ModuleImageHeader, answer: this.model };
        c.model = this.model;
        a.call(this, c);
        this.bindEvents([
            [this.model, "change:isMapExpanded", this._onMapExpandedChange]
        ]) };
    b.Views.Modules.AboutMap.prototype = $.extend({}, a.prototype, { _render: function(c) { this.itemModel.expand();
            a.prototype._render.call(this, c) }, _onMapExpandedChange: function(c) { if (c && !this.model.expanded) { this.model.set("expanded", true) } else { if (!c && !this.model.expanded) { this.model.set("expanded", false) } } } }) }(DDG);
! function(c) { var b = c.Views.Modules.Base,
        a = "half-opacity";
    c.Views.Modules.Forecast = function(e) { b.call(this, e);
        this._cacheElems(".js-forecast-module-detail", ["moreat"]);
        this._updateIcon();
        this.bindEvents([
            [this.model.items, "change:hour", this._updateDetail],
            [this.model.items, "change:selected", this._updateDetail],
            [this.model.items, "beforeSend", this._setDetailTimer],
            [c.settings, "change:kae", this._rerender],
            [this.model.items, "change:unit", this._rerender],
            [this.$moreat, "click", this._onExternalLinkClick],
            [this.model, "change:openType", this._onOpenTypeChanged]
        ]) };
    c.Views.Modules.Forecast.prototype = $.extend({}, b.prototype, { template: "forecast_module", _getItems: function() { if (!this.model || !this.model.items) { return } this.model.items = this.model.items[0] ? this.model.items[0] : this.model.items }, _updateDetail: function() { clearTimeout(this._timer);
            this.$detail.html(c.exec_template("forecast_detail", this.model));
            this._cacheElems(".js-forecast-module-detail", ["unit", "moreat", "moreatcontainer", "hours", "hoursmobile", "top", "bottom", "more"]);
            this.$top.removeClass(a);
            this.$bottom.removeClass(a);
            this.bindEvents([
                [this.$unit, "click", this._onUnitClick],
                [this.$more, "click", this._onExternalLinkClick]
            ]);
            this._renderHoursGraph() }, _render: function(e) { this._getItems();
            this.model.items.isEnglishDevice = c.device.isEnglish;
            b.prototype._render.call(this, this.model);
            this._cacheElems(".js-forecast-module", ["item", "detail"]);
            this.bindEvents([
                [this.$item, "click", this._onDailyCardClick]
            ]);
            this._updateDetail(); if (c.device.isEnglish) { this.views.feedback = new c.Views.Feedback.FeedbackPrompt({ category: "forecast", promptText: "Feedback", appendTo: this.$moreatcontainer, showYesNo: false }) } }, _onDailyCardClick: function(g) { var f = $(g.currentTarget);
            this.$item.each(function(e, h) { $(h).removeClass("module__items-item--selected") });
            f.addClass("module__items-item--selected");
            g.preventDefault();
            this.model.engaged();
            this.model.items.updateSelected(f.data("item-index")) }, _setDetailTimer: function() { this._timer = setTimeout(function() { this.$top.addClass(a);
                this.$bottom.addClass(a) }.bind(this), 500) }, _onUnitClick: function(f) { f.preventDefault();
            this.model.engaged();
            this.model.items.updateUnit($(f.currentTarget).data("unit")) }, _getHoursGraphOptions: function() { var e = { maintainAspectRatio: false, responsive: true, plugins: { filler: { propagate: false } }, layout: { padding: { top: 4, bottom: 4 } }, legend: { display: false }, scales: { xAxes: [{ display: false, gridLines: { drawBorder: false }, ticks: { display: false } }], yAxes: [{ display: false, gridLines: { drawBorder: false }, ticks: { display: false } }] }, animation: { duration: 0 }, hover: { animationDuration: 0 }, responsiveAnimationDuration: 0, elements: { point: { radius: 0, hoverRadius: 0 } }, tooltips: { enabled: false } }; return e }, _getHoursGraphDefaults: function() { var g = "#aaa",
                e = c.settings.isDarkTheme() ? "#666" : "#f2f2f2",
                f = 2; return { borderColor: g, backgroundColor: e, borderWidth: f, borderCapStyle: "round", borderJoinStyle: "round", fill: "start", label: "", spanGaps: true } }, _renderHoursGraph: function() { var g = this._getHoursGraphDefaults(),
                e = this.model.items.hours,
                f = this._getHoursGraphOptions(); if (!e.data || !e.data.datasets) { return } e.data.datasets[0] = $.extend(e.data.datasets[0], g); if (!this.hoursGraph) { this._appendHoursGraphCanvas(e, f); return } this.hoursGraph.data = e.data;
            this.hoursGraph.options = f;
            this.hoursGraph.update() }, _appendHoursGraphCanvas: function(f, g) { if (!f) { return } var e = document.createElement("canvas").getContext("2d"),
                i = this.$hours,
                h;
            e.canvas.style.width = "100%";
            e.canvas.style.height = "100%";
            i.append(e.canvas);
            h = i.find("canvas")[0];
            c.require("chart.js", function() { this.hoursGraph = new window.Chart(h, { type: "line", data: f.data, options: g }) }) }, _updateIcon: function() { if (!this.model.openType || this._changedIcon) { return } var e = "https://duckduckgo.com/assets/icons/meta/DDG-iOS-weather-icon_";
            $("#icon60").attr("href", e + "60x60.png");
            $("#icon76").attr("href", e + "76x76.png");
            $("#icon120").attr("href", e + "120x120.png");
            $("#icon152").attr("href", e + "152x152.png");
            this._changedIcon = true }, _onExternalLinkClick: function(f) { f.stopPropagation();
            this.model.engaged();
            this.model.clickedExternalLink(); return b.prototype._onExternalLinkClick.call(this, f) }, _onOpenTypeChanged: function() { this._updateIcon() } }) }(DDG);
! function(b) { var a = b.Views.Modules.Base;
    b.Views.Modules.Maps = function(c) { a.call(this, c);
        this.bindEvents([
            [this.model, "change:isMapExpanded", this._onMapExpandedChanged],
            [b.keyboard, "escape." + this.model.pixelId, this._onEscape]
        ]) };
    b.Views.Modules.Maps.prototype = $.extend({}, a.prototype, { template: "maps_module", _render: function(c) { a.prototype._render.call(this, c);
            this._cacheElems(".js-maps-module", ["map", "detailview", "control-topright", "control-bottomleft"]);
            this._renderAddressDetails();
            this._renderStaticMap(); if (b.device.isEnglish) { this.views.feedback = new b.Views.Feedback.FeedbackPrompt({ category: "maps", promptText: "Is this map helpful?", appendTo: this.$el }) } }, _renderStaticMap: function() { if (this.views.staticMap) { return } this.views.staticMap = new b.Views.Mapkit.StaticMap({ markers: [this.model.selectedItem], marker: this.model.selectedItem, width: this.$el.outerWidth(), height: 200, appendTo: this.$map, showCTA: true });
            this.bindEvents([
                [this.views.staticMap, "click", this._onStaticMapClicked]
            ]) }, _renderVerticalMap: function() { if (this.views.verticalMap) { return } this.views.verticalMap = new b.Views.Verticals.VerticalMap({ ItemClass: b.Views.Address.AddressDetail, model: this.model, locations: this.model.items, appendTo: "body" }) }, _renderAddressDetails: function() { if (this.views.detail) { return } this.views.detail = new b.Views.Address.AddressDetail({ model: this.model.selectedItem, appendTo: this.$detailview, answer: this.model }) }, _onMapExpandedChanged: function() { if (this.model.isMapExpanded) { if (this.views.verticalMap) { this.views.verticalMap.show() } else { this._renderVerticalMap() } b.pixel.fire("map_ei") } else { if (this.views.verticalMap) { this.views.verticalMap.hide() } this.views.staticMap.show() } }, _onEscape: function() { if (this.model.isMapExpanded) { this.model.set("isMapExpanded", false) } }, _onStaticMapClicked: function() { this.model.set("isMapExpanded", true);
            this.model.fire("iacg");
            this.model.engaged() } }) }(DDG);
! function(c) { var b = c.Views.ClickableItem,
        a = "is-highlighted";
    c.Views.Modules.NewsItem = function(e) { this.model = e.model;
        this.answer = e.answer;
        b.call(this, e);
        this._cacheElems(".js-news", ["image-wrapper", "img-placeholder", "title", "content"]);
        this.bindEvents([
            [this.$el, "mouseenter", this._onMouseEnter],
            [this.$el, "mouseleave", this._onMouseLeave],
            [this.$el, "touchstart", this._onTouchStart],
            [this.model, "change:image", this._onImageFetched],
            [this.model, "change:highlighted", this._onHighlightedChanged],
            [c.device, "resize", this._onResize]
        ]);
        this._updateEllipsis() };
    c.Views.Modules.NewsItem.prototype = $.extend({}, b.prototype, { template: "news_module_item", getWidth: function() { if (this._width) { return this._width } this._width = this.$el.outerWidth(true); return this._width }, _render: function(e) { b.prototype._render.call(this, this.model) }, _updateEllipsis: function() { this.$title.ellipsis({ id: this.model.id + "-title" });
            this.$content.ellipsis({ id: this.model.id + "-content" }) }, _onImageFetched: function() { var e = DDG.getImageProxyURL(this.model.image, false, false, 120);
            this.$img = $('<div class="module--news__image" style="background-image:url(' + e + ')"></div>');
            this.$imagewrapper.append(this.$img);
            this.$imgplaceholder.hide() }, _onMouseEnter: function() { this.model.highlight() }, _onMouseLeave: function() { this.model.unhighlight() }, _onClick: function(g, f) { this.model.highlight();
            b.prototype._onClick.call(this, g, f) }, _onHighlightedChanged: function() { this.$el.toggleClass(a, !!this.model.highlighted) }, _onResize: function() { this._updateEllipsis();
            delete this._width }, _onTouchStart: function() { this.answer.engaged() } }) }(DDG);
! function(e) { var c = e.Views.Modules.Base,
        b = 3,
        a = 12;
    e.Views.Modules.News = function(f) { c.call(this, f);
        this.views = { items: [], itemsById: {} };
        this._cacheElems(".js-news-module", ["items", "more", "title", "left", "right"]);
        this.bindEvents([
            [this.model, "change:items", this._updateItems]
        ]); if (e.device.isMobileDevice) { this.$items.on("touchstart touchend", this._updateVisibleItems.bind(this, true)) } if (this.model.items.length) { this._updateItems() } else { this.model.loadDeferred() } };
    e.Views.Modules.News.prototype = $.extend({}, c.prototype, { template: "news_module", _updateItems: function() { if (this._rendered) { return } this._rendered = true;
            this.$title.removeClass("is-hidden"); var g = this.model.items;
            this._showingSlider = !e.device.isMobileDevice && g.length > b; var h = this._showingSlider || g.length > a; if (h) { this.$more.removeClass("is-hidden");
                this.bindEvents([
                    [this.$more, "click", this._onMoreClick],
                    [this.$title, "click", this._onMoreClick]
                ]) } else { if (g.length === 2) { this.$el.addClass("has-two-items") } else { if (g.length === 1) { this.$el.addClass("has-one-item") } } } for (var j = 0; j < a; j++) { var k = g[j]; if (!k) { break } var f = new e.Views.Modules.NewsItem({ appendTo: this.$items, model: k, answer: this.model });
                this.views.items.push(f);
                this.views.itemsById[k.id] = f } this._width = this.$el.width(); if (e.device.isEnglish && !e.device.isMobile) { this.views.feedback = new e.Views.Feedback.FeedbackPrompt({ category: "news", promptText: "Are these links helpful?", appendTo: this.$el }) } if (this._showingSlider) { this._updateVisibleItems(true);
                this._initSlider() } else { this._updateVisibleItems() } this._selectItemFromQueryString() }, _initSlider: function() { this._currentPage = 0; var f = this.views.items.length;
            this._lastPage = Math.ceil(f / b) - 1;
            this.$right.removeClass("is-hidden");
            this.bindEvents([
                [this.$left, "click", this._onLeftClick],
                [this.$right, "click", this._onRightClick],
                [e.device, "resize", this._onResize]
            ]) }, _selectItemFromQueryString: function() { var k = e.history.get("iai"),
                g = e.history.get("ia"); if (this.model.nameId !== g || typeof k === "undefined") { return } var j = this.model.itemsById[k];
            j && j.highlight(); if (!this._showingSlider) { return } for (var h = 0; h < this.views.items.length; h++) { if (this.views.itemsById[k] === this.views.items[h]) { var f = Math.floor(h / b);
                    this._scrollToPage(f, false); break } } }, _updateVisibleItems: function(n) { var f = this.$items.scrollLeft(),
                g = f + this._width,
                k = 0; if (n) { f = Math.min(f - this._width, 0);
                g += this._width } for (var j = 0; j < this.views.items.length; j++) { var m = this.views.items[j],
                    o = m.getWidth(),
                    h = k + o; if (k >= g) { break } if (h > f) { m.model.set("visible", true) } k += o } }, _scrollToPage: function(g, h) { h = h || (typeof h === "undefined"); var i = this.views.items[0].getWidth(),
                f = i * g * b;
            f -= 2; if (h) { this.$items.animate({ scrollLeft: f }, this._updateVisibleItems.bind(this, true)) } else { this.$items.scrollLeft(f);
                this._updateVisibleItems(true) } if (g === 0) { this.$left.addClass("is-hidden") } else { this.$left.removeClass("is-hidden") } if (g === this._lastPage) { this.$right.addClass("is-hidden") } else { this.$right.removeClass("is-hidden") } this._currentPage = g }, _onMoreClick: function(f) { f.preventDefault();
            this.model.engaged();
            this.model.fire("iacg");
            e.duckbar.open("news") }, _onLeftClick: function() { var f = Math.max(0, this._currentPage - 1);
            this._scrollToPage(f);
            this.model.engaged() }, _onRightClick: function() { var f = Math.min(this._lastPage, this._currentPage + 1);
            this._scrollToPage(f);
            this.model.engaged() }, _onResize: function() { var f = this.$el.width(); if (this._width === f) { return } this._scrollToPage(this._currentPage, false);
            this._width = f } }) }(DDG);
! function(b) { var a = b.Views.Modules.Base,
        c = 57,
        f = 20,
        e = 110;
    b.Views.Modules.Images = function(g) { a.call(this, g);
        this._updateContainerDimensions();
        this._numRows = Math.floor(this._containerHeight / e);
        this._cacheElems(".js-images", ["show-more", "thumbnails"]);
        this.bindEvents([
            [this.model, "change:items", this._onItemsChanged],
            [this.model, "change:failed", this._onItemsChanged],
            [b.device, "resize", this._onResize],
            [this.$showmore, "click", this._onMoreClick]
        ]);
        this.model.loadDeferred() };
    b.Views.Modules.Images.prototype = $.extend({}, a.prototype, { template: "images_module", _render: function() { a.prototype._render.call(this, this.model) }, _openImagesIA: function() { this.model.engaged();
            b.duckbar.open("images", {}) }, _updateContainerDimensions: function() { this._containerHeight = this.$parent.height() - c;
            this._containerWidth = this.$parent.width() - f }, _onItemsChanged: function() { if (!this.model.items.length) { this.$parent.css({ height: "0px", overflow: "hidden" }); return } if (!this.thumbnailsLoaded) { this.thumbnailsLoaded = true; var j = []; for (var g = 0; g < this._numRows; g++) { var h = this.model.getModuleRow(j.length, this._containerWidth, this._containerHeight / this._numRows);
                    j = j.concat(h) } if (j.length) { this.$el.css({ visibility: "visible" }) } else { this.$parent.css({ height: "0px", overflow: "hidden" }); return } this.$thumbnails.append(b.$exec_template("images_module_thumbnails", j));
                this.$(".js-images-link").on("click", this._onItemClick.bind(this)) } }, _onItemClick: function(h) { h.preventDefault();
            h.stopPropagation(); var i = $(h.currentTarget).data("id");
            this._openImagesIA(); var g = this.model.itemsById[i];
            g && g.select() }, _onMoreClick: function(g) { g.preventDefault();
            this.model.fire("iacg");
            this._openImagesIA() }, _onResize: function() { this.$thumbnails.empty();
            this.thumbnailsLoaded = false;
            this._updateContainerDimensions();
            this._onItemsChanged() }, hide: function() { $.noop() } }) }(DDG);
! function(e) { var c = e.Views.Modules,
        a = c.Base,
        b = { forecast: { desktop: 434 }, maps_maps: { desktop: 285 }, maps_places: { mobile: 363 }, news: { desktop: 292, mobile: 248 } };
    c.Placeholder = function(f) { this.signalWait = f.signalWait;
        this.timeAdded = new Date().getTime();
        a.call(this, f);
        this.show();
        this.updateHeight() };
    c.Placeholder.prototype = $.extend({}, a.prototype, { template: "module_placeholder", isModule: true, updateHeight: function() { if (!b[this.signalWait]) { return } var f; if (e.device.isMobile && b[this.signalWait].mobile) { f = b[this.signalWait].mobile } else { f = b[this.signalWait].desktop } this.$el.height(f) }, showImages: function(f) { this.views.images = new e.Views.Modules.Images({ model: f, appendTo: this.$el }) } }) }(DDG);
! function(b) { var a = b.Views.Modules.Base;
    b.Views.Modules.Places = function(c) { c.model = c.answer ? c.answer : c.model;
        a.call(this, c);
        this.bindEvents([
            [this.$el, "click", this._onClick],
            [this.$toggle, "click", this._onToggleClick],
            [this.model, "change:expanded", this._onExpandedChange],
            [this.model, "change:isMapExpanded", this._onMapExpandedChange],
            [this.model, "change:userMapIntent", this._onUserMapIntentChange],
            [b.userLocator, "meaningfulUserLocationChange", this._onUserLocationChange]
        ]); if (this.model.geoip) { var e = new b.Models.UserLocation({ lat: parseFloat(this.model.geoip.lat), lon: parseFloat(this.model.geoip.lon), type: b.Models.UserLocation.GEOIP_LOCATION }); if (e.isValid()) { b.userLocator.setGeoIPLocation(e) } } this._updateExpandedState() };
    b.Views.Modules.Places.prototype = $.extend({}, a.prototype, { template: "places_module", _render: function(c) { a.prototype._render.call(this, c);
            this._cacheElems(".js-places-module", ["content", "toggle", "more", "less"]); if (b.userLocator.canGetLocation() && this.model.meta.sourceName !== "TripAdvisor") { if (b.history.get("ulexp")) { b.search.userLocationExp = b.history.get("ulexp") } else { if (b.userLocator.hasLocation() || !b.settings.isDefault("kat")) { b.search.userLocationExp = "a" } else { if (this.model.proximity && b.device.isEnglish && b.device.countryCode === "US") { b.search.userLocationExp = "a" } } } if (b.search.userLocationExp === "a") { if (!b.userLocator.hasLocation()) { if (b.settings.isDefault("kat")) { this.views.userLocationCTA = new b.Views.UserLocationCTA({ before: this.$el }) } } else { this.views.userLocationFilter = new b.Views.Dropdowns.UserLocationFilter({ appendTo: this.$el });
                        b.userLocator.updateLocation({ updateType: "bg" }) } } } this._viewClass = (this.model.items.length > 1) ? "PlacesMultiple" : "PlacesSingle";
            this.views.module = new b.Views.Places[this._viewClass]({ appendTo: this.$content, model: this.model }); if (!this.model.isMapExpanded) { this.$el.addClass("has-feedback-prompt");
                this.views.feedback = new b.Views.Feedback.FeedbackPrompt({ sourceName: this.model.meta.sourceName, category: "maps", categoryName: "Places", categoryValue: this.model.items.length > 1 ? "places_multiple" : "places_single", promptText: l("Feedback"), showYesNo: false, appendTo: this.$el }) } }, _updateExpandedState: function() { if (this.model.isExpandable()) { this.$toggle.show();
                this.$more.toggleClass("is-hidden");
                this.$less.toggleClass("is-hidden") } }, _onExpandedChange: function() { this._updateExpandedState() }, _onMapExpandedChange: function() { b.duckbar.modulesLayoutView.model.set("expandedMapId", "maps_places") }, _onClick: function(f) { f.stopPropagation();
            this.model.engaged(); var c = $(f.target).hasClass("js-place-detail-hours-toggle") || $(f.target).hasClass("js-place-hours-close"); if (b.device.isMobileDevice && !c) { this.model.toggleExpand() } }, _onToggleClick: function(c) { c.stopPropagation();
            this.model.engaged();
            this.model.toggleExpand() }, _onUserMapIntentChange: function() { b.require("mapkit", $.noop) }, _onUserLocationChange: function(c) { if (!this.model.isMapExpanded) { w.location.reload() } } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.About.AboutItem = function(c) { this.answer = c.answer;
        a.call(this, c);
        this._cacheElems(".js-about-item", ["abstr", "link", "more-at-inline", "more-at-bottom", "clickable-header"]);
        this.bindEvents([
            [this.answer, "change:expanded", this._onExpandedChange],
            [this.$link, "click", this._onExternalLinkClick],
            [this.$moreatinline, "click", this._onExternalLinkClick],
            [this.$moreatbottom, "click", this._onExternalLinkClick],
            [this.$clickableheader, "click", this._onExternalLinkClick]
        ]); if (this.model.hasInfobox) { this.views.infobox = new b.Views.About.AboutInfoBox({ appendTo: this.$el, model: this.model.infobox }) } if (this.model.profiles) { this.answer.set("profileLinks", this.model.profiles.links.length);
            this.views.profiles = new b.Views.About.AboutProfiles({ appendTo: this.$el, model: this.model.profiles, answer: this.answer }) } this._updateExpandedState() };
    b.Views.About.AboutItem.prototype = $.extend({}, a.prototype, { template: "about_item", _render: function() { a.prototype._render.call(this, this.model); if (this.answer.isMapExpanded) { this._cacheElems(".js-about-item", ["title"]);
                this.views.directions = new b.Views.Maps.DirectionsButton({ prependTo: this.$el, answer: this.answer, loc: this.model.header.mapLocation }) } }, _prettifyCode: function() { var c = this.$("pre"); if (c.length) { DDG.require("prettify", function() { c.addClass("prettyprint");
                    window.prettyPrint() }) } }, _updateExpandedState: function() { if (this.model.getAbstract) { this.$abstr.html(this.model.getAbstract()) } if (this.model.hasCode) { this._prettifyCode() } if (!this.model.showMoreAtBottom) { return } if (this.model.showMoreAtBottom()) { this.$moreatbottom.removeClass("is-hidden");
                this.$moreatinline.addClass("is-hidden") } else { this.$moreatbottom.addClass("is-hidden");
                this.$moreatinline.removeClass("is-hidden") } }, _onExpandedChange: function() { if (this.answer.expanded) { this.model.expand() } else { this.model.collapse() } this._updateExpandedState() }, _onExternalLinkClick: function(c) { c.stopPropagation();
            this.answer.clickedExternalLink();
            this.answer.engaged(); return a.prototype._onExternalLinkClick.call(this, c) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.About.AboutInfoBox = function(c) { a.call(this, c);
        this.bindEvents([
            [this.model, "change:expanded", this._rerender]
        ]) };
    b.Views.About.AboutInfoBox.prototype = $.extend({}, a.prototype, { template: "about_infobox", _render: function() { a.prototype._render.call(this, this.model) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.About.AboutHeader = function(c) { this.answer = c.answer;
        a.call(this, c);
        this.bindEvents([
            [this.model, "change:mapLocation", this._onMapLocationChanged],
            [this.model, "change:mapFailed", this._onMapFailed]
        ]); if (this.model.mapLocation) { this._renderMap() } };
    b.Views.About.AboutHeader.prototype = $.extend({}, a.prototype, { template: "about_header", _render: function(c) { a.prototype._render.call(this, this.model);
            this._cacheElems(".js-about-header", ["image", "map"]);
            this.bindEvents([
                [this.$image, "click", this._onImageClicked],
                [this.$map, "click", this._onMapClicked]
            ]) }, _renderMap: function() { if (this.views.map) { return } setTimeout(function() { this.views.map = new b.Views.Mapkit.StaticMap({ markers: [this.model.mapLocation], width: this.$map.outerWidth(), height: this.$map.outerHeight(), appendTo: this.$map, showCTA: true }) }.bind(this), 0) }, _onMapLocationChanged: function() { this._renderMap() }, _onMapFailed: function() { b.pixel.fire("iahmf", this.answer.pixelId, this.answer.getPixelData()) }, _onImageClicked: function() { b.pixel.fire("iahic", this.answer.pixelId, this.answer.openType, this.answer.getPixelData());
            b.duckbar.open("images") }, _onMapClicked: function(c) { c.preventDefault();
            this.answer.set("isMapExpanded", true);
            this.answer.fire("iacg");
            b.pixel.fire("iahmc", this.answer.pixelId, this.answer.openType, this.answer.getPixelData()) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.About.AboutProfiles = function(c) { this.answer = c.answer;
        a.call(this, c);
        this.bindEvents([
            [this.model, "change:links", this._rerender]
        ]) };
    b.Views.About.AboutProfiles.prototype = $.extend({}, a.prototype, { template: "about_profiles", _render: function() { a.prototype._render.call(this, this.model);
            this.bindEvents([
                [".js-about-profile-link", "click", this._onExternalLinkClick]
            ]) }, _onExternalLinkClick: function(f) { var c = $(f.currentTarget),
                g = c && c.attr("title");
            f.stopPropagation();
            this.answer.clickedExternalLink({ plc: g });
            this.answer.engaged(); return a.prototype._onExternalLinkClick.call(this, f) } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Verticals.Base = function(c) { this.views = { items: [], itemsById: {} };
        a.call(this, c);
        this.$results = this.$results || this.$(".js-vertical-results");
        this.$moduleWrapper = this.$(".js-vertical-sidebar-modules");
        this._createFilterDropdowns();
        this.bindEvents([
            [b.device, "resize", this._onResize],
            [this.model, "change:active", this._onActiveChanged],
            [this.model, "change:items", this._onItemsChanged],
            [this.model, "no-results", this._onNoMoreResults],
            [this.model, "change:failed", this._onFailed],
            [this.model, "change:isRequerying", this._onRequeryingChanged],
            [this.model, "change:isLoading", this._onLoadingChanged],
            [b.deep, "change:finished", this._showFeedbackBtn]
        ]); if (this.model.active) { this.show() } if (this.model.items.length) { this._updateItems() } else { if (this.model.failed) { this.showNoResults() } } if (b.deep.finished) { this._showFeedbackBtn() } };
    b.Views.Verticals.Base.prototype = $.extend({}, a.prototype, { isValid: function() { return true }, show: function() { this.$el.removeClass("is-hidden");
            b.keyboard.set("namespace", this.model.id);
            b.hidden.set("iar", this.model.id) }, hide: function() { this.$el.addClass("is-hidden");
            b.keyboard.clear("namespace");
            b.hidden.clear("iar", this.model.id) }, showNoResults: function() { if (!this.views.noResults) { this.views.noResults = new b.Views.NoResults({ vertical: this.model.pixelId, resultType: this.model.meta.itemType, appendTo: this.$results }) } this.views.noResults.show();
            this._showingNoResults = true }, hideNoResults: function() { this.views.noResults.hide();
            this._showingNoResults = false }, _render: function(c) { c.id = this.model.id;
            a.prototype._render.call(this, c) }, _updateItems: function() { if (this._showingNoResults) { this.hideNoResults() } for (var c = 0; c < this.model.items.length; c++) { var e = this.model.items[c]; if (this.views.itemsById[e.id]) { continue } this._appendItem(e) } }, _appendItem: function(e) { if (!this.ItemClass) { throw new Error("Can't append item to vertical, no item view was defined ") } var c = new this.ItemClass({ model: e, answer: this.model, appendTo: this.$results });
            this.views.items.push(c);
            this.views.itemsById[e.id] = c }, _createFilterDropdowns: function() { var c = this.$(".js-vertical-filters"); if (c.length === 0) { return } this.views.filters = new b.Views.Dropdowns.FilterContainer({ $el: c, answer: this.model }) }, _showFeedbackBtn: function() { if (this.views.feedback || b.device.isMobile) { return } this.views.feedback = new b.Views.Feedback.Button({ appendTo: this.$(".js-vertical-bottom-right"), category: this.model.id, extraData: { vertical: this.model.nameId } }) }, _onFailed: function() { if (!this.model.failed) { return } if (!this.model.items.length) { this.showNoResults() } else { this._updateItems() } }, _onActiveChanged: function() { if (this.model.active) { this.show() } else { this.hide() } }, _onItemsChanged: function() { this._updateItems() }, _onRequeryingChanged: function(e) { this.$el.toggleClass("is-requerying", e); if (!e) { for (var c = 0; c < this.views.items.length; c++) { this.views.items[c].destroy() } this.views.items = [];
                this.views.itemsById = {} } }, _onLoadingChanged: $.noop, _onResize: $.noop, _onNoMoreResults: $.noop }) }(DDG);
! function(c) { var b = c.Views.ClickableItem,
        a = "highlight";
    c.Views.Verticals.VerticalLinkItem = function(e) { this.model = e.model;
        this.answer = e.answer;
        b.call(this, e);
        this._cacheElems(".js-result", ["image-wrapper", "img-placeholder"]);
        this.bindEvents([
            [this.$el, "mouseenter", this._onMouseEnter],
            [this.$el, "mouseleave", this._onMouseLeave],
            [this.model, "change:image", this._onImageFetched],
            [this.model, "change:highlighted", this._onHighlightedChanged],
            [c.device, "resize", this._onResize]
        ]) };
    c.Views.Verticals.VerticalLinkItem.prototype = $.extend({}, b.prototype, { template: "vertical_link_item", open: function() { this.$el.click() }, getBounds: function() { if (!this._bounds) { var f = this.$el.offset().top,
                    e = f + this.$el.height();
                this._bounds = { top: f, bottom: e } } return this._bounds }, _render: function(e) { b.prototype._render.call(this, $.extend(e, { urlAboveSnippet: c.settings.isDefault("kai"), favicons: c.settings.isDefault("kf") })) }, _onImageFetched: function() { var e = DDG.getImageProxyURL(this.model.image, false, false, 150);
            this.$img = $('<div class="result__image__img" style="background-image:url(' + e + ')"></div>');
            this.$imagewrapper.append(this.$img);
            this.$imgplaceholder.hide() }, _onHighlightedChanged: function() { this.$el.toggleClass(a, !!this.model.highlighted) }, _onClick: function(g, f) { this.model.highlight();
            b.prototype._onClick.call(this, g, f) }, _onMouseEnter: function(f) { if (c.keyboard.active) { return } this.model.highlight() }, _onMouseLeave: function(f) { this.model.unhighlight() }, _onResize: function(f) { delete this._bounds } }) }(DDG);
! function(c) { var a = c.Views.Verticals.Base,
        b = 70;
    c.Views.Verticals.VerticalLinks = function(e) { a.call(this, e);
        this.bindEvents([
            [c.device, "scroll", this._onScroll]
        ]); if (c.settings.isDefault("kk")) { this.bindEvents([
                [c.keyboard, "up." + this.model.id, this._onUp],
                [c.keyboard, "j." + this.model.id, this._onUp],
                [c.keyboard, "down." + this.model.id, this._onDown],
                [c.keyboard, "k." + this.model.id, this._onDown],
                [c.keyboard, "enter." + this.model.id, this._onEnter]
            ]) } this.$results.on("click", ".js-result-more", this._onLoadMoreClick.bind(this));
        this._pageNumber = 1;
        this._selectItemFromQuerystring();
        this.menu = new c.Models.AnswerBarMenu();
        this.modulesLayoutView = new c.Views.ModulesLayout({ menu: this.menu, model: c.modulesLayout, verticalId: e.id, selectors: { SIDE: ".js-vertical-sidebar-modules" } }) };
    c.Views.Verticals.VerticalLinks.prototype = $.extend({}, a.prototype, { template: "vertical_links", ItemClass: c.Views.Verticals.VerticalLinkItem, _addSpellingMessage: function() { if (this.$spelling) { return } this.$spelling = new c.Views.SpellingMessage({ before: this.$results.selector, model: c.search.spelling, ia: this.model.id }) }, _updateItems: function() { this._removeLoadMore(); if (this.model.usingSpellingBackfill) { this._addSpellingMessage() } if (this.views.items.length && this.views.items.length !== this.model.items.length) { this._addSeparator() } a.prototype._updateItems.call(this);
            delete this._height;
            this._selectItemFromQuerystring(); if (!this._showingNoResults) { if (this.model.canLoadMore()) { this.$loadMore = c.$exec_template("vertical_load_more");
                    this.$results.append(this.$loadMore) } else { this._showNoMoreResults() } } this._onScroll() }, _appendItem: function(e) { a.prototype._appendItem.call(this, e);
            e.set("visible", true) }, _showNoMoreResults: function() { this._removeLoadMore();
            c.footer.set("visible", true) }, _removeLoadMore: function() { if (this.$loadMore) { this.$loadMore.remove();
                delete this.$loadMore } }, _addSeparator: function() { this._pageNumber++;
            new c.Views.Verticals.VerticalSeparator({ appendTo: this.$results, pageNumber: this._pageNumber }) }, _loadMoreCheck: function() { if (!c.settings.autoloadDisabled()) { return } var e = c.history.get("pn"); if (e && this._pageNumber < e) { this.model.loadMore() } }, _selectItemFromQuerystring: function() { if (this._selectedItemFromQS) { return } var g = c.history.get("iai"),
                e = c.history.get("ia"); if (this.model.nameId === e && typeof g !== "undefined") { var f = this.model.itemsById[g]; if (f) { f.highlight();
                    this._updateScrollPosition();
                    this._selectedItemFromQS = true } } }, _highlightFirstVisibleItem: function() { var f = this.views.items,
                h = c.device.scrollTop(),
                e; if (!f.length) { return } if (h === 0) { e = f[0] } else { h += b + c.get_header_height(); for (var g = 0; g < f.length; g++) { if (f[g].getBounds().top > h) { e = f[g]; break } } } if (e) { e.model.highlight();
                this._updateScrollPosition() } }, _isHighlightedItemVisible: function() { var f = this.model.highlightedItem && this.views.itemsById[this.model.highlightedItem.id]; if (!f) { return } var e = f.getBounds(),
                h = c.device.scrollTop(),
                g = c.device.height; return e.top > h && e.bottom < h + g }, _updateScrollPosition: function() { var h = this.model.highlightedItem && this.views.itemsById[this.model.highlightedItem.id]; if (!h) { return } var g = h.getBounds(),
                f = g.top - b - c.get_header_height(),
                e = g.bottom + b,
                j = c.device.scrollTop(),
                i = c.device.height;
            f = Math.max(0, f); if (f < j) { c.device.scrollTop(f) } else { if (e > j + i) { c.device.scrollTop(e - i) } } }, _getHeight: function() { if (this._height) { return this._height } this._height = this.$results.height(); return this._height }, _onLoadingChanged: function(e) { if (this.$loadMore) { this.$loadMore.toggleClass("is-loading", e) } }, _onNoMoreResults: function() { this._showNoMoreResults() }, _onRequeryingChanged: function(e) { a.prototype._onRequeryingChanged.call(this, e); if (!e) { delete this._height;
                this._pageNumber = 1;
                this.$(".js-result-sep").remove();
                this.$loadMore && this.$loadMore.remove();
                delete this.$loadMore;
                this.$noMoreResults && this.$noMoreResults.remove();
                delete this.$noMoreResults } }, _onLoadMoreClick: function() { this.model.loadMore() }, _onResize: function() { a.prototype._onResize.call(this) }, _onScroll: function() { if (!this.model.active) { return } var e = this._getHeight(); if (!c.settings.isDefault("kav") && e && c.device.scrollTop() > e - (c.device.height * 2)) { this.model.loadMore() } this._loadMoreCheck() }, _onUp: function(f) { f.preventDefault(); if (this.model.highlightedItem === this.model.items[0]) { return this.model.highlightedItem.unhighlight() } if (this._isHighlightedItemVisible()) { this.model.highlightPrevItem();
                this._updateScrollPosition() } else { if (c.device.scrollTop() > 0) { this._highlightFirstVisibleItem() } } }, _onDown: function(f) { f.preventDefault(); if (this._isHighlightedItemVisible()) { this.model.highlightNextItem();
                this._updateScrollPosition() } else { this._highlightFirstVisibleItem() } }, _onEnter: function(g) { g.preventDefault(); var f = this.model.highlightedItem; if (f) { this.views.itemsById[f.id].open() } } }) }(DDG);
! function(b) { var a = b.Views.Base;
    b.Views.Verticals.VerticalSeparator = function(c) { a.call(this, c) };
    b.Views.Verticals.VerticalSeparator.prototype = $.extend({}, a.prototype, { template: "vertical_separator", _render: function(f) { var g = b.settings.get("kv"),
                e, c; if (g === "-1") { return } if (g === "m") { c = true } else { if (g === "l") { e = f.pageNumber } else { if (g === "1") { c = true;
                        e = f.pageNumber } } } a.prototype._render.call(this, { line: c, pageNumber: e }) } }) }(DDG);
! function(g) { var e = g.Views.Verticals.Base,
        b = ["xs", "s"],
        a = ["maps_maps", "maps_places", "about"],
        c = 32,
        h = "vertical--map__sidebar--",
        f = { MIN: "min", NORMAL: "normal" };
    g.Views.Verticals.VerticalMap = function(i) { this.ItemClass = i.ItemClass;
        this._glMapModel = i.model.glMapModel || new g.Models.GLMap({ locations: i.locations || i.model.itemsOnMap, pixelId: i.model.pixelId });
        i.model.isMapSidebarVisible = a.indexOf(i.model.id) > -1;
        i.model.isDarkMap = g.settings.isDarkTheme();
        e.call(this, i);
        this.bindEvents([
            [this.model, "change:isMapExpanded", this._onMapExpandedChanged],
            [this.model, "change:selectedItem", this._onSelectedItemChanged],
            [this.model, "change:sidebarLayout", this._onSidebarLayoutChanged],
            [this.model, "change:sidebarPosition", this._onSidebarPositionChanged],
            [this.model, "change:isDarkMap", this._onDarkMapChanged],
            [this.model, "change:isSearchAreaBtnVisible", this._onSearchAreaBtnVisibleChange],
            [this.model, "change:isMoreAtVisible", this._onIsMoreAtVisibleChange],
            [g.device, "resize", this._onResize],
            [g.settings, "change:" + g.settings.THEME_KEY, this._onThemeChange]
        ]);
        this._selectItemFromQuerystring() };
    g.Views.Verticals.VerticalMap.prototype = $.extend({}, e.prototype, { template: "vertical_map", show: function() { this.views.closeControl ? this.views.closeControl.show() : this._renderCloseControl();
            this.updateTheme(this.model.isDarkMap);
            this._renderMapkitMap(); if (this.model.isMapSidebarVisible) { this._createSidebar() } g.history.set({ iaxm: this.model.nameId }); if (this.model.selectedItem && this.model.selectedItem.itemId) { g.history.set("iai", this.model.selectedItem.itemId) } $("html").addClass("has-vertical-map-open");
            e.prototype.show.call(this) }, hide: function() { this.views.closeControl && this.views.closeControl.hide();
            this.views.userLocControl && this.views.userLocControl.hide();
            g.history.clear("iaxm", "iai");
            $("html").removeClass("has-vertical-map-open");
            e.prototype.hide.call(this) }, updateTheme: function(i) { var j = h + "light"; if (i) { this.$toggle.removeClass(j) } else { this.$toggle.addClass(j) } }, _render: function(i) { if (this.model.isMapSidebarVisible) { this._updateSidebarLayout() } e.prototype._render.call(this, i);
            this._cacheElems(".js-vertical-map", ["map", "control-topright", "sidebar", "toggle", "toggle-button", "results-container", "results", "detail", "close-map", "requery", "back-to-list", "back-to-serp", "more", "more-link"]);
            this.show();
            g.pixel.fire("map_ei");
            this.bindEvents([
                [this.$sidebar, "click", this._onSidebarEngagement],
                [this.$requery, "click", this._onRequeryClick],
                [this.$toggle, "click", this._onSidebarToggleClicked]
            ]) }, _updateSidebarLayout: function() { if (!this.model.isMapExpanded) { return } var i = b.indexOf(g.device.widthBreakpoint()) > -1;
            this.model.set("sidebarLayout", i && g.device.isMobilePortrait() ? "bottom" : "left") }, _updateItems: function() { if (this.model.answerItemModel === "MapLocation") { this.ItemClass = g.Views.Address.AddressDetail;
                this.model.set("isMoreAtVisible") } else { if (this.model.answerItemModel === "Place") { this.ItemClass = g.Views.Places[this.model.items.length > 1 ? "PlaceListItem" : "PlacesSingleMap"]; if (this.model.meta.sourceUrl) { this.$morelink.attr("href", this.model.meta.sourceUrl) } else { this.model.set("isMoreAtVisible") } } } e.prototype._updateItems.call(this) }, _renderCloseControl: function() { if (this.views.closeControl) { return } this.views.closeControl = new g.Views.Mapkit.CloseControl({ model: this.model, appendTo: this.$controltopright }) }, _renderUserLocControl: function() { if (this.views.userLocControl || !g.userLocator.canGetLocation() || g.search.userLocationExp === "b") { return } this.views.userLocControl = new g.Views.Mapkit.UserLocationControl({ model: g.userLocator, appendTo: this.$controltopright }) }, _getMapOffset: function() { var i = 0,
                j = 0; if (this.model.sidebarLayout === "left") { if (this.model.sidebarPosition === f.MIN) { i = this.$toggle.width() - 10 } else { i = this.$sidebar.width() + this.$toggle.width() - 10 } } else { if (this.model.sidebarLayout === "bottom") { if (this.model.sidebarPosition === f.MIN) { j = c } else { j = this._getSidebarOffsetBottom() } } } return { top: 0, right: 0, bottom: j, left: i } }, _getSidebarOffsetBottom: function() { var i; if (this.model.answerType === "Maps") { i = this.$results.outerHeight(); return Math.min(i + c, (g.device.height / 2) + c) } return ((g.device.height / 2) + c) }, _renderMapkitMap: function() { if (this.views.mapkitMap) { return } var i; if (this._glMapModel.selectedLocation) { i = [this._glMapModel.selectedLocation] } else { i = this.model.itemsOnMap } setTimeout(function() { this.views.mapkitMap = new g.Views.Mapkit.Map({ markers: i, model: this._glMapModel, answer: this.model, markerType: "circle", appendTo: this.$map, mapOffset: this._getMapOffset() });
                this.bindEvents([
                    [this.views.mapkitMap, "scrollzoom", this._onMapScrollZoom]
                ]) }.bind(this), 0) }, _selectItemFromQuerystring: function() { var j = g.history.get("iai"),
                k = g.history.get("iaxm"); if (this.model.nameId === k && typeof j !== "undefined") { var i = this.model.itemsById[j]; if (i) { i.select();
                    this._isSelectedItemFromQS = true } } }, _createSidebar: function() { if (this.views.sidebar || !this.model.isMapSidebarVisible) { this._updateSidebarLayout(); return } var i = this.model.sidebarLayout === "bottom" ? g.Views.Maps.MapSidebarMobile : g.Views.Maps.MapSidebar;
            this.views.sidebar = new i({ model: this.model, appendTo: this.$sidebar });
            setTimeout(function() { if (this.model.sidebarLayout === "bottom") { this.$resultscontainer.css("max-height", g.device.height / 2);
                    this.$detail.css("max-height", g.device.height / 2) } if (this.model.sidebarPosition === f.NORMAL) { this._positionSidebar() } else { this.model.set("sidebarPosition", f.NORMAL) } }.bind(this), 0) }, _positionSidebar: function() { var i = this.model.sidebarPosition !== f.MIN; if (this.model.sidebarLayout === "bottom") { if (i) { this.$sidebar.css("transform", "translateY(-" + this._getSidebarOffsetBottom() + "px)") } else { this.$sidebar.css("transform", "translateY(-" + c + "px)") } } else { if (this.model.sidebarLayout === "left") { if (i) { this.$sidebar.css("transform", "translateX(0)");
                        this.$togglebutton.html("<") } else { this.$sidebar.css("transform", "translateX(-" + this.$sidebar.width() + "px)");
                        this.$togglebutton.html(">") } } } }, _onMapExpandedChanged: function() { if (this.model.isMapExpanded) { this.show() } else { this.hide() } }, _onSidebarLayoutChanged: function(j, i) { this.$el.removeClass("vertical--map--sidebar-" + i);
            this.$el.addClass("vertical--map--sidebar-" + j);
            this.views.sidebar.destroy();
            this.views.sidebar = null;
            this._createSidebar();
            setTimeout(function() { this.views.mapkitMap.updateMap(this._getMapOffset()) }.bind(this), 0) }, _onSidebarPositionChanged: function(j, i) { setTimeout(function() { if (i) { this.$sidebar.removeClass(h + i) } this.$sidebar.addClass(h + j) }.bind(this), 0);
            this._positionSidebar(); if (this.views.mapkitMap) { this.views.mapkitMap.updateMapOffset(this._getMapOffset()) } this.$el.toggleClass(h + f.MIN, j === f.MIN) }, _onDarkMapChanged: function() { this.updateTheme(this.model.isDarkMap) }, _onSidebarToggleClicked: function() { var i = this.model.sidebarPosition === f.MIN ? f.NORMAL : f.MIN;
            this.model.set("sidebarPosition", i);
            g.pixel.fire("map_est") }, _onSidebarEngagement: function() { g.pixel.fire("map_ese") }, _onRequeryClick: function() { this.model.set("shouldMapViewportUpdate", false);
            this.model.set("isSearchAreaBtnVisible", false); if (this.model.geo_bbox) { this.model.requery({ query: this.model.meta.queryParsed ? this.model.meta.queryParsed.what : this.model.meta.query, bbox_tl: this.model.geo_bbox.top_left, bbox_br: this.model.geo_bbox.bottom_right }) } }, _onMapScrollZoom: function() { this.model.set("isSearchAreaBtnVisible", true) }, _onResize: function() { if (!this.model.isMapSidebarVisible) { return } this._updateSidebarLayout() }, _onSelectedItemChanged: function(i) { if ((this.model.answerItemModel !== "Place" && this.model.answerType !== "Places") || this.model.isSingle) { return } if (this.views.currentItemDetail) { this.views.currentItemDetail.destroy();
                delete this.views.currentItemDetail } if (i) { this.model.primaryPlace = i;
                this.views.currentItemDetail = new g.Views.Places.PlacesSingleMap({ answer: this.model, model: this.model.primaryPlace, appendTo: this.$detail });
                this.$detail.show();
                this.$resultscontainer.hide();
                this.$backtoserp.hide();
                this.$backtolist.removeClass("is-hidden") } else { this.$detail.hide();
                this.$resultscontainer.show();
                this.$backtoserp.show();
                this.$backtolist.addClass("is-hidden") } if (this.model.sidebarPosition === f.MIN) { this.model.set("sidebarPosition", f.NORMAL) } }, _onThemeChange: function() { this.model.set("isDarkMap", g.settings.isDarkTheme()) }, _onSearchAreaBtnVisibleChange: function() { this.$requery.toggleClass("is-hidden", !this.model.isSearchAreaBtnVisible) }, _onIsMoreAtVisibleChange: function() { this.$more.toggle(this.model.isMoreAtVisible) } }) }(DDG);
! function(a) { a.feedback = new a.Models.Feedback();
    a.modulesLayout = new a.Models.ModulesLayout({});
    a.duckbar = new a.Duckbar();
    a.directionSource = new a.Models.AnswerSelectLists.DirectionSource();
    a.searchExperiments = new a.Models.SearchExperiments();
    a.vqd = new a.Models.VQD() }(DDG);
this["DDG"] = this["DDG"] || {};
this["DDG"]["templates"] = this["DDG"]["templates"] || {};
this["DDG"]["templates"]["base"] = Handlebars.template(function(c, k, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, f = "function",
        h = this.escapeExpression;
    g += '<div class="zci  zci--'; if (e = b.id) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.id);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + '" id="zci-'; if (e = b.id) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.id);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + '">'; if (e = b.content) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.content);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } if (a || a === 0) { g += a } g += "</div>"; return g });
this["DDG"]["templates"]["detail_slider"] = Handlebars.template(function(f, n, e, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    k = k || {}; var i = "",
        b, g, h = "function",
        j = this.escapeExpression,
        o = this;

    function c(t, s) { var p = "",
            q, r;
        p += 'style="height:'; if (r = e.detailHeight) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.detailHeight);
            q = typeof r === h ? r.call(t, { hash: {}, data: s }) : r } p += j(q) + ';"'; return p }

    function a(q, p) { return '<i class="tile-nav tile-nav--d tile-nav--prev js-detail-prev"></i><i class="tile-nav tile-nav--d tile-nav--next js-detail-next"></i>' } i += '<div class="detail  detail--slider  detail--'; if (g = e.id) { b = g.call(n, { hash: {}, data: k }) } else { g = (n && n.id);
        b = typeof g === h ? g.call(n, { hash: {}, data: k }) : g } i += j(b) + '  is-hidden" ';
    b = e["if"].call(n, (n && n.detailHeight), { hash: {}, inverse: o.noop, fn: o.program(1, c, k), data: k }); if (b || b === 0) { i += b } i += '><div class="detail__wrap"><i class="detail__close  js-detail-close"></i>';
    b = e["if"].call(n, (n && n.mobileAndNoTouch), { hash: {}, inverse: o.noop, fn: o.program(3, a, k), data: k }); if (b || b === 0) { i += b } i += '<div class="detail__panes  js-detail-panes"></div><div class="detail__controls"><i class="tile-nav--sm  tile-nav--sm--prev  js-detail-prev"></i><i class="tile-nav--sm  tile-nav--sm--next  js-detail-next"></i></div></div></div>'; return i });
this["DDG"]["templates"]["detail_slider_pane"] = Handlebars.template(function(c, k, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, f = "function",
        h = this.escapeExpression;
    g += '<div class="detail__pane" style="line-height:'; if (e = b.lineHeight) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.lineHeight);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + ";width:"; if (e = b.width) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.width);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + ";height:"; if (e = b.height) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.height);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + ";padding:"; if (e = b.padding) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.padding);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + ";padding-left:"; if (e = b.paddingLeft) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.paddingLeft);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + ';"></div>'; return g });
this["DDG"]["templates"]["duckbar_tab"] = Handlebars.template(function(f, n, e, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    j = j || {}; var i = "",
        b, g, p, o = this,
        h = "function",
        m = e.helperMissing;

    function c(r, q) { return "is-hidden" }

    function a(r, q) { return "is-active" } i += '<li class="zcm__item  ';
    b = e["if"].call(n, (n && n.visible), { hash: {}, inverse: o.program(1, c, j), fn: o.noop, data: j }); if (b || b === 0) { i += b } i += '"><a data-zci-link="'; if (g = e.id) { b = g.call(n, { hash: {}, data: j }) } else { g = (n && n.id);
        b = typeof g === h ? g.call(n, { hash: {}, data: j }) : g } if (b || b === 0) { i += b } i += '" class="zcm__link  js-zci-link  js-zci-link--'; if (g = e.id) { b = g.call(n, { hash: {}, data: j }) } else { g = (n && n.id);
        b = typeof g === h ? g.call(n, { hash: {}, data: j }) : g } if (b || b === 0) { i += b } i += " ";
    b = e["if"].call(n, (n && n.active), { hash: {}, inverse: o.noop, fn: o.program(3, a, j), data: j }); if (b || b === 0) { i += b } i += '" href="#">';
    b = (g = e.l || (n && n.l), p = { hash: {}, data: j }, g ? g.call(n, (n && n.name), p) : m.call(n, "l", (n && n.name), p)); if (b || b === 0) { i += b } i += "</a></li>"; return i });
this["DDG"]["templates"]["maps"] = Handlebars.template(function(c, k, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, f = "function",
        h = this.escapeExpression;
    g += '<div class="zci zci--'; if (e = b.id) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.id);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + '  mapview" id="zci-'; if (e = b.id) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.id);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + '"></div>'; return g });
this["DDG"]["templates"]["maps_marker_popup"] = Handlebars.template(function(c, p, n, i, s) { this.compilerInfo = [4, ">= 1.0.0"];
    n = this.merge(n, c.helpers);
    s = s || {}; var o = "",
        f, b = "function",
        a = this.escapeExpression,
        m = this;

    function k(v, u) { return "mapview-marker__popup--single-line" }

    function j(v, u) { return "has-directions js-popup-directions-container" }

    function h(y, x) { var u = "",
            v;
        v = n["if"].call(y, (y && y.name), { hash: {}, inverse: m.noop, fn: m.program(6, g, x), data: x }); if (v || v === 0) { u += v } v = n["if"].call(y, (y && y.address), { hash: {}, inverse: m.noop, fn: m.program(8, e, x), data: x }); if (v || v === 0) { u += v } v = n["if"].call(y, (y && y.displayLatLon), { hash: {}, inverse: m.noop, fn: m.program(10, t, x), data: x }); if (v || v === 0) { u += v } return u }

    function g(z, y) { var u = "",
            v, x;
        u += '<span class="mapview-marker__popup__name">'; if (x = n.name) { v = x.call(z, { hash: {}, data: y }) } else { x = (z && z.name);
            v = typeof x === b ? x.call(z, { hash: {}, data: y }) : x } u += a(v) + "</span>"; return u }

    function e(z, y) { var u = "",
            v, x;
        u += '<span class="mapview-marker__popup__address">'; if (x = n.address) { v = x.call(z, { hash: {}, data: y }) } else { x = (z && z.address);
            v = typeof x === b ? x.call(z, { hash: {}, data: y }) : x } u += a(v) + "</span>"; return u }

    function t(z, y) { var u = "",
            v, x;
        u += '<span class="mapview-marker__popup__latlon">'; if (x = n.displayLatLon) { v = x.call(z, { hash: {}, data: y }) } else { x = (z && z.displayLatLon);
            v = typeof x === b ? x.call(z, { hash: {}, data: y }) : x } if (v || v === 0) { u += v } u += "</span>"; return u }

    function r(y, x) { var u = "",
            v;
        u += '<a class="js-directions-link" href="#">';
        v = n["if"].call(y, (y && y.name), { hash: {}, inverse: m.noop, fn: m.program(13, q, x), data: x }); if (v || v === 0) { u += v } v = n["if"].call(y, (y && y.address), { hash: {}, inverse: m.noop, fn: m.program(8, e, x), data: x }); if (v || v === 0) { u += v } v = n["if"].call(y, (y && y.displayLatLon), { hash: {}, inverse: m.noop, fn: m.program(10, t, x), data: x }); if (v || v === 0) { u += v } u += "</a>"; return u }

    function q(z, y) { var u = "",
            v, x;
        u += '<div class="mapview-marker__popup__directions-name"><span class="ddgsi mapview-marker__popup__directions-icon">d</span><span class="mapview-marker__popup__name">'; if (x = n.name) { v = x.call(z, { hash: {}, data: y }) } else { x = (z && z.name);
            v = typeof x === b ? x.call(z, { hash: {}, data: y }) : x } u += a(v) + "</span></div>"; return u } o += '<span class="mapview-marker__popup ';
    f = n["if"].call(p, (p && p.singleLinePopup), { hash: {}, inverse: m.noop, fn: m.program(1, k, s), data: s }); if (f || f === 0) { o += f } o += " ";
    f = n["if"].call(p, (p && p.showDirections), { hash: {}, inverse: m.noop, fn: m.program(3, j, s), data: s }); if (f || f === 0) { o += f } o += '">';
    f = n.unless.call(p, (p && p.showDirections), { hash: {}, inverse: m.program(12, r, s), fn: m.program(5, h, s), data: s }); if (f || f === 0) { o += f } o += "</span>"; return o });
this["DDG"]["templates"]["metabar"] = Handlebars.template(function(f, t, r, m, B) { this.compilerInfo = [4, ">= 1.0.0"];
    r = this.merge(r, f.helpers);
    B = B || {}; var s = "",
        i, a, q = r.helperMissing,
        p = this,
        c = "function",
        b = this.escapeExpression;

    function o(D, C) { return "has-dropdowns" }

    function n(D, C) { return "is-hidden" }

    function k(H, G) { var C = "",
            E, F, D;
        C += '<div class="metabar__more-at">';
        E = (F = r.moreAt || (H && H.moreAt), D = { hash: {}, data: G }, F ? F.call(H, H, "none", D) : q.call(H, "moreAt", H, "none", D)); if (E || E === 0) { C += E } C += "</div> "; return C }

    function j(G, F) { var C = "",
            D, E;
        C += '<div class="metabar__secondary-text  ';
        D = r["if"].call(G, (G && G.alwaysShowSecondaryText), { hash: {}, inverse: p.program(8, h, F), fn: p.noop, data: F }); if (D || D === 0) { C += D } C += '">'; if (E = r.secondaryText) { D = E.call(G, { hash: {}, data: F }) } else { E = (G && G.secondaryText);
            D = typeof E === c ? E.call(G, { hash: {}, data: F }) : E } if (D || D === 0) { C += D } D = r["if"].call(G, (G && G.showMoreAt), { hash: {}, inverse: p.noop, fn: p.program(10, A, F), data: F }); if (D || D === 0) { C += D } C += "</div>"; return C }

    function h(D, C) { return "hide--screen-s" }

    function A(D, C) { return '<span class="sep"></span>' }

    function z(D, C) { return '<span class="metabar__attribution__sep sep"></span>' }

    function y(E, D) { var C;
        C = r["if"].call(E, (E && E.secondaryText), { hash: {}, inverse: p.noop, fn: p.program(12, z, D), data: D }); if (C || C === 0) { return C } else { return "" } }

    function x(F, E) { var C, D; if (D = r.primaryText) { C = D.call(F, { hash: {}, data: E }) } else { D = (F && F.primaryText);
            C = typeof D === c ? D.call(F, { hash: {}, data: E }) : D } if (C || C === 0) { return C } else { return "" } }

    function v(E, D) { var C;
        C = r["if"].call(E, (E && E.sourceNoTransform), { hash: {}, inverse: p.program(21, g, D), fn: p.program(19, u, D), data: D }); if (C || C === 0) { return C } else { return "" } }

    function u(H, G) { var C = "",
            E, F, D;
        C += '<span class="metabar__item-type--no-transform">' + b((F = r.l || (H && H.l), D = { hash: {}, data: G }, F ? F.call(H, (H && H.itemType), D) : q.call(H, "l", (H && H.itemType), D))) + "</span> ";
        E = (F = r.l || (H && H.l), D = { hash: {}, data: G }, F ? F.call(H, "for", D) : q.call(H, "l", "for", D)); if (E || E === 0) { C += E } C += ' <span class="metabar__term">'; if (F = r.searchTerm) { E = F.call(H, { hash: {}, data: G }) } else { F = (H && H.searchTerm);
            E = typeof F === c ? F.call(H, { hash: {}, data: G }) : F } C += b(E) + "</span>"; return C }

    function g(H, G) { var C = "",
            E, F, D;
        C += '<span class="metabar__item-type">' + b((F = r.l || (H && H.l), D = { hash: {}, data: G }, F ? F.call(H, (H && H.itemType), D) : q.call(H, "l", (H && H.itemType), D))) + "</span> ";
        E = (F = r.l || (H && H.l), D = { hash: {}, data: G }, F ? F.call(H, "for", D) : q.call(H, "l", "for", D)); if (E || E === 0) { C += E } C += ' <span class="metabar__term">'; if (F = r.searchTerm) { E = F.call(H, { hash: {}, data: G }) } else { F = (H && H.searchTerm);
            E = typeof F === c ? F.call(H, { hash: {}, data: G }) : F } C += b(E) + "</span>"; return C }

    function e(D, C) { return '<div class="metabar__dropdowns-wrap"><div class="metabar__dropdowns js-metabar-dropdowns is-loading"></div></div>' } s += '<div class="metabar  metabar--fixed  js-zcm-sticky ';
    i = r["if"].call(t, (t && t.showDropdowns), { hash: {}, inverse: p.noop, fn: p.program(1, o, B), data: B }); if (i || i === 0) { s += i } s += " ";
    i = r["if"].call(t, (t && t.hidden), { hash: {}, inverse: p.noop, fn: p.program(3, n, B), data: B }); if (i || i === 0) { s += i } s += '"><div class="metabar__in  js-metabar"><span class="metabar__mode-wrap"><a class="btn--icon  metabar__mode  js-metabar-mode  is-disabled">'; if (a = r.initialModeIcon) { i = a.call(t, { hash: {}, data: B }) } else { a = (t && t.initialModeIcon);
        i = typeof a === c ? a.call(t, { hash: {}, data: B }) : a } s += b(i) + "</a></span>";
    i = r["if"].call(t, (t && t.showMoreAt), { hash: {}, inverse: p.noop, fn: p.program(5, k, B), data: B }); if (i || i === 0) { s += i } i = r["if"].call(t, (t && t.secondaryText), { hash: {}, inverse: p.noop, fn: p.program(7, j, B), data: B }); if (i || i === 0) { s += i } s += '<div class="metabar__attribution  js-attribution  hide--screen-s  is-hidden">';
    i = r["if"].call(t, (t && t.showMoreAt), { hash: {}, inverse: p.program(14, y, B), fn: p.program(12, z, B), data: B }); if (i || i === 0) { s += i } s += '</div><div class="metabar__primary-text js-metabar-primary is-loading">';
    i = r["if"].call(t, (t && t.primaryText), { hash: {}, inverse: p.program(18, v, B), fn: p.program(16, x, B), data: B }); if (i || i === 0) { s += i } s += "</div>";
    i = r["if"].call(t, (t && t.showDropdowns), { hash: {}, inverse: p.noop, fn: p.program(23, e, B), data: B }); if (i || i === 0) { s += i } s += "</div></div>"; return s });
this["DDG"]["templates"]["tiles"] = Handlebars.template(function(c, k, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, f = "function",
        h = this.escapeExpression;
    g += '<div class="zci  zci--'; if (e = b.id) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.id);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + '  zci--type--tiles" id="zci-'; if (e = b.id) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.id);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + '"><div class="tileview  js-tileview"><div class="tile-wrap"><div class="zci__main  zci__main--tiles  js-tiles  has-tiles  has-nav">'; if (e = b.content) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.content);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } if (a || a === 0) { g += a } g += "</div></div></div></div>"; return g });
this["DDG"]["templates"]["tiles_scroll_nav"] = Handlebars.template(function(c, k, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, f = "function",
        h = this.escapeExpression;
    g += '<i class="tile-nav  tile-nav--'; if (e = b.dir) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.dir);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + '  js-tile-nav"></i>'; return g });
this["DDG"]["templates"]["topic_menu"] = Handlebars.template(function(e, f, b, a, c) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, e.helpers);
    c = c || {}; return '<div class="zcm  zcm--sub  zcm--topics"><ul class="zcm__menu  zcm__menu--topics js-topic-menu"></ul></div>' });
this["DDG"]["templates"]["topic_menu_item"] = Handlebars.template(function(e, m, c, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    j = j || {}; var h = "",
        a, f, p, g = "function",
        i = this.escapeExpression,
        o = this,
        n = c.blockHelperMissing;

    function b(t, s) { var q = "",
            r;
        q += '<sup class="zcm__link__count  js-topic-menu-count">' + i(((r = ((r = (t && t.items)), r == null || r === false ? r : r.length)), typeof r === g ? r.apply(t) : r)) + "</sup>"; return q } h += '<li class="zcm__item"><a class="zcm__link--sub  js-topic-menu-link" href="#">'; if (f = c.name) { a = f.call(m, { hash: {}, data: j }) } else { f = (m && m.name);
        a = typeof f === g ? f.call(m, { hash: {}, data: j }) : f } h += i(a);
    p = { hash: {}, inverse: o.program(1, b, j), fn: o.noop, data: j }; if (f = c.hideCount) { a = f.call(m, p) } else { f = (m && m.hideCount);
        a = typeof f === g ? f.call(m, p) : f } if (!c.hideCount) { a = n.call(m, a, { hash: {}, inverse: o.program(1, b, j), fn: o.noop, data: j }) } if (a || a === 0) { h += a } h += "</a></li>"; return h });
this["DDG"]["templates"]["answer_detail"] = Handlebars.template(function(c, j, b, i, h) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    h = h || {}; var g = "",
        a, e, f = "function";
    g += '<div class="cw"><div class="zci__main  zci__main--detail"><div class="zci__body">'; if (e = b.Answer) { a = e.call(j, { hash: {}, data: h }) } else { e = (j && j.Answer);
        a = typeof e === f ? e.call(j, { hash: {}, data: h }) : e } if (a || a === 0) { g += a } g += "</div></div></div>"; return g });
this["DDG"]["templates"]["base_detail"] = Handlebars.template(function(f, m, e, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    i = i || {}; var h = "",
        b, g = "function",
        k = e.helperMissing,
        p = this;

    function c(t, s) { var q, r; if (r = e.content) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.content);
            q = typeof r === g ? r.call(t, { hash: {}, data: s }) : r } if (q || q === 0) { return q } else { return "" } }

    function a(u, t) { var r, s, q;
        r = (s = e.include || (u && u.include), q = { hash: {}, data: t }, s ? s.call(u, ((r = ((r = (u && u.meta)), r == null || r === false ? r : r.options)), r == null || r === false ? r : r.content), q) : k.call(u, "include", ((r = ((r = (u && u.meta)), r == null || r === false ? r : r.options)), r == null || r === false ? r : r.content), q)); if (r || r === 0) { return r } else { return "" } }

    function o(v, u) { var q = "",
            s, t, r;
        q += '<div class="c-base__links">';
        s = (t = e.moreAt || (v && v.moreAt), r = { hash: { className: ("c-base__link") }, data: u }, t ? t.call(v, (v && v.meta), "none", r) : k.call(v, "moreAt", (v && v.meta), "none", r)); if (s || s === 0) { q += s } s = e["if"].call(v, ((s = ((s = (v && v.meta)), s == null || s === false ? s : s.options)), s == null || s === false ? s : s.moreText), { hash: {}, inverse: p.noop, fn: p.program(6, n, u), data: u }); if (s || s === 0) { q += s } q += "</div>"; return q }

    function n(v, u) { var q = "",
            s, t, r;
        q += '<span class="c-base__link--more  sep--before">';
        s = (t = e.formatSubtitle || (v && v.formatSubtitle), r = { hash: {}, data: u }, t ? t.call(v, ((s = ((s = (v && v.meta)), s == null || s === false ? s : s.options)), s == null || s === false ? s : s.moreText), r) : k.call(v, "formatSubtitle", ((s = ((s = (v && v.meta)), s == null || s === false ? s : s.options)), s == null || s === false ? s : s.moreText), r)); if (s || s === 0) { q += s } q += "</span>"; return q } h += '<div class="cw"><div class="zci__main  zci__main--detail  c-base"><div class="zci__body">';
    b = e["if"].call(m, (m && m.content), { hash: {}, inverse: p.program(3, a, i), fn: p.program(1, c, i), data: i }); if (b || b === 0) { h += b } b = e["if"].call(m, ((b = ((b = (m && m.meta)), b == null || b === false ? b : b.options)), b == null || b === false ? b : b.moreAt), { hash: {}, inverse: p.noop, fn: p.program(5, o, i), data: i }); if (b || b === 0) { h += b } h += "</div></div></div>"; return h });
this["DDG"]["templates"]["base_spice_detail"] = Handlebars.template(function(c, k, b, i, h) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    h = h || {}; var g = "",
        a, e, m, f = "function",
        j = b.helperMissing;
    g += '<div class="cw"><div class="zci__main  zci__main--detail"><div class="zci__body">'; if (e = b.content) { a = e.call(k, { hash: {}, data: h }) } else { e = (k && k.content);
        a = typeof e === f ? e.call(k, { hash: {}, data: h }) : e } if (a || a === 0) { g += a } g += '<div class="zci__links">';
    a = (e = b.moreAt || (k && k.moreAt), m = { hash: {}, data: h }, e ? e.call(k, ((a = (k && k.item)), a == null || a === false ? a : a.meta), m) : j.call(k, "moreAt", ((a = (k && k.item)), a == null || a === false ? a : a.meta), m)); if (a || a === 0) { g += a } g += "</div></div></div></div>"; return g });
this["DDG"]["templates"]["basic_icon_detail"] = Handlebars.template(function(e, q, o, i, y) { this.compilerInfo = [4, ">= 1.0.0"];
    o = this.merge(o, e.helpers);
    y = y || {}; var p = "",
        f, b = "function",
        a = this.escapeExpression,
        n = o.helperMissing,
        m = this;

    function k(A, z) { return "has-aux" }

    function j(E, D) { var z = "",
            B, C, A;
        z += '<div class="c-icon__img-wrap ' + a(((B = ((B = ((B = (E && E.meta)), B == null || B === false ? B : B.elClass)), B == null || B === false ? B : B.iconImage)), typeof B === b ? B.apply(E) : B)) + '"><img class="c-icon__img" src="';
        B = (C = o.imageProxy || (E && E.imageProxy), A = { hash: {}, data: D }, C ? C.call(E, (E && E.image), A) : n.call(E, "imageProxy", (E && E.image), A)); if (B || B === 0) { z += B } z += '" /></div>'; return z }

    function h(D, C) { var z = "",
            A, B;
        z += '<span class="c-icon__badge ' + a(((A = ((A = ((A = (D && D.meta)), A == null || A === false ? A : A.elClass)), A == null || A === false ? A : A.iconBadge)), typeof A === b ? A.apply(D) : A)) + " " + a(((A = ((A = ((A = (D && D.meta)), A == null || A === false ? A : A.elClass)), A == null || A === false ? A : A.bgColor)), typeof A === b ? A.apply(D) : A)) + '">'; if (B = o.badge) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.badge);
            A = typeof B === b ? B.call(D, { hash: {}, data: C }) : B } z += a(A) + "</span>"; return z }

    function g(D, C) { var z = "",
            A, B;
        z += '<h1 class="c-icon__title ' + a(((A = ((A = ((A = (D && D.meta)), A == null || A === false ? A : A.elClass)), A == null || A === false ? A : A.iconTitle)), typeof A === b ? A.apply(D) : A)) + '"><a href="'; if (B = o.url) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.url);
            A = typeof B === b ? B.call(D, { hash: {}, data: C }) : B } if (A || A === 0) { z += A } z += '">'; if (B = o.title) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.title);
            A = typeof B === b ? B.call(D, { hash: {}, data: C }) : B } z += a(A) + "</a></h1>"; return z }

    function c(E, D) { var z = "",
            B, C, A;
        z += '<span class="c-icon__sub ' + a(((B = ((B = ((B = (E && E.meta)), B == null || B === false ? B : B.elClass)), B == null || B === false ? B : B.iconSubtitle)), typeof B === b ? B.apply(E) : B)) + '">';
        B = (C = o.formatSubtitle || (E && E.formatSubtitle), A = { hash: {}, data: D }, C ? C.call(E, (E && E.subtitle), A) : n.call(E, "formatSubtitle", (E && E.subtitle), A)); if (B || B === 0) { z += B } z += "</span>"; return z }

    function x(E, D) { var z = "",
            B, C, A;
        z += '<span class="c-icon__sub ' + a(((B = ((B = ((B = (E && E.meta)), B == null || B === false ? B : B.elClass)), B == null || B === false ? B : B.iconAltSubtitle)), typeof B === b ? B.apply(E) : B)) + '">';
        B = (C = o.formatSubtitle || (E && E.formatSubtitle), A = { hash: {}, data: D }, C ? C.call(E, (E && E.altSubtitle), A) : n.call(E, "formatSubtitle", (E && E.altSubtitle), A)); if (B || B === 0) { z += B } z += "</span>"; return z }

    function v(E, D) { var z = "",
            B, C, A;
        z += '<div class="c-icon__content ' + a(((B = ((B = ((B = (E && E.meta)), B == null || B === false ? B : B.elClass)), B == null || B === false ? B : B.iconContent)), typeof B === b ? B.apply(E) : B)) + '">';
        B = (C = o.include || (E && E.include), A = { hash: {}, data: D }, C ? C.call(E, ((B = ((B = (E && E.meta)), B == null || B === false ? B : B.options)), B == null || B === false ? B : B.content), A) : n.call(E, "include", ((B = ((B = (E && E.meta)), B == null || B === false ? B : B.options)), B == null || B === false ? B : B.content), A)); if (B || B === 0) { z += B } z += "</div>"; return z }

    function u(B, A) { var z;
        z = o["if"].call(B, (B && B.description), { hash: {}, inverse: m.noop, fn: m.program(16, t, A), data: A }); if (z || z === 0) { return z } else { return "" } }

    function t(D, C) { var z = "",
            A, B;
        z += '<div class="c-icon__content ' + a(((A = ((A = ((A = (D && D.meta)), A == null || A === false ? A : A.elClass)), A == null || A === false ? A : A.iconContent)), typeof A === b ? A.apply(D) : A)) + '">'; if (B = o.description) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.description);
            A = typeof B === b ? B.call(D, { hash: {}, data: C }) : B } z += a(A) + "</div>"; return z }

    function s(E, D) { var z = "",
            B, C, A;
        z += '<div class="c-icon__links ' + a(((B = ((B = ((B = (E && E.meta)), B == null || B === false ? B : B.elClass)), B == null || B === false ? B : B.iconLinks)), typeof B === b ? B.apply(E) : B)) + '">';
        B = (C = o.moreAt || (E && E.moreAt), A = { hash: { className: ("c-icon__link") }, data: D }, C ? C.call(E, (E && E.meta), "none", A) : n.call(E, "moreAt", (E && E.meta), "none", A)); if (B || B === 0) { z += B } B = o["if"].call(E, ((B = ((B = (E && E.meta)), B == null || B === false ? B : B.options)), B == null || B === false ? B : B.moreText), { hash: {}, inverse: m.noop, fn: m.program(19, r, D), data: D }); if (B || B === 0) { z += B } z += "</div>"; return z }

    function r(E, D) { var z = "",
            B, C, A;
        z += '<span class="c-icon__link--more  sep--before">';
        B = (C = o.formatSubtitle || (E && E.formatSubtitle), A = { hash: {}, data: D }, C ? C.call(E, ((B = ((B = (E && E.meta)), B == null || B === false ? B : B.options)), B == null || B === false ? B : B.moreText), A) : n.call(E, "formatSubtitle", ((B = ((B = (E && E.meta)), B == null || B === false ? B : B.options)), B == null || B === false ? B : B.moreText), A)); if (B || B === 0) { z += B } z += "</span>"; return z } p += '<div class="cw ';
    f = o["if"].call(q, (q && q.infoboxData), { hash: {}, inverse: m.noop, fn: m.program(1, k, y), data: y }); if (f || f === 0) { p += f } p += '"><div class="zci__main  c-icon"><div class="zci__body"><div class="c-icon__head">';
    f = o["if"].call(q, (q && q.image), { hash: {}, inverse: m.noop, fn: m.program(3, j, y), data: y }); if (f || f === 0) { p += f } f = o["if"].call(q, (q && q.badge), { hash: {}, inverse: m.noop, fn: m.program(5, h, y), data: y }); if (f || f === 0) { p += f } p += '<div class="c-icon__body">';
    f = o["if"].call(q, (q && q.title), { hash: {}, inverse: m.noop, fn: m.program(7, g, y), data: y }); if (f || f === 0) { p += f } f = o["if"].call(q, (q && q.subtitle), { hash: {}, inverse: m.noop, fn: m.program(9, c, y), data: y }); if (f || f === 0) { p += f } f = o["if"].call(q, (q && q.altSubtitle), { hash: {}, inverse: m.noop, fn: m.program(11, x, y), data: y }); if (f || f === 0) { p += f } p += "</div></div>";
    f = o["if"].call(q, ((f = ((f = (q && q.meta)), f == null || f === false ? f : f.options)), f == null || f === false ? f : f.content), { hash: {}, inverse: m.program(15, u, y), fn: m.program(13, v, y), data: y }); if (f || f === 0) { p += f } f = o["if"].call(q, ((f = ((f = (q && q.meta)), f == null || f === false ? f : f.options)), f == null || f === false ? f : f.moreAt), { hash: {}, inverse: m.noop, fn: m.program(18, s, y), data: y }); if (f || f === 0) { p += f } p += "</div></div></div>"; return p });
this["DDG"]["templates"]["basic_info_detail"] = Handlebars.template(function(g, u, s, m, C) { this.compilerInfo = [4, ">= 1.0.0"];
    s = this.merge(s, g.helpers);
    C = C || {}; var t = "",
        j, a, e, q = this,
        c = "function",
        r = s.helperMissing,
        b = this.escapeExpression;

    function p(E, D) { return "has-aux" }

    function o(I, H) { var D = "",
            F, G, E;
        D += '<div class="c-info__img-wrap  c-info__img-wrap--';
        F = s["if"].call(I, (I && I.imageTile), { hash: {}, inverse: q.program(6, k, H), fn: q.program(4, n, H), data: H }); if (F || F === 0) { D += F } D += '"><a href="'; if (G = s.url) { F = G.call(I, { hash: {}, data: H }) } else { G = (I && I.url);
            F = typeof G === c ? G.call(I, { hash: {}, data: H }) : G } if (F || F === 0) { D += F } D += '" class="c-info__img-wrap__in"><img class="c-info__img  js-detail-img" src="';
        F = (G = s.imageProxy || (I && I.imageProxy), E = { hash: {}, data: H }, G ? G.call(I, (I && I.image), E) : r.call(I, "imageProxy", (I && I.image), E)); if (F || F === 0) { D += F } D += '" /></a></div>'; return D }

    function n(E, D) { return "tile" }

    function k(E, D) { return "clip" }

    function i(H, G) { var D = "",
            E, F;
        D += '<h1 class="c-info__title  ';
        E = s["if"].call(H, (H && H.subtitle), { hash: {}, inverse: q.noop, fn: q.program(9, f, G), data: G }); if (E || E === 0) { D += E } D += '"><a href="'; if (F = s.url) { E = F.call(H, { hash: {}, data: G }) } else { F = (H && H.url);
            E = typeof F === c ? F.call(H, { hash: {}, data: G }) : F } if (E || E === 0) { D += E } D += '">'; if (F = s.title) { E = F.call(H, { hash: {}, data: G }) } else { F = (H && H.title);
            E = typeof F === c ? F.call(H, { hash: {}, data: G }) : F } D += b(E) + "</a>";
        E = s["if"].call(H, (H && H.subtitle), { hash: {}, inverse: q.noop, fn: q.program(11, B, G), data: G }); if (E || E === 0) { D += E } D += "</h1>"; return D }

    function f(E, D) { return "has-sub" }

    function B(I, H) { var D = "",
            F, G, E;
        D += '<span class="c-info__title__sub">';
        F = (G = s.formatSubtitle || (I && I.formatSubtitle), E = { hash: {}, data: H }, G ? G.call(I, (I && I.subtitle), E) : r.call(I, "formatSubtitle", (I && I.subtitle), E)); if (F || F === 0) { D += F } D += "</span>"; return D }

    function A(I, H) { var D = "",
            F, G, E;
        D += '<div class="c-info__content ';
        F = s["if"].call(I, ((F = ((F = (I && I.meta)), F == null || F === false ? F : F.options)), F == null || F === false ? F : F.chompContent), { hash: {}, inverse: q.noop, fn: q.program(14, z, H), data: H }); if (F || F === 0) { D += F } D += '">';
        F = (G = s.include || (I && I.include), E = { hash: {}, data: H }, G ? G.call(I, ((F = ((F = (I && I.meta)), F == null || F === false ? F : F.options)), F == null || F === false ? F : F.content), E) : r.call(I, "include", ((F = ((F = (I && I.meta)), F == null || F === false ? F : F.options)), F == null || F === false ? F : F.content), E)); if (F || F === 0) { D += F } D += "</div>"; return D }

    function z(E, D) { return "chomp js-ellipsis" }

    function y(F, E) { var D;
        D = s["if"].call(F, (F && F.description), { hash: {}, inverse: q.noop, fn: q.program(17, x, E), data: E }); if (D || D === 0) { return D } else { return "" } }

    function x(H, G) { var D = "",
            E, F;
        D += '<div class="c-info__content chomp js-ellipsis">'; if (F = s.description) { E = F.call(H, { hash: {}, data: G }) } else { F = (H && H.description);
            E = typeof F === c ? F.call(H, { hash: {}, data: G }) : F } D += b(E) + "</div>"; return D }

    function v(H, G) { var E, F, D;
        E = (F = s.moreAt || (H && H.moreAt), D = { hash: { className: ("c-info__link"), sourceOnlyMobile: ("true") }, data: G }, F ? F.call(H, (H && H.meta), "none", D) : r.call(H, "moreAt", (H && H.meta), "none", D)); if (E || E === 0) { return E } else { return "" } }

    function h(I, H) { var D = "",
            F, G, E;
        D += '<span class="c-info__link--more  sep--before">';
        F = (G = s.formatSubtitle || (I && I.formatSubtitle), E = { hash: {}, data: H }, G ? G.call(I, ((F = ((F = (I && I.meta)), F == null || F === false ? F : F.options)), F == null || F === false ? F : F.moreText), E) : r.call(I, "formatSubtitle", ((F = ((F = (I && I.meta)), F == null || F === false ? F : F.options)), F == null || F === false ? F : F.moreText), E)); if (F || F === 0) { D += F } D += "</span>"; return D } t += '<div class="c-info--cw  cw ';
    j = s["if"].call(u, (u && u.infoboxData), { hash: {}, inverse: q.noop, fn: q.program(1, p, C), data: C }); if (j || j === 0) { t += j } t += '"><div class="zci__main  c-info"><div class="zci__body">';
    j = s["if"].call(u, (u && u.image), { hash: {}, inverse: q.noop, fn: q.program(3, o, C), data: C }); if (j || j === 0) { t += j } t += '<div class="c-info__body">';
    j = s["if"].call(u, (u && u.title), { hash: {}, inverse: q.noop, fn: q.program(8, i, C), data: C }); if (j || j === 0) { t += j } j = s["if"].call(u, ((j = ((j = (u && u.meta)), j == null || j === false ? j : j.options)), j == null || j === false ? j : j.content), { hash: {}, inverse: q.program(16, y, C), fn: q.program(13, A, C), data: C }); if (j || j === 0) { t += j } t += '<div class="c-info__links">';
    j = (a = s.include || (u && u.include), e = { hash: { className: ("c-info__link  c-info__link--chomp"), sep: (((j = ((j = (u && u.meta)), j == null || j === false ? j : j.options)), j == null || j === false ? j : j.moreAt)) }, data: C }, a ? a.call(u, "chomp_link", e) : r.call(u, "include", "chomp_link", e)); if (j || j === 0) { t += j } j = s["if"].call(u, ((j = ((j = (u && u.meta)), j == null || j === false ? j : j.options)), j == null || j === false ? j : j.moreAt), { hash: {}, inverse: q.noop, fn: q.program(19, v, C), data: C }); if (j || j === 0) { t += j } j = s["if"].call(u, ((j = ((j = (u && u.meta)), j == null || j === false ? j : j.options)), j == null || j === false ? j : j.moreText), { hash: {}, inverse: q.noop, fn: q.program(21, h, C), data: C }); if (j || j === 0) { t += j } t += "</div></div></div></div></div>"; return t });
this["DDG"]["templates"]["goodie_0_inputs"] = Handlebars.template(function(e, j, c, i, h) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    h = h || {}; var g = "",
        a, f = "function",
        k = this;

    function b(p, o) { var m = "",
            n;
        m += '<h4 class="zci__subheader"><span class="zci__operation">';
        n = ((n = ((n = (p && p.Answer)), n == null || n === false ? n : n.operation)), typeof n === f ? n.apply(p) : n); if (n || n === 0) { m += n } m += "</span></h4>"; return m } g += '<div class="cw"><div class="zci__main  zci__main--detail"><div class="zci__body"><h3 class="zci__caption  zci__result">';
    a = ((a = ((a = (j && j.Answer)), a == null || a === false ? a : a.result)), typeof a === f ? a.apply(j) : a); if (a || a === 0) { g += a } g += "</h3>";
    a = c["if"].call(j, ((a = (j && j.Answer)), a == null || a === false ? a : a.operation), { hash: {}, inverse: k.noop, fn: k.program(1, b, h), data: h }); if (a || a === 0) { g += a } g += "</div></div></div>"; return g });
this["DDG"]["templates"]["goodie_1_inputs"] = Handlebars.template(function(c, j, b, i, h) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    h = h || {}; var f = "",
        a, e = "function",
        g = this.escapeExpression;
    f += '<div class="cw"><div class="zci__main  zci__main--detail"><div class="zci__body"><h3 class="zci__caption  zci__result">';
    a = ((a = ((a = (j && j.Answer)), a == null || a === false ? a : a.result)), typeof a === e ? a.apply(j) : a); if (a || a === 0) { f += a } f += '</h3><h4 class="zci__subheader"><span class="zci__operation  tx-clr--lt2">';
    a = ((a = ((a = (j && j.Answer)), a == null || a === false ? a : a.operation)), typeof a === e ? a.apply(j) : a); if (a || a === 0) { f += a } f += ':</span> <span class="zci__input">' + g(((a = ((a = ((a = (j && j.Answer)), a == null || a === false ? a : a.input)), a == null || a === false ? a : a[0])), typeof a === e ? a.apply(j) : a)) + "</span></h4></div></div></div>"; return f });
this["DDG"]["templates"]["goodie_2_inputs"] = Handlebars.template(function(c, j, b, i, h) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    h = h || {}; var f = "",
        a, e = "function",
        g = this.escapeExpression;
    f += '<div class="cw"><div class="zci__main  zci__main--detail"><div class="zci__body"><h3 class="zci__caption  zci__result">';
    a = ((a = ((a = (j && j.Answer)), a == null || a === false ? a : a.result)), typeof a === e ? a.apply(j) : a); if (a || a === 0) { f += a } f += '</h3><h4 class="zci__subheader"><span class="zci__operation  tx-clr--lt2">';
    a = ((a = ((a = (j && j.Answer)), a == null || a === false ? a : a.operation)), typeof a === e ? a.apply(j) : a); if (a || a === 0) { f += a } f += '</span> <span class="zci__input">' + g(((a = ((a = ((a = (j && j.Answer)), a == null || a === false ? a : a.input)), a == null || a === false ? a : a[0])), typeof a === e ? a.apply(j) : a)) + '</span> <span class="tx-clr--lt2">&dash;</span> <span class="zci__input">' + g(((a = ((a = ((a = (j && j.Answer)), a == null || a === false ? a : a.input)), a == null || a === false ? a : a[1])), typeof a === e ? a.apply(j) : a)) + "</span></h4></div></div></div>"; return f });
this["DDG"]["templates"]["info_detail"] = Handlebars.template(function(f, s, q, j, x) { this.compilerInfo = [4, ">= 1.0.0"];
    q = this.merge(q, f.helpers);
    x = x || {}; var r = "",
        h, a, e, c = "function",
        b = this.escapeExpression,
        o = this,
        p = q.helperMissing;

    function n(z, y) { return "has-aux" }

    function m(C, B) { var y = "",
            z, A;
        y += '<div class="c-info__img-wrap  c-info__img-wrap--';
        z = q["if"].call(C, (C && C.imageTile), { hash: {}, inverse: o.program(6, i, B), fn: o.program(4, k, B), data: B }); if (z || z === 0) { y += z } y += '"><a href="'; if (A = q.AbstractURL) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.AbstractURL);
            z = typeof A === c ? A.call(C, { hash: {}, data: B }) : A } if (z || z === 0) { y += z } y += '" class="c-info__img-wrap__in"><img class="c-info__img  js-sized-img" src="'; if (A = q.Image) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.Image);
            z = typeof A === c ? A.call(C, { hash: {}, data: B }) : A } if (z || z === 0) { y += z } y += '" ';
        z = q["if"].call(C, (C && C.imageLoadingSize), { hash: {}, inverse: o.noop, fn: o.program(8, g, B), data: B }); if (z || z === 0) { y += z } y += " /></a></div>"; return y }

    function k(z, y) { return "tile" }

    function i(z, y) { return "clip" }

    function g(B, A) { var y = "",
            z;
        y += 'style="width:' + b(((z = ((z = (B && B.imageLoadingSize)), z == null || z === false ? z : z.width)), typeof z === c ? z.apply(B) : z)) + "px;height:" + b(((z = ((z = (B && B.imageLoadingSize)), z == null || z === false ? z : z.height)), typeof z === c ? z.apply(B) : z)) + 'px;" '; return y }

    function v(C, B) { var z, A, y;
        z = (A = q.formatTitle || (C && C.formatTitle), y = { hash: { el: ("h1"), className: ("c-info__title"), href: ((C && C.AbstractURL)), ellipsis: (100) }, data: B }, A ? A.call(C, (C && C.Heading), y) : p.call(C, "formatTitle", (C && C.Heading), y)); if (z || z === 0) { return z } else { return "" } }

    function u(C, B) { var z, A, y;
        z = (A = q.moreAt || (C && C.moreAt), y = { hash: { className: ("c-info__link"), sourceOnlyMobile: (true) }, data: B }, A ? A.call(C, (C && C.meta), (C && C.AbstractURL), y) : p.call(C, "moreAt", (C && C.meta), (C && C.AbstractURL), y)); if (z || z === 0) { return z } else { return "" } }

    function t(D, C) { var y = "",
            A, B, z;
        y += '<a class="c-info__link  c-info__link--url" href="'; if (B = q.FirstURL) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.FirstURL);
            A = typeof B === c ? B.call(D, { hash: {}, data: C }) : B } y += b(A) + '"><span class="sep  c-info__links__sep"></span>' + b((B = q.domain || (D && D.domain), z = { hash: {}, data: C }, B ? B.call(D, (D && D.FirstURL), z) : p.call(D, "domain", (D && D.FirstURL), z))) + "</a>"; return y } r += '<div class="c-info--cw  cw ';
    h = q["if"].call(s, (s && s.infoboxData), { hash: {}, inverse: o.noop, fn: o.program(1, n, x), data: x }); if (h || h === 0) { r += h } r += '"><div class="zci__main  c-info"><div class="zci__body">';
    h = q["if"].call(s, (s && s.Image), { hash: {}, inverse: o.noop, fn: o.program(3, m, x), data: x }); if (h || h === 0) { r += h } r += '<div class="c-info__body">';
    h = q["if"].call(s, (s && s.Heading), { hash: {}, inverse: o.noop, fn: o.program(10, v, x), data: x }); if (h || h === 0) { r += h } r += '<div class="c-info__content chomp js-ellipsis">'; if (a = q.Abstract) { h = a.call(s, { hash: {}, data: x }) } else { a = (s && s.Abstract);
        h = typeof a === c ? a.call(s, { hash: {}, data: x }) : a } if (h || h === 0) { r += h } r += '</div><div class="c-info__links">';
    h = (a = q.include || (s && s.include), e = { hash: { className: ("c-info__link  c-info__link--chomp"), sep: ((s && s.meta)) }, data: x }, a ? a.call(s, "chomp_link", e) : p.call(s, "include", "chomp_link", e)); if (h || h === 0) { r += h } h = q["if"].call(s, (s && s.meta), { hash: {}, inverse: o.noop, fn: o.program(12, u, x), data: x }); if (h || h === 0) { r += h } h = q.each.call(s, (s && s.Results), { hash: { to: ("0") }, inverse: o.noop, fn: o.program(14, t, x), data: x }); if (h || h === 0) { r += h } r += "</div></div></div></div></div>"; return r });
this["DDG"]["templates"]["list_detail"] = Handlebars.template(function(g, s, q, k, x) { this.compilerInfo = [4, ">= 1.0.0"];
    q = this.merge(q, g.helpers);
    x = x || {}; var r = "",
        h, a, e, c = "function",
        b = this.escapeExpression,
        p = q.helperMissing,
        o = this;

    function n(C, B) { var y = "",
            z, A;
        y += '<h3 class="c-list__title">'; if (A = q.title) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.title);
            z = typeof A === c ? A.call(C, { hash: {}, data: B }) : A } y += b(z) + "</h3>"; return y }

    function m(D, C) { var y = "",
            A, B, z;
        y += '<p class="c-list__sub">';
        A = (B = q.formatSubtitle || (D && D.formatSubtitle), z = { hash: {}, data: C }, B ? B.call(D, (D && D.subtitle), z) : p.call(D, "formatSubtitle", (D && D.subtitle), z)); if (A || A === 0) { y += A } y += "</p>"; return y }

    function j(C, B) { var z, A, y;
        z = (A = q.include || (C && C.include), y = { hash: {}, data: B }, A ? A.call(C, ((z = ((z = (C && C.meta)), z == null || z === false ? z : z.options)), z == null || z === false ? z : z.subtitle_content), y) : p.call(C, "include", ((z = ((z = (C && C.meta)), z == null || z === false ? z : z.options)), z == null || z === false ? z : z.subtitle_content), y)); if (z || z === 0) { return z } else { return "" } }

    function i(D, C) { var y = "",
            A, B, z;
        y += '<div class="c-list__content  chomp  js-chomp">';
        A = (B = q.include || (D && D.include), z = { hash: {}, data: C }, B ? B.call(D, ((A = ((A = (D && D.meta)), A == null || A === false ? A : A.options)), A == null || A === false ? A : A.content), z) : p.call(D, "include", ((A = ((A = (D && D.meta)), A == null || A === false ? A : A.options)), A == null || A === false ? A : A.content), z)); if (A || A === 0) { y += A } y += "</div>"; return y }

    function f(B, A) { var y = "",
            z;
        y += '<div class="c-list__content  chomp  js-chomp"><ul class="c-list__items">';
        z = q.each.call(B, (B && B.list), { hash: {}, inverse: o.noop, fn: o.programWithDepth(10, v, A, B), data: A }); if (z || z === 0) { y += z } y += "</ul></div>"; return y }

    function v(E, C, D) { var y = "",
            A, B, z;
        y += '<li class="c-list__item">';
        A = (B = q.include || (D && D.include), z = { hash: {}, data: C }, B ? B.call(E, ((A = ((A = (D && D.meta)), A == null || A === false ? A : A.options)), A == null || A === false ? A : A.list_content), z) : p.call(E, "include", ((A = ((A = (D && D.meta)), A == null || A === false ? A : A.options)), A == null || A === false ? A : A.list_content), z)); if (A || A === 0) { y += A } y += "</li>"; return y }

    function u(C, B) { var z, A, y;
        z = (A = q.moreAt || (C && C.moreAt), y = { hash: { className: ("c-list__link") }, data: B }, A ? A.call(C, (C && C.meta), "none", y) : p.call(C, "moreAt", (C && C.meta), "none", y)); if (z || z === 0) { return z } else { return "" } }

    function t(D, C) { var y = "",
            A, B, z;
        y += '<span class="c-list__link--more  sep--before">';
        A = (B = q.formatSubtitle || (D && D.formatSubtitle), z = { hash: {}, data: C }, B ? B.call(D, ((A = ((A = (D && D.meta)), A == null || A === false ? A : A.options)), A == null || A === false ? A : A.moreText), z) : p.call(D, "formatSubtitle", ((A = ((A = (D && D.meta)), A == null || A === false ? A : A.options)), A == null || A === false ? A : A.moreText), z)); if (A || A === 0) { y += A } y += "</span>"; return y } r += '<div class="cw"><div class="zci__main  c-list"><div class="zci__body">';
    h = q["if"].call(s, (s && s.title), { hash: {}, inverse: o.noop, fn: o.program(1, n, x), data: x }); if (h || h === 0) { r += h } h = q["if"].call(s, (s && s.subtitle), { hash: {}, inverse: o.noop, fn: o.program(3, m, x), data: x }); if (h || h === 0) { r += h } h = q["if"].call(s, ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.subtitle_content), { hash: {}, inverse: o.noop, fn: o.program(5, j, x), data: x }); if (h || h === 0) { r += h } h = q["if"].call(s, ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.content), { hash: {}, inverse: o.noop, fn: o.program(7, i, x), data: x }); if (h || h === 0) { r += h } h = q["if"].call(s, ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.list_content), { hash: {}, inverse: o.noop, fn: o.program(9, f, x), data: x }); if (h || h === 0) { r += h } r += '<div class="c-list__links">';
    h = (a = q.include || (s && s.include), e = { hash: { className: ("c-list__link"), sep: (((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.moreAt)) }, data: x }, a ? a.call(s, "chomp_link", e) : p.call(s, "include", "chomp_link", e)); if (h || h === 0) { r += h } h = q["if"].call(s, ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.moreAt), { hash: {}, inverse: o.noop, fn: o.program(12, u, x), data: x }); if (h || h === 0) { r += h } h = q["if"].call(s, ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.moreText), { hash: {}, inverse: o.noop, fn: o.program(14, t, x), data: x }); if (h || h === 0) { r += h } r += "</div></div></div></div>"; return r });
this["DDG"]["templates"]["lyrics_detail"] = Handlebars.template(function(f, m, e, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    i = i || {}; var h = "",
        b, g, o, k = e.helperMissing,
        n = this;

    function c(q, p) { return "has-aux" }

    function a(t, s) { var q, r, p;
        q = (r = e.include || (t && t.include), p = { hash: {}, data: s }, r ? r.call(t, "infobox", p) : k.call(t, "include", "infobox", p)); if (q || q === 0) { return q } else { return "" } } h += '<div class="c-info--cw  cw ';
    b = e["if"].call(m, ((b = (m && m.data)), b == null || b === false ? b : b[1]), { hash: {}, inverse: n.noop, fn: n.program(1, c, i), data: i }); if (b || b === 0) { h += b } h += '"><div class="zci__main  c-info"><div class="zci__body  c-info__body">';
    b = (g = e.lyricsTitle || (m && m.lyricsTitle), o = { hash: {}, data: i }, g ? g.call(m, (m && m.title), (m && m.url), o) : k.call(m, "lyricsTitle", (m && m.title), (m && m.url), o)); if (b || b === 0) { h += b } h += '<div class="c-info__content  chomp js-ellipsis">';
    b = (g = e.lyricsAbstract || (m && m.lyricsAbstract), o = { hash: {}, data: i }, g ? g.call(m, (m && m["abstract"]), o) : k.call(m, "lyricsAbstract", (m && m["abstract"]), o)); if (b || b === 0) { h += b } h += '</div><div class="c-info__links">';
    b = (g = e.include || (m && m.include), o = { hash: { className: ("c-info__link  c-info__link--chomp  sep--after") }, data: i }, g ? g.call(m, "chomp_link", o) : k.call(m, "include", "chomp_link", o)); if (b || b === 0) { h += b } b = (g = e.moreAt || (m && m.moreAt), o = { hash: { className: ("c-info__link") }, data: i }, g ? g.call(m, (m && m.url), (m && m.source), o) : k.call(m, "moreAt", (m && m.url), (m && m.source), o)); if (b || b === 0) { h += b } h += "</div></div></div></div>";
    b = e["if"].call(m, ((b = ((b = (m && m.data)), b == null || b === false ? b : b[1])), b == null || b === false ? b : b.urlTitle), { hash: {}, inverse: n.noop, fn: n.program(3, a, i), data: i }); if (b || b === 0) { h += b } return h });
this["DDG"]["templates"]["nlp_detail"] = Handlebars.template(function(c, k, b, i, h) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    h = h || {}; var g = "",
        a, e, m, j = b.helperMissing,
        f = "function";
    g += '<div class="c-info  c-info--body">';
    a = (e = b.formatTitle || (k && k.formatTitle), m = { hash: { el: ("h1"), className: ("c-info__title"), classNameSec: ("c-info__title--long"), href: ((k && k.url)) }, data: h }, e ? e.call(k, (k && k.heading), m) : j.call(k, "formatTitle", (k && k.heading), m)); if (a || a === 0) { g += a } g += '<div class="c-info__content chomp js-ellipsis">'; if (e = b["abstract"]) { a = e.call(k, { hash: {}, data: h }) } else { e = (k && k["abstract"]);
        a = typeof e === f ? e.call(k, { hash: {}, data: h }) : e } if (a || a === 0) { g += a } g += '</div><div class="c-info__links">';
    a = (e = b.include || (k && k.include), m = { hash: { className: ("c-info__link  c-info__link--chomp  sep--after") }, data: h }, e ? e.call(k, "chomp_link", m) : j.call(k, "include", "chomp_link", m)); if (a || a === 0) { g += a } a = (e = b.moreAt || (k && k.moreAt), m = { hash: { className: ("c-info__link"), sourceOnlyMobile: ("true"), attributionAfter: ("true") }, data: h }, e ? e.call(k, (k && k.meta), (k && k.url), m) : j.call(k, "moreAt", (k && k.meta), (k && k.url), m)); if (a || a === 0) { g += a } g += "</div></div>"; return g });
this["DDG"]["templates"]["places_detail"] = Handlebars.template(function(I, a, H, r, P) { this.compilerInfo = [4, ">= 1.0.0"];
    H = this.merge(H, I.helpers);
    P = P || {}; var n = "",
        s, j, o, G = H.helperMissing,
        M = this.escapeExpression,
        m = "function",
        f = this,
        v = H.blockHelperMissing;

    function F(V, U) { var Q = "",
            S, T, R;
        Q += '<div class="tile__media__wrapper"><img src="' + M((T = H.imageProxy || (V && V.imageProxy), R = { hash: {}, data: U }, T ? T.call(V, (V && V.image), R) : G.call(V, "imageProxy", (V && V.image), R))) + '" alt="'; if (T = H.title) { S = T.call(V, { hash: {}, data: U }) } else { T = (V && V.title);
            S = typeof T === m ? T.call(V, { hash: {}, data: U }) : T } Q += M(S) + '" class="tile__media__img" /></div>'; return Q }

    function E(R, Q) { return '<span class="ddgsi tile__media__no-img">@</span>' }

    function D(V, U) { var Q = "",
            S, T, R;
        Q += '<div class="tile__more-wrap">';
        S = (T = H.moreAt || (V && V.moreAt), R = { hash: { className: ("tile__more-link"), iconClassName: ("tile__favicon"), dynamicMoreAtText: (5) }, data: U }, T ? T.call(V, (V && V.url), ((S = (V && V.meta)), S == null || S === false ? S : S.sourceName), R) : G.call(V, "moreAt", (V && V.url), ((S = (V && V.meta)), S == null || S === false ? S : S.sourceName), R)); if (S || S === 0) { Q += S } Q += "</div>"; return Q }

    function A(R, Q) { return "has-hours js-tile-map-with-hours" }

    function u(U, T) { var R, S, Q;
        R = (S = H.include || (U && U.include), Q = { hash: {}, data: T }, S ? S.call(U, ((R = ((R = (U && U.meta)), R == null || R === false ? R : R.options)), R == null || R === false ? R : R.detail_rating), Q) : G.call(U, "include", ((R = ((R = (U && U.meta)), R == null || R === false ? R : R.options)), R == null || R === false ? R : R.detail_rating), Q)); if (R || R === 0) { return R } else { return "" } }

    function z(T, S) { var Q = "",
            R;
        R = H["if"].call(T, (T && T.rating), { hash: {}, inverse: f.noop, fn: f.program(12, x, S), data: S }); if (R || R === 0) { Q += R } R = H["if"].call(T, (T && T.reviews), { hash: {}, inverse: f.noop, fn: f.program(14, t, S), data: S }); if (R || R === 0) { Q += R } return Q }

    function x(U, T) { var R, S, Q;
        R = (S = H.starRating || (U && U.starRating), Q = { hash: {}, data: T }, S ? S.call(U, (U && U.rating), Q) : G.call(U, "starRating", (U && U.rating), Q)); if (R || R === 0) { return R } else { return "" } }

    function t(U, T) { var R, S, Q;
        R = (S = H.reviewCount || (U && U.reviewCount), Q = { hash: {}, data: T }, S ? S.call(U, (U && U.reviews), (U && U.url), Q) : G.call(U, "reviewCount", (U && U.reviews), (U && U.url), Q)); if (R || R === 0) { return R } else { return "" } }

    function q(R, Q) { return '<span class="sep"></span>' }

    function p(V, U) { var Q = "",
            S, T, R;
        Q += '<span class="tile__price">';
        S = (T = H.priceSymbols || (V && V.priceSymbols), R = { hash: {}, data: U }, T ? T.call(V, (V && V.price), 4, R) : G.call(V, "priceSymbols", (V && V.price), 4, R)); if (S || S === 0) { Q += S } Q += "</span>"; return Q }

    function k(T, S) { var Q = "",
            R;
        Q += '<p class="tile__sub">';
        R = H.each.call(T, (T && T.address_lines), { hash: {}, inverse: f.noop, fn: f.program(21, i, S), data: S }); if (R || R === 0) { Q += R } Q += "</p>"; return Q }

    function i(S, R) { var Q = "";
        Q += M((typeof S === m ? S.apply(S) : S)) + "<br />"; return Q }

    function h(S, R) { var Q;
        Q = H["if"].call(S, (S && S.address), { hash: {}, inverse: f.noop, fn: f.program(24, g, R), data: R }); if (Q || Q === 0) { return Q } else { return "" } }

    function g(U, T) { var Q = "",
            R, S;
        Q += '<p class="tile__sub">'; if (S = H.address) { R = S.call(U, { hash: {}, data: T }) } else { S = (U && U.address);
            R = typeof S === m ? S.call(U, { hash: {}, data: T }) : S } Q += M(R) + "</p>"; return Q }

    function e(U, T) { var Q = "",
            R, S;
        Q += '<a class="tile__phone" href="tel:'; if (S = H.phone) { R = S.call(U, { hash: {}, data: T }) } else { S = (U && U.phone);
            R = typeof S === m ? S.call(U, { hash: {}, data: T }) : S } Q += M(R) + '">'; if (S = H.phone) { R = S.call(U, { hash: {}, data: T }) } else { S = (U && U.phone);
            R = typeof S === m ? S.call(U, { hash: {}, data: T }) : S } Q += M(R) + "</a>"; return Q }

    function c(V, U) { var Q = "",
            S, T, R;
        Q += '<div class="tile__hours-today"><span class="tile__hours-today__label">';
        S = (T = H.l || (V && V.l), R = { hash: {}, data: U }, T ? T.call(V, "Today", R) : G.call(V, "l", "Today", R)); if (S || S === 0) { Q += S } Q += ':</span><a href="#" class="tile__hours-today__hours js-map-hours-expand ';
        S = H["if"].call(V, (V && V.hoursToday), { hash: {}, inverse: f.program(29, b, U), fn: f.noop, data: U }); if (S || S === 0) { Q += S } Q += '">';
        S = H["if"].call(V, (V && V.hoursToday), { hash: {}, inverse: f.program(33, N, U), fn: f.program(31, O, U), data: U }); if (S || S === 0) { Q += S } Q += "</a></div>"; return Q }

    function b(R, Q) { return "hours-closed" }

    function O(T, S) { var Q, R; if (R = H.hoursToday) { Q = R.call(T, { hash: {}, data: S }) } else { R = (T && T.hoursToday);
            Q = typeof R === m ? R.call(T, { hash: {}, data: S }) : R } return M(Q) }

    function N(U, T) { var R, S, Q;
        R = (S = H.l || (U && U.l), Q = { hash: {}, data: T }, S ? S.call(U, "Closed", Q) : G.call(U, "l", "Closed", Q)); if (R || R === 0) { return R } else { return "" } }

    function L(R, Q) { return "tile__actions--small" }

    function K(V, U) { var Q = "",
            S, T, R;
        Q += '<a class="tile__actions__btn tile__call btn js-tel-link" href="tel:'; if (T = H.phone) { S = T.call(V, { hash: {}, data: U }) } else { T = (V && V.phone);
            S = typeof T === m ? T.call(V, { hash: {}, data: U }) : T } Q += M(S) + '">';
        S = (T = H.lp || (V && V.lp), R = { hash: {}, data: U }, T ? T.call(V, "maps_places", "Call", R) : G.call(V, "lp", "maps_places", "Call", R)); if (S || S === 0) { Q += S } Q += "</a>"; return Q }

    function J(V, U) { var Q = "",
            S, T, R;
        Q += '<div class="tile__directions js-directions-container"><a class="tile__actions__btn btn js-directions-link" href="'; if (T = H.directions) { S = T.call(V, { hash: {}, data: U }) } else { T = (V && V.directions);
            S = typeof T === m ? T.call(V, { hash: {}, data: U }) : T } Q += M(S) + '">';
        S = (T = H.lp || (V && V.lp), R = { hash: {}, data: U }, T ? T.call(V, "maps_places", "Directions", R) : G.call(V, "lp", "maps_places", "Directions", R)); if (S || S === 0) { Q += S } Q += "</a></div>"; return Q }

    function C(V, U) { var Q = "",
            S, T, R;
        Q += '<div class="tile__hours-full"><span class="tile__hours__close  ddgsi  js-map-hours-close">X</span><table class="tile__hours-full__table">';
        R = { hash: {}, inverse: f.noop, fn: f.program(42, B, U), data: U }; if (T = H.hours) { S = T.call(V, R) } else { T = (V && V.hours);
            S = typeof T === m ? T.call(V, R) : T } if (!H.hours) { S = v.call(V, S, { hash: {}, inverse: f.noop, fn: f.program(42, B, U), data: U }) } if (S || S === 0) { Q += S } Q += "</table></div>"; return Q }

    function B(U, T) { var Q = "",
            R, S;
        Q += "<tr ";
        R = H["if"].call(U, (U && U.isToday), { hash: {}, inverse: f.noop, fn: f.program(43, y, T), data: T }); if (R || R === 0) { Q += R } Q += '><td class="tile__hours-full__day">'; if (S = H.day) { R = S.call(U, { hash: {}, data: T }) } else { S = (U && U.day);
            R = typeof S === m ? S.call(U, { hash: {}, data: T }) : S } Q += M(R) + ':</td><td class="tile__hours-full__hours">'; if (S = H.hours) { R = S.call(U, { hash: {}, data: T }) } else { S = (U && U.hours);
            R = typeof S === m ? S.call(U, { hash: {}, data: T }) : S } Q += M(R) + "</td></tr>"; return Q }

    function y(R, Q) { return 'class="tile__hours-full__current"' } n += '<div class="zci__main  zci__main--single-loc"><div class="tile--map  js-tile-map"><div class="tile__body"><div class="tile--map__side"><a class="tile__media" href="'; if (j = H.url) { s = j.call(a, { hash: {}, data: P }) } else { j = (a && a.url);
        s = typeof j === m ? j.call(a, { hash: {}, data: P }) : j } if (s || s === 0) { n += s } n += '">';
    s = H["if"].call(a, (a && a.image), { hash: {}, inverse: f.program(3, E, P), fn: f.program(1, F, P), data: P }); if (s || s === 0) { n += s } n += "</a>";
    s = (j = H.and || (a && a.and), o = { hash: {}, inverse: f.noop, fn: f.program(5, D, P), data: P }, j ? j.call(a, ((s = (a && a.meta)), s == null || s === false ? s : s.sourceName), (a && a.url), o) : G.call(a, "and", ((s = (a && a.meta)), s == null || s === false ? s : s.sourceName), (a && a.url), o)); if (s || s === 0) { n += s } n += '</div><h4 class="tile__title"><a href="'; if (j = H.url) { s = j.call(a, { hash: {}, data: P }) } else { j = (a && a.url);
        s = typeof j === m ? j.call(a, { hash: {}, data: P }) : j } if (s || s === 0) { n += s } n += '">'; if (j = H.name) { s = j.call(a, { hash: {}, data: P }) } else { j = (a && a.name);
        s = typeof j === m ? j.call(a, { hash: {}, data: P }) : j } n += M(s) + '</a></h4><div class="tile--map__main ';
    s = H["if"].call(a, (a && a.hours), { hash: {}, inverse: f.noop, fn: f.program(7, A, P), data: P }); if (s || s === 0) { n += s } n += '"><div class="tile--map__main__not-hours"><div class="tile__rating-and-price"><div class="tile__rating">';
    s = H["if"].call(a, ((s = ((s = (a && a.meta)), s == null || s === false ? s : s.options)), s == null || s === false ? s : s.detail_rating), { hash: {}, inverse: f.program(11, z, P), fn: f.program(9, u, P), data: P }); if (s || s === 0) { n += s } n += "</div>";
    s = (j = H.and || (a && a.and), o = { hash: {}, inverse: f.noop, fn: f.program(16, q, P), data: P }, j ? j.call(a, (a && a.rating), (a && a.price), o) : G.call(a, "and", (a && a.rating), (a && a.price), o)); if (s || s === 0) { n += s } s = H["if"].call(a, (a && a.price), { hash: {}, inverse: f.noop, fn: f.program(18, p, P), data: P }); if (s || s === 0) { n += s } n += "</div>";
    s = H["if"].call(a, (a && a.address_lines), { hash: {}, inverse: f.program(23, h, P), fn: f.program(20, k, P), data: P }); if (s || s === 0) { n += s } s = H["if"].call(a, (a && a.phone), { hash: {}, inverse: f.noop, fn: f.program(26, e, P), data: P }); if (s || s === 0) { n += s } s = H["if"].call(a, (a && a.hours), { hash: {}, inverse: f.noop, fn: f.program(28, c, P), data: P }); if (s || s === 0) { n += s } n += '<div class="tile__actions ';
    s = H["if"].call(a, (a && a.compressActions), { hash: {}, inverse: f.noop, fn: f.program(35, L, P), data: P }); if (s || s === 0) { n += s } n += '">';
    s = H["if"].call(a, (a && a.canMakePhoneCalls), { hash: {}, inverse: f.noop, fn: f.program(37, K, P), data: P }); if (s || s === 0) { n += s } s = H["if"].call(a, (a && a.showDirections), { hash: {}, inverse: f.noop, fn: f.program(39, J, P), data: P }); if (s || s === 0) { n += s } n += "</div></div>";
    s = H["if"].call(a, (a && a.hours), { hash: {}, inverse: f.noop, fn: f.program(41, C, P), data: P }); if (s || s === 0) { n += s } n += "</div></div></div>"; return n });
this["DDG"]["templates"]["products_detail"] = Handlebars.template(function(g, t, r, m, A) { this.compilerInfo = [4, ">= 1.0.0"];
    r = this.merge(r, g.helpers);
    A = A || {}; var s = "",
        h, a, e, c = "function",
        b = this.escapeExpression,
        q = r.helperMissing,
        p = this;

    function o(G, F) { var B = "",
            D, E, C;
        B += '<div class="c-product__media ' + b(((D = ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.elClass)), D == null || D === false ? D : D.productMedia)), typeof D === c ? D.apply(G) : D)) + '"><img class="c-product__media__img ' + b(((D = ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.elClass)), D == null || D === false ? D : D.productMediaImg)), typeof D === c ? D.apply(G) : D)) + '" src="' + b((E = r.imageProxy || (G && G.imageProxy), C = { hash: {}, data: F }, E ? E.call(G, (G && G.img), C) : q.call(G, "imageProxy", (G && G.img), C))) + '" /></div>'; return B }

    function n(F, E) { var C, D, B;
        C = (D = r.include || (F && F.include), B = { hash: {}, data: E }, D ? D.call(F, ((C = ((C = (F && F.meta)), C == null || C === false ? C : C.options)), C == null || C === false ? C : C.subtitle_content), B) : q.call(F, "include", ((C = ((C = (F && F.meta)), C == null || C === false ? C : C.options)), C == null || C === false ? C : C.subtitle_content), B)); if (C || C === 0) { return C } else { return "" } }

    function k(G, F) { var B = "",
            D, E, C; if (E = r.subtitle) { D = E.call(G, { hash: {}, data: F }) } else { E = (G && G.subtitle);
            D = typeof E === c ? E.call(G, { hash: {}, data: F }) : E } B += b(D);
        D = r["if"].call(G, ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.rating), { hash: {}, inverse: p.noop, fn: p.program(6, j, F), data: F }); if (D || D === 0) { B += D } D = (E = r.and || (G && G.and), C = { hash: {}, inverse: p.noop, fn: p.program(9, f, F), data: F }, E ? E.call(G, ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.price), ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.rating), (G && G.price), C) : q.call(G, "and", ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.price), ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.rating), (G && G.price), C)); if (D || D === 0) { B += D } D = (E = r.and || (G && G.and), C = { hash: {}, inverse: p.noop, fn: p.program(11, z, F), data: F }, E ? E.call(G, ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.price), (G && G.price), C) : q.call(G, "and", ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.price), (G && G.price), C)); if (D || D === 0) { B += D } D = (E = r.and || (G && G.and), C = { hash: {}, inverse: p.noop, fn: p.program(9, f, F), data: F }, E ? E.call(G, ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.price), ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.brand), (G && G.price), (G && G.brand), C) : q.call(G, "and", ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.price), ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.brand), (G && G.price), (G && G.brand), C)); if (D || D === 0) { B += D } D = (E = r.and || (G && G.and), C = { hash: {}, inverse: p.noop, fn: p.program(9, f, F), data: F }, E ? E.call(G, ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.rating), ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.brand), (G && G.brand), C) : q.call(G, "and", ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.rating), ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.brand), (G && G.brand), C)); if (D || D === 0) { B += D } D = (E = r.and || (G && G.and), C = { hash: {}, inverse: p.noop, fn: p.program(13, y, F), data: F }, E ? E.call(G, ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.brand), (G && G.brand), C) : q.call(G, "and", ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.brand), (G && G.brand), C)); if (D || D === 0) { B += D } return B }

    function j(G, F) { var B = "",
            D, E, C;
        B += '<span class="c-product__rating ';
        D = r["if"].call(G, (G && G.subtitle), { hash: {}, inverse: p.noop, fn: p.program(7, i, F), data: F }); if (D || D === 0) { B += D } B += '">';
        D = (E = r.starsAndReviews || (G && G.starsAndReviews), C = { hash: {}, data: F }, E ? E.call(G, (G && G.rating), (G && G.reviewCount), (G && G.url), ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.hideReviewText), C) : q.call(G, "starsAndReviews", (G && G.rating), (G && G.reviewCount), (G && G.url), ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.hideReviewText), C)); if (D || D === 0) { B += D } B += "</span>"; return B }

    function i(C, B) { return "sep--before" }

    function f(C, B) { return '<span class="sep  c-product__sep"></span>' }

    function z(F, E) { var B = "",
            C, D;
        B += '<span class="c-product__price  price  tx-clr--dk2">'; if (D = r.price) { C = D.call(F, { hash: {}, data: E }) } else { D = (F && F.price);
            C = typeof D === c ? D.call(F, { hash: {}, data: E }) : D } B += b(C) + "</span>"; return B }

    function y(G, F) { var B = "",
            D, E, C;
        B += '<span class="c-product__brand">';
        D = (E = r.lp || (G && G.lp), C = { hash: {}, data: F }, E ? E.call(G, "made_by", "by %s", (G && G.brand), C) : q.call(G, "lp", "made_by", "by %s", (G && G.brand), C)); if (D || D === 0) { B += D } B += "</span>"; return B }

    function x(F, E) { var C, D, B;
        C = (D = r.include || (F && F.include), B = { hash: {}, data: E }, D ? D.call(F, ((C = ((C = (F && F.meta)), C == null || C === false ? C : C.options)), C == null || C === false ? C : C.description_content), B) : q.call(F, "include", ((C = ((C = (F && F.meta)), C == null || C === false ? C : C.options)), C == null || C === false ? C : C.description_content), B)); if (C || C === 0) { return C } else { return "" } }

    function v(F, E) { var C, D, B;
        C = (D = r.ellipsis || (F && F.ellipsis), B = { hash: {}, data: E }, D ? D.call(F, (F && F["abstract"]), 400, B) : q.call(F, "ellipsis", (F && F["abstract"]), 400, B)); if (C || C === 0) { return C } else { return "" } }

    function u(G, F) { var B = "",
            D, E, C;
        B += '<div class="c-product__callout ' + b(((D = ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.elClass)), D == null || D === false ? D : D.productCallout)), typeof D === c ? D.apply(G) : D)) + '">';
        D = (E = r.include || (G && G.include), C = { hash: {}, data: F }, E ? E.call(G, ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.buy), C) : q.call(G, "include", ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.buy), C)); if (D || D === 0) { B += D } B += "</div>"; return B } s += '<div class="c-product"><div class="c-product__pane">';
    h = r["if"].call(t, (t && t.img), { hash: {}, inverse: p.noop, fn: p.program(1, o, A), data: A }); if (h || h === 0) { s += h } s += '<div class="c-product__body-wrap"><div class="c-product__body-content"><div class="c-product__body  c-product__body--pri  r-border-box">';
    h = (a = r.formatTitle || (t && t.formatTitle), e = { hash: { el: ("h5"), className: ("c-product__title"), classNameSec: (((h = ((h = (t && t.meta)), h == null || h === false ? h : h.elClass)), h == null || h === false ? h : h.productTitle)), noSub: ("true"), ellipsis: (120), href: ((t && t.url)) }, data: A }, a ? a.call(t, (t && t.heading), e) : q.call(t, "formatTitle", (t && t.heading), e)); if (h || h === 0) { s += h } s += '<p class="c-product__subtitle  ' + b(((h = ((h = ((h = (t && t.meta)), h == null || h === false ? h : h.elClass)), h == null || h === false ? h : h.productSub)), typeof h === c ? h.apply(t) : h)) + '">';
    h = r["if"].call(t, ((h = ((h = (t && t.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.subtitle_content), { hash: {}, inverse: p.program(5, k, A), fn: p.program(3, n, A), data: A }); if (h || h === 0) { s += h } s += '</p></div><div class="c-product__body  c-product__body--sec"><div class="c-product__desc ' + b(((h = ((h = ((h = (t && t.meta)), h == null || h === false ? h : h.elClass)), h == null || h === false ? h : h.productDesc)), typeof h === c ? h.apply(t) : h)) + '">';
    h = r["if"].call(t, ((h = ((h = (t && t.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.description_content), { hash: {}, inverse: p.program(17, v, A), fn: p.program(15, x, A), data: A }); if (h || h === 0) { s += h } s += "</div>";
    h = r["if"].call(t, ((h = ((h = (t && t.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.buy), { hash: {}, inverse: p.noop, fn: p.program(19, u, A), data: A }); if (h || h === 0) { s += h } s += "</div></div></div></div></div>"; return s });
this["DDG"]["templates"]["spice_detail"] = Handlebars.template(function(c, j, b, h, g) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    g = g || {}; var f = "",
        a, e, k, i = b.helperMissing;
    f += '<div class="cw"><div class="zci__main  zci__main--detail"> <div class="zci__body">';
    a = (e = b.include || (j && j.include), k = { hash: {}, data: g }, e ? e.call(j, (j && j.content), k) : i.call(j, "include", (j && j.content), k)); if (a || a === 0) { f += a } a = (e = b.moreAt || (j && j.moreAt), k = { hash: { className: ("zci__more-at") }, data: g }, e ? e.call(j, (j && j.source_url), (j && j.source_name), k) : i.call(j, "moreAt", (j && j.source_url), (j && j.source_name), k)); if (a || a === 0) { f += a } f += "</div></div></div>"; return f });
this["DDG"]["templates"]["text_detail"] = Handlebars.template(function(f, t, r, m, A) { this.compilerInfo = [4, ">= 1.0.0"];
    r = this.merge(r, f.helpers);
    A = A || {}; var s = "",
        h, q = r.helperMissing,
        a = this.escapeExpression,
        b = "function",
        p = this;

    function o(D, C) { return "has-aux" }

    function n(G, F) { var C = "",
            E, D;
        C += '<div class="c-base__img-wrap"><img class="c-base__img" src="' + a((E = r.imageProxy || (G && G.imageProxy), D = { hash: {}, data: F }, E ? E.call(G, (G && G.image), D) : q.call(G, "imageProxy", (G && G.image), D))) + '"></div>'; return C }

    function k(G, F) { var D, E, C;
        D = (E = r.include || (G && G.include), C = { hash: {}, data: F }, E ? E.call(G, ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.title_content), C) : q.call(G, "include", ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.title_content), C)); if (D || D === 0) { return D } else { return "" } }

    function j(E, D) { var C;
        C = r["if"].call(E, (E && E.title), { hash: {}, inverse: p.noop, fn: p.program(8, g, D), data: D }); if (C || C === 0) { return C } else { return "" } }

    function g(G, F) { var C = "",
            D, E;
        C += '<h3 class="c-base__title">'; if (E = r.title) { D = E.call(G, { hash: {}, data: F }) } else { E = (G && G.title);
            D = typeof E === b ? E.call(G, { hash: {}, data: F }) : E } C += a(D) + "</h3>"; return C }

    function B(G, F) { var D, E, C;
        D = (E = r.include || (G && G.include), C = { hash: {}, data: F }, E ? E.call(G, ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.subtitle_content), C) : q.call(G, "include", ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.subtitle_content), C)); if (D || D === 0) { return D } else { return "" } }

    function z(H, G) { var C = "",
            E, F, D;
        C += '<h4 class="c-base__sub">';
        E = (F = r.formatSubtitle || (H && H.formatSubtitle), D = { hash: {}, data: G }, F ? F.call(H, (H && H.subtitle), D) : q.call(H, "formatSubtitle", (H && H.subtitle), D)); if (E || E === 0) { C += E } C += "</h4>"; return C }

    function y(H, G) { var C = "",
            E, F, D;
        C += '<div class="c-base__content ';
        E = r["if"].call(H, ((E = ((E = (H && H.meta)), E == null || E === false ? E : E.options)), E == null || E === false ? E : E.chompContent), { hash: {}, inverse: p.noop, fn: p.program(15, x, G), data: G }); if (E || E === 0) { C += E } C += '">';
        E = (F = r.include || (H && H.include), D = { hash: {}, data: G }, F ? F.call(H, ((E = ((E = (H && H.meta)), E == null || E === false ? E : E.options)), E == null || E === false ? E : E.content), D) : q.call(H, "include", ((E = ((E = (H && H.meta)), E == null || E === false ? E : E.options)), E == null || E === false ? E : E.content), D)); if (E || E === 0) { C += E } C += "</div>"; return C }

    function x(D, C) { return "chomp js-ellipsis" }

    function v(E, D) { var C;
        C = r["if"].call(E, (E && E.description), { hash: {}, inverse: p.noop, fn: p.program(18, u, D), data: D }); if (C || C === 0) { return C } else { return "" } }

    function u(G, F) { var C = "",
            D, E;
        C += '<div class="c-base__content ';
        D = r["if"].call(G, ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.chompContent), { hash: {}, inverse: p.noop, fn: p.program(15, x, F), data: F }); if (D || D === 0) { C += D } C += '">'; if (E = r.description) { D = E.call(G, { hash: {}, data: F }) } else { E = (G && G.description);
            D = typeof E === b ? E.call(G, { hash: {}, data: F }) : E } C += a(D) + "</div>"; return C }

    function i(G, F) { var D, E, C;
        D = (E = r.include || (G && G.include), C = { hash: { className: ("c-base__link"), sep: (((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.moreAt)) }, data: F }, E ? E.call(G, "chomp_link", C) : q.call(G, "include", "chomp_link", C)); if (D || D === 0) { return D } else { return "" } }

    function e(G, F) { var D, E, C;
        D = (E = r.moreAt || (G && G.moreAt), C = { hash: { className: ("c-base__link") }, data: F }, E ? E.call(G, (G && G.meta), "none", C) : q.call(G, "moreAt", (G && G.meta), "none", C)); if (D || D === 0) { return D } else { return "" } }

    function c(H, G) { var C = "",
            E, F, D;
        C += '<span class="c-base__link--more  sep--before">';
        E = (F = r.formatSubtitle || (H && H.formatSubtitle), D = { hash: {}, data: G }, F ? F.call(H, ((E = ((E = (H && H.meta)), E == null || E === false ? E : E.options)), E == null || E === false ? E : E.moreText), D) : q.call(H, "formatSubtitle", ((E = ((E = (H && H.meta)), E == null || E === false ? E : E.options)), E == null || E === false ? E : E.moreText), D)); if (E || E === 0) { C += E } C += "</span>"; return C } s += '<div class="cw ';
    h = r["if"].call(t, (t && t.infoboxData), { hash: {}, inverse: p.noop, fn: p.program(1, o, A), data: A }); if (h || h === 0) { s += h } s += '"><div class="zci__main  c-base"><div class="zci__body">';
    h = r["if"].call(t, (t && t.image), { hash: {}, inverse: p.noop, fn: p.program(3, n, A), data: A }); if (h || h === 0) { s += h } h = r["if"].call(t, ((h = ((h = (t && t.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.title_content), { hash: {}, inverse: p.program(7, j, A), fn: p.program(5, k, A), data: A }); if (h || h === 0) { s += h } h = r["if"].call(t, ((h = ((h = (t && t.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.subtitle_content), { hash: {}, inverse: p.noop, fn: p.program(10, B, A), data: A }); if (h || h === 0) { s += h } h = r["if"].call(t, (t && t.subtitle), { hash: {}, inverse: p.noop, fn: p.program(12, z, A), data: A }); if (h || h === 0) { s += h } h = r["if"].call(t, ((h = ((h = (t && t.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.content), { hash: {}, inverse: p.program(17, v, A), fn: p.program(14, y, A), data: A }); if (h || h === 0) { s += h } s += '<div class="c-base__links">';
    h = r["if"].call(t, ((h = ((h = (t && t.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.chompContent), { hash: {}, inverse: p.noop, fn: p.program(20, i, A), data: A }); if (h || h === 0) { s += h } h = r["if"].call(t, ((h = ((h = (t && t.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.moreAt), { hash: {}, inverse: p.noop, fn: p.program(22, e, A), data: A }); if (h || h === 0) { s += h } h = r["if"].call(t, ((h = ((h = (t && t.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.moreText), { hash: {}, inverse: p.noop, fn: p.program(24, c, A), data: A }); if (h || h === 0) { s += h } s += "</div></div></div>"; return s });
this["DDG"]["templates"]["audio_item"] = Handlebars.template(function(g, s, q, k, t) { this.compilerInfo = [4, ">= 1.0.0"];
    q = this.merge(q, g.helpers);
    t = t || {}; var r = "",
        h, a, e, c = "function",
        b = this.escapeExpression,
        p = q.helperMissing,
        o = this;

    function n(y, x) { var u, v; if (v = q.elClass) { u = v.call(y, { hash: {}, data: x }) } else { v = (y && y.elClass);
            u = typeof v === c ? v.call(y, { hash: {}, data: x }) : v } return b(u) }

    function m(x, v) { var u; return b(((u = ((u = ((u = (x && x.meta)), u == null || u === false ? u : u.elClass)), u == null || u === false ? u : u.tile)), typeof u === c ? u.apply(x) : u)) }

    function j(A, z) { var u = "",
            x, y, v;
        u += '<img class="tile__media__img js-lazyload" src="" data-src="';
        x = (y = q.imageProxy || (A && A.imageProxy), v = { hash: {}, data: z }, y ? y.call(A, (A && A.image), v) : p.call(A, "imageProxy", (A && A.image), v)); if (x || x === 0) { u += x } u += '" />'; return u }

    function i(v, u) { return '<div class="tile__media__no-artwork ddgsi">♫</div>' }

    function f(A, z) { var u = "",
            x, y, v;
        u += '<div class="tile__footer">';
        x = (y = q.include || (A && A.include), v = { hash: {}, data: z }, y ? y.call(A, ((x = ((x = (A && A.meta)), x == null || x === false ? x : x.options)), x == null || x === false ? x : x.footer), v) : p.call(A, "include", ((x = ((x = (A && A.meta)), x == null || x === false ? x : x.options)), x == null || x === false ? x : x.footer), v)); if (x || x === 0) { u += x } u += "</div>"; return u } r += '<div class="tile  tile--c--n  tile--audio  tile--no-highlight ';
    h = q["if"].call(s, (s && s.elClass), { hash: {}, inverse: o.program(3, m, t), fn: o.program(1, n, t), data: t }); if (h || h === 0) { r += h } r += '"><div class="tile__media">';
    h = q["if"].call(s, (s && s.image), { hash: {}, inverse: o.program(7, i, t), fn: o.program(5, j, t), data: t }); if (h || h === 0) { r += h } r += '<div class="audio-controls"><div class="audio-controls__progress"><div class="audio-controls__progress-bg  full100"><span class="rotated-fill"></span><span class="full-fill"></span></div><div class="audio-controls__progress-loading"><span class="rotated-fill"></span><span class="full-fill"></span></div><div class="audio-controls__progress-playback"><span class="rotated-fill"></span><span class="full-fill"></span></div></div><span class="audio-controls__action  ddgsi">►</span><span class="audio-controls__time"></span></div></div><div class="tile__body"><h4 class="tile__title"><a href="'; if (a = q.url) { h = a.call(s, { hash: {}, data: t }) } else { a = (s && s.url);
        h = typeof a === c ? a.call(s, { hash: {}, data: t }) : a } r += b(h) + '" title="'; if (a = q.title) { h = a.call(s, { hash: {}, data: t }) } else { a = (s && s.title);
        h = typeof a === c ? a.call(s, { hash: {}, data: t }) : a } r += b(h) + '">' + b((a = q.ellipsis || (s && s.ellipsis), e = { hash: {}, data: t }, a ? a.call(s, (s && s.title), 45, e) : p.call(s, "ellipsis", (s && s.title), 45, e))) + "</a></h4>";
    h = q["if"].call(s, ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.footer), { hash: {}, inverse: o.noop, fn: o.program(9, f, t), data: t }); if (h || h === 0) { r += h } r += "</div></div>"; return r });
this["DDG"]["templates"]["base_expanding_item"] = Handlebars.template(function(f, o, e, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    k = k || {}; var i = "",
        b, g, r, h = "function",
        j = this.escapeExpression,
        q = this,
        n = e.helperMissing;

    function c(v, u) { var s, t; if (t = e.elClass) { s = t.call(v, { hash: {}, data: u }) } else { t = (v && v.elClass);
            s = typeof t === h ? t.call(v, { hash: {}, data: u }) : t } return j(s) }

    function a(u, t) { var s; return j(((s = ((s = ((s = (u && u.meta)), s == null || s === false ? s : s.elClass)), s == null || s === false ? s : s.tile)), typeof s === h ? s.apply(u) : s)) }

    function p(v, u) { var s = "",
            t;
        s += '<span class="tile__expand-icon  ddgsi  ' + j(((t = ((t = ((t = (v && v.meta)), t == null || t === false ? t : t.elClass)), t == null || t === false ? t : t.tileExpand)), typeof t === h ? t.apply(v) : t)) + '"></span>'; return s } i += '<div class="tile  tile--e  tile--' + j(((b = ((b = (o && o.meta)), b == null || b === false ? b : b.id)), typeof b === h ? b.apply(o) : b)) + "  tile--no-highlight  tile--c--whole  ";
    b = e["if"].call(o, (o && o.elClass), { hash: {}, inverse: q.program(3, a, k), fn: q.program(1, c, k), data: k }); if (b || b === 0) { i += b } i += '">';
    b = (g = e.include || (o && o.include), r = { hash: {}, data: k }, g ? g.call(o, ((b = ((b = (o && o.meta)), b == null || b === false ? b : b.options)), b == null || b === false ? b : b.content), r) : n.call(o, "include", ((b = ((b = (o && o.meta)), b == null || b === false ? b : b.options)), b == null || b === false ? b : b.content), r)); if (b || b === 0) { i += b } b = e["if"].call(o, (o && o.canExpand), { hash: {}, inverse: q.noop, fn: q.program(5, p, k), data: k }); if (b || b === 0) { i += b } i += "</div>"; return i });
this["DDG"]["templates"]["base_flipping_item"] = Handlebars.template(function(f, o, e, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    k = k || {}; var i = "",
        b, g, q, h = "function",
        j = this.escapeExpression,
        p = this,
        n = e.helperMissing;

    function c(u, t) { var r, s; if (s = e.elClass) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.elClass);
            r = typeof s === h ? s.call(u, { hash: {}, data: t }) : s } return j(r) }

    function a(t, s) { var r; return j(((r = ((r = ((r = (t && t.meta)), r == null || r === false ? r : r.elClass)), r == null || r === false ? r : r.tile)), typeof r === h ? r.apply(t) : r)) } i += '<div class="tile  tile--f  tile--' + j(((b = ((b = (o && o.meta)), b == null || b === false ? b : b.id)), typeof b === h ? b.apply(o) : b)) + "  ";
    b = e["if"].call(o, (o && o.elClass), { hash: {}, inverse: p.program(3, a, k), fn: p.program(1, c, k), data: k }); if (b || b === 0) { i += b } i += '"><div class="tile--f__main ' + j(((b = ((b = ((b = (o && o.meta)), b == null || b === false ? b : b.elClass)), b == null || b === false ? b : b.tileFront)), typeof b === h ? b.apply(o) : b)) + '">';
    b = (g = e.include || (o && o.include), q = { hash: {}, data: k }, g ? g.call(o, ((b = ((b = (o && o.meta)), b == null || b === false ? b : b.options)), b == null || b === false ? b : b.front_content), q) : n.call(o, "include", ((b = ((b = (o && o.meta)), b == null || b === false ? b : b.options)), b == null || b === false ? b : b.front_content), q)); if (b || b === 0) { i += b } i += '</div><div class="tile--f__alt ' + j(((b = ((b = ((b = (o && o.meta)), b == null || b === false ? b : b.elClass)), b == null || b === false ? b : b.tileBack)), typeof b === h ? b.apply(o) : b)) + '">';
    b = (g = e.include || (o && o.include), q = { hash: {}, data: k }, g ? g.call(o, ((b = ((b = (o && o.meta)), b == null || b === false ? b : b.options)), b == null || b === false ? b : b.back_content), q) : n.call(o, "include", ((b = ((b = (o && o.meta)), b == null || b === false ? b : b.options)), b == null || b === false ? b : b.back_content), q)); if (b || b === 0) { i += b } i += "</div></div>"; return i });
this["DDG"]["templates"]["base_item"] = Handlebars.template(function(c, q, o, h, s) { this.compilerInfo = [4, ">= 1.0.0"];
    o = this.merge(o, c.helpers);
    s = s || {}; var p = "",
        f, b = "function",
        a = this.escapeExpression,
        m = this,
        n = o.helperMissing;

    function k(y, x) { var u, v; if (v = o.elClass) { u = v.call(y, { hash: {}, data: x }) } else { v = (y && y.elClass);
            u = typeof v === b ? v.call(y, { hash: {}, data: x }) : v } return a(u) }

    function j(x, v) { var u;
        u = o["if"].call(x, ((u = ((u = (x && x.meta)), u == null || u === false ? u : u.elClass)), u == null || u === false ? u : u.tile), { hash: {}, inverse: m.program(6, g, v), fn: m.program(4, i, v), data: v }); if (u || u === 0) { return u } else { return "" } }

    function i(x, v) { var u; return a(((u = ((u = ((u = (x && x.meta)), u == null || u === false ? u : u.elClass)), u == null || u === false ? u : u.tile)), typeof u === b ? u.apply(x) : u)) }

    function g(v, u) { return "tile--c" }

    function e(z, y) { var u = "",
            v, x;
        u += 'data-link="'; if (x = o.url) { v = x.call(z, { hash: {}, data: y }) } else { x = (z && z.url);
            v = typeof x === b ? x.call(z, { hash: {}, data: y }) : x } u += a(v) + '"'; return u }

    function t(z, y) { var v, x, u;
        v = (x = o.include || (z && z.include), u = { hash: {}, data: y }, x ? x.call(z, ((v = ((v = (z && z.meta)), v == null || v === false ? v : v.options)), v == null || v === false ? v : v.tile_content), u) : n.call(z, "include", ((v = ((v = (z && z.meta)), v == null || v === false ? v : v.options)), v == null || v === false ? v : v.tile_content), u)); if (v || v === 0) { return v } else { return "" } }

    function r(z, y) { var v, x, u;
        v = (x = o.include || (z && z.include), u = { hash: {}, data: y }, x ? x.call(z, ((v = ((v = (z && z.meta)), v == null || v === false ? v : v.options)), v == null || v === false ? v : v.content), u) : n.call(z, "include", ((v = ((v = (z && z.meta)), v == null || v === false ? v : v.options)), v == null || v === false ? v : v.content), u)); if (v || v === 0) { return v } else { return "" } } p += '<div class="tile  tile--b ';
    f = o["if"].call(q, (q && q.elClass), { hash: {}, inverse: m.program(3, j, s), fn: m.program(1, k, s), data: s }); if (f || f === 0) { p += f } p += " tile--" + a(((f = ((f = (q && q.meta)), f == null || f === false ? f : f.id)), typeof f === b ? f.apply(q) : f)) + '" ';
    f = o["if"].call(q, (q && q.url), { hash: {}, inverse: m.noop, fn: m.program(8, e, s), data: s }); if (f || f === 0) { p += f } p += '>  <div class="tile__body">';
    f = o["if"].call(q, ((f = ((f = (q && q.meta)), f == null || f === false ? f : f.options)), f == null || f === false ? f : f.tile_content), { hash: {}, inverse: m.program(12, r, s), fn: m.program(10, t, s), data: s }); if (f || f === 0) { p += f } p += "</div></div>"; return p });
this["DDG"]["templates"]["basic_flipping_item"] = Handlebars.template(function(f, n, e, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    j = j || {}; var h = "",
        b, g = "function",
        i = this.escapeExpression,
        m = e.helperMissing,
        p = this;

    function c(t, s) { var q, r; if (r = e.elClass) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.elClass);
            q = typeof r === g ? r.call(t, { hash: {}, data: s }) : r } return i(q) }

    function a(s, r) { var q; return i(((q = ((q = ((q = (s && s.meta)), q == null || q === false ? q : q.elClass)), q == null || q === false ? q : q.tile)), typeof q === g ? q.apply(s) : q)) }

    function o(v, t, u) { var r, s, q;
        r = (s = e.include || (u && u.include), q = { hash: { meta: ((u && u.meta)), num: ((u && u.num)) }, data: t }, s ? s.call(v, "tile_body", q) : m.call(v, "include", "tile_body", q)); if (r || r === 0) { return r } else { return "" } } h += '<div class="tile  tile--f  tile--' + i(((b = ((b = (n && n.meta)), b == null || b === false ? b : b.id)), typeof b === g ? b.apply(n) : b)) + "  ";
    b = e["if"].call(n, (n && n.elClass), { hash: {}, inverse: p.program(3, a, j), fn: p.program(1, c, j), data: j }); if (b || b === 0) { h += b } h += '"><div class="tile--f__main ' + i(((b = ((b = ((b = (n && n.meta)), b == null || b === false ? b : b.elClass)), b == null || b === false ? b : b.tileFront)), typeof b === g ? b.apply(n) : b)) + '">';
    b = e["with"].call(n, (n && n.data_front), { hash: {}, inverse: p.noop, fn: p.programWithDepth(5, o, j, n), data: j }); if (b || b === 0) { h += b } h += '</div><div class="tile--f__alt ' + i(((b = ((b = ((b = (n && n.meta)), b == null || b === false ? b : b.elClass)), b == null || b === false ? b : b.tileBack)), typeof b === g ? b.apply(n) : b)) + '">';
    b = e["with"].call(n, (n && n.data_back), { hash: {}, inverse: p.noop, fn: p.programWithDepth(5, o, j, n), data: j }); if (b || b === 0) { h += b } h += "</div></div>"; return h });
this["DDG"]["templates"]["basic_image_item"] = Handlebars.template(function(i, x, u, o, D) { this.compilerInfo = [4, ">= 1.0.0"];
    u = this.merge(u, i.helpers);
    D = D || {}; var v = "",
        k, a, f, c = "function",
        b = this.escapeExpression,
        s = this,
        t = u.helperMissing;

    function r(H, G) { var E, F; if (F = u.elClass) { E = F.call(H, { hash: {}, data: G }) } else { F = (H && H.elClass);
            E = typeof F === c ? F.call(H, { hash: {}, data: G }) : F } return b(E) }

    function q(G, F) { var E;
        E = u["if"].call(G, ((E = ((E = (G && G.meta)), E == null || E === false ? E : E.elClass)), E == null || E === false ? E : E.tile), { hash: {}, inverse: s.program(6, n, F), fn: s.program(4, p, F), data: F }); if (E || E === 0) { return E } else { return "" } }

    function p(G, F) { var E; return b(((E = ((E = ((E = (G && G.meta)), E == null || E === false ? E : E.elClass)), E == null || E === false ? E : E.tile)), typeof E === c ? E.apply(G) : E)) }

    function n(F, E) { return "tile--c" }

    function j(I, H) { var E = "",
            F, G;
        E += ' data-link="'; if (G = u.url) { F = G.call(I, { hash: {}, data: H }) } else { G = (I && I.url);
            F = typeof G === c ? G.call(I, { hash: {}, data: H }) : G } E += b(F) + '"'; return E }

    function C(F, E) { return "tile__title--1 with-sub" }

    function B(F, E) { return "tile__sub--2" }

    function A(I, H) { var E = "",
            F, G;
        E += '<a href="'; if (G = u.url) { F = G.call(I, { hash: {}, data: H }) } else { G = (I && I.url);
            F = typeof G === c ? G.call(I, { hash: {}, data: H }) : G } E += b(F) + '">'; return E }

    function z(F, E) { return "</a>" }

    function y(I, H) { var E = "",
            G, F;
        E += '<p class="tile__sub--2  opt">' + b((G = u.ellipsis || (I && I.ellipsis), F = { hash: {}, data: H }, G ? G.call(I, (I && I.description), 56, F) : t.call(I, "ellipsis", (I && I.description), 56, F))) + "</p>"; return E }

    function m(G, F) { var E; return b(((E = ((E = ((E = (G && G.meta)), E == null || E === false ? E : E.elClass)), E == null || E === false ? E : E.tileRating)), typeof E === c ? E.apply(G) : E)) }

    function h(F, E) { return "tile__rating--right" }

    function g(I, H) { var F, G, E;
        F = (G = u.starRating || (I && I.starRating), E = { hash: {}, data: H }, G ? G.call(I, (I && I.rating), E) : t.call(I, "starRating", (I && I.rating), E)); if (F || F === 0) { return F } else { return "" } }

    function e(I, H) { var E = "",
            G, F;
        E += '<span class="tile__source  one-line">' + b((G = u.ellipsis || (I && I.ellipsis), F = { hash: {}, data: H }, G ? G.call(I, (I && I.ratingText), 19, F) : t.call(I, "ellipsis", (I && I.ratingText), 19, F))) + "</span>"; return E } v += '<div class="tile  tile--b--i ';
    k = u["if"].call(x, (x && x.elClass), { hash: {}, inverse: s.program(3, q, D), fn: s.program(1, r, D), data: D }); if (k || k === 0) { v += k } v += " has-detail  tile--" + b(((k = ((k = (x && x.meta)), k == null || k === false ? k : k.id)), typeof k === c ? k.apply(x) : k)) + '  opt--t-xxs" ';
    k = u["if"].call(x, (x && x.url), { hash: {}, inverse: s.noop, fn: s.program(8, j, D), data: D }); if (k || k === 0) { v += k } v += '><div class="tile__media ' + b(((k = ((k = ((k = (x && x.meta)), k == null || k === false ? k : k.elClass)), k == null || k === false ? k : k.tileMedia)), typeof k === c ? k.apply(x) : k)) + '"><img src="' + b((a = u.imageProxy || (x && x.imageProxy), f = { hash: {}, data: D }, a ? a.call(x, (x && x.image), f) : t.call(x, "imageProxy", (x && x.image), f))) + '" alt="'; if (a = u.title) { k = a.call(x, { hash: {}, data: D }) } else { a = (x && x.title);
        k = typeof a === c ? a.call(x, { hash: {}, data: D }) : a } v += b(k) + '" class="tile__media__img ' + b(((k = ((k = ((k = (x && x.meta)), k == null || k === false ? k : k.elClass)), k == null || k === false ? k : k.tileMediaImg)), typeof k === c ? k.apply(x) : k)) + '" /></div><div class="tile__body  tile__body--b-i ' + b(((k = ((k = ((k = (x && x.meta)), k == null || k === false ? k : k.elClass)), k == null || k === false ? k : k.tileBody)), typeof k === c ? k.apply(x) : k)) + '"><h6 class="tile__title ';
    k = u["if"].call(x, (x && x.description), { hash: {}, inverse: s.program(12, B, D), fn: s.program(10, C, D), data: D }); if (k || k === 0) { v += k } v += '">';
    k = u["if"].call(x, (x && x.url), { hash: {}, inverse: s.noop, fn: s.program(14, A, D), data: D }); if (k || k === 0) { v += k } v += b((a = u.ellipsis || (x && x.ellipsis), f = { hash: {}, data: D }, a ? a.call(x, (x && x.title), 55, f) : t.call(x, "ellipsis", (x && x.title), 55, f)));
    k = u["if"].call(x, (x && x.url), { hash: {}, inverse: s.noop, fn: s.program(16, z, D), data: D }); if (k || k === 0) { v += k } v += "</h6>";
    k = u["if"].call(x, (x && x.description), { hash: {}, inverse: s.noop, fn: s.program(18, y, D), data: D }); if (k || k === 0) { v += k } v += '<div class="tile__tx  tile__rating  one-line ';
    k = u["if"].call(x, ((k = ((k = (x && x.meta)), k == null || k === false ? k : k.elClass)), k == null || k === false ? k : k.tileRating), { hash: {}, inverse: s.program(22, h, D), fn: s.program(20, m, D), data: D }); if (k || k === 0) { v += k } v += '">';
    k = u["if"].call(x, ((k = ((k = (x && x.meta)), k == null || k === false ? k : k.options)), k == null || k === false ? k : k.rating), { hash: {}, inverse: s.noop, fn: s.program(24, g, D), data: D }); if (k || k === 0) { v += k } k = u["if"].call(x, ((k = ((k = (x && x.meta)), k == null || k === false ? k : k.options)), k == null || k === false ? k : k.ratingText), { hash: {}, inverse: s.noop, fn: s.program(26, e, D), data: D }); if (k || k === 0) { v += k } v += "</div></div></div>"; return v });
this["DDG"]["templates"]["categories_item"] = Handlebars.template(function(e, n, c, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    j = j || {}; var h = "",
        a, f, p, g = "function",
        i = this.escapeExpression,
        m = c.helperMissing,
        o = this;

    function b(t, s) { var q = "",
            r;
        q += '<img class="tile__icon" src="' + i(((r = ((r = (t && t.Icon)), r == null || r === false ? r : r.URL)), typeof r === g ? r.apply(t) : r)) + '" />'; return q } h += '<div class="tile  tile--c  js-tile--' + i((f = c.firstLetter || (n && n.firstLetter), p = { hash: {}, data: j }, f ? f.call(n, (n && n.Text), p) : m.call(n, "firstLetter", (n && n.Text), p))) + '" data-link="'; if (f = c.FirstURL) { a = f.call(n, { hash: {}, data: j }) } else { f = (n && n.FirstURL);
        a = typeof f === g ? f.call(n, { hash: {}, data: j }) : f } h += i(a) + '"><div class="tile__body">';
    a = c["if"].call(n, ((a = (n && n.Icon)), a == null || a === false ? a : a.URL), { hash: {}, inverse: o.noop, fn: o.program(1, b, j), data: j }); if (a || a === 0) { h += a } a = (f = c.formatTitle || (n && n.formatTitle), p = { hash: { el: ("h4"), className: ("tile__title"), href: ("FirstURL"), parseFirst: ("true"), ellipsis: (100) }, data: j }, f ? f.call(n, (n && n.Result), p) : m.call(n, "formatTitle", (n && n.Result), p)); if (a || a === 0) { h += a } h += '<div class="tile__content  tile__content--sm">';
    a = (f = c.ellipsis || (n && n.ellipsis), p = { hash: { parseFirst: ("true") }, data: j }, f ? f.call(n, (n && n.Result), 95, p) : m.call(n, "ellipsis", (n && n.Result), 95, p)); if (a || a === 0) { h += a } h += "</div> </div></div>"; return h });
this["DDG"]["templates"]["images_item"] = Handlebars.template(function(e, k, c, i, h) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    h = h || {}; var a, f = "function",
        g = this.escapeExpression,
        j = c.helperMissing,
        m = this;

    function b(s, r) { var n = "",
            p, q, o;
        n += '<div class="tile  tile--img  has-detail" style="width:'; if (q = c.tileWidth) { p = q.call(s, { hash: {}, data: r }) } else { q = (s && s.tileWidth);
            p = typeof q === f ? q.call(s, { hash: {}, data: r }) : q } n += g(p) + 'px;"><div class="tile--img__media"><span class="tile--img__media__i"><img class="tile--img__img  js-lazyload" src="" data-src="' + g((q = c.imageProxy || (s && s.imageProxy), o = { hash: {}, data: r }, q ? q.call(s, (s && s.thumbnail), o) : j.call(s, "imageProxy", (s && s.thumbnail), o))) + '" alt="'; if (q = c.title) { p = q.call(s, { hash: {}, data: r }) } else { q = (s && s.title);
            p = typeof q === f ? q.call(s, { hash: {}, data: r }) : q } n += g(p) + '" /></span></div><div class="tile--img__details"><div class="tile--img__dimensions"><i class="tile--img__icon">+</i><em>'; if (q = c.width) { p = q.call(s, { hash: {}, data: r }) } else { q = (s && s.width);
            p = typeof q === f ? q.call(s, { hash: {}, data: r }) : q } n += g(p) + " &times; "; if (q = c.height) { p = q.call(s, { hash: {}, data: r }) } else { q = (s && s.height);
            p = typeof q === f ? q.call(s, { hash: {}, data: r }) : q } n += g(p) + "</em></div></div></div>"; return n } a = c.unless.call(k, (k && k.n), { hash: {}, inverse: m.noop, fn: m.program(1, b, h), data: h }); if (a || a === 0) { return a } else { return "" } });
this["DDG"]["templates"]["meanings_item"] = Handlebars.template(function(f, s, q, k, t) { this.compilerInfo = [4, ">= 1.0.0"];
    q = this.merge(q, f.helpers);
    t = t || {}; var r = "",
        h, a, e, p = q.helperMissing,
        b = this.escapeExpression,
        c = "function",
        o = this;

    function n(A, z) { var u = "",
            x, y, v;
        u += "js-tile--" + b((y = q.trim || (A && A.trim), v = { hash: {}, data: z }, y ? y.call(A, ((x = (A && A.topic)), x == null || x === false ? x : x.id), v) : p.call(A, "trim", ((x = (A && A.topic)), x == null || x === false ? x : x.id), v))); return u }

    function m(A, z) { var u = "",
            x, y, v;
        u += 'data-anchor="' + b((y = q.stripNonAlpha || (A && A.stripNonAlpha), v = { hash: {}, data: z }, y ? y.call(A, ((x = (A && A.topic)), x == null || x === false ? x : x.id), v) : p.call(A, "stripNonAlpha", ((x = (A && A.topic)), x == null || x === false ? x : x.id), v))) + '"'; return u }

    function j(y, x) { var u = "",
            v;
        u += '<img class="tile__icon  js-lazyload" src="" data-src="' + b(((v = ((v = (y && y.Icon)), v == null || v === false ? v : v.URL)), typeof v === c ? v.apply(y) : v)) + '" />'; return u }

    function i(y, x) { var u = "",
            v;
        u += '<span class="media__img--rev" ';
        v = q["if"].call(y, (y && y.topic), { hash: {}, inverse: o.noop, fn: o.program(8, g, x), data: x }); if (v || v === 0) { u += v } u += "></span>"; return u }

    function g(A, z) { var u = "",
            x, y, v;
        u += 'data-type="' + b((y = q.stripNonAlpha || (A && A.stripNonAlpha), v = { hash: {}, data: z }, y ? y.call(A, ((x = (A && A.topic)), x == null || x === false ? x : x.id), v) : p.call(A, "stripNonAlpha", ((x = (A && A.topic)), x == null || x === false ? x : x.id), v))) + '"'; return u } r += '<div class="tile  tile--c  ';
    h = q["if"].call(s, (s && s.topic), { hash: {}, inverse: o.noop, fn: o.program(1, n, t), data: t }); if (h || h === 0) { r += h } r += '" ';
    h = q["if"].call(s, (s && s.topic), { hash: {}, inverse: o.noop, fn: o.program(3, m, t), data: t }); if (h || h === 0) { r += h } r += ' data-link="'; if (a = q.FirstURL) { h = a.call(s, { hash: {}, data: t }) } else { a = (s && s.FirstURL);
        h = typeof a === c ? a.call(s, { hash: {}, data: t }) : a } r += b(h) + '"><div class="tile__body">';
    h = q["if"].call(s, ((h = (s && s.Icon)), h == null || h === false ? h : h.URL), { hash: {}, inverse: o.program(7, i, t), fn: o.program(5, j, t), data: t }); if (h || h === 0) { r += h } h = (a = q.formatTitle || (s && s.formatTitle), e = { hash: { el: ("h4"), className: ("tile__title"), href: ("FirstURL"), parseFirst: ("true"), ellipsis: (100) }, data: t }, a ? a.call(s, (s && s.Result), e) : p.call(s, "formatTitle", (s && s.Result), e)); if (h || h === 0) { r += h } r += '<div class="tile__content  tile__content--sm">';
    h = (a = q.ellipsis || (s && s.ellipsis), e = { hash: { parseFirst: ("true") }, data: t }, a ? a.call(s, (s && s.Result), 95, e) : p.call(s, "ellipsis", (s && s.Result), 95, e)); if (h || h === 0) { r += h } r += "</div> </div></div>"; return r });
this["DDG"]["templates"]["media_item"] = Handlebars.template(function(f, s, q, j, y) { this.compilerInfo = [4, ">= 1.0.0"];
    q = this.merge(q, f.helpers);
    y = y || {}; var r = "",
        h, a, e, c = "function",
        b = this.escapeExpression,
        o = this,
        p = q.helperMissing;

    function n(C, B) { var z, A; if (A = q.elClass) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.elClass);
            z = typeof A === c ? A.call(C, { hash: {}, data: B }) : A } return b(z) }

    function m(B, A) { var z;
        z = q["if"].call(B, ((z = ((z = (B && B.meta)), z == null || z === false ? z : z.elClass)), z == null || z === false ? z : z.tile), { hash: {}, inverse: o.program(6, i, A), fn: o.program(4, k, A), data: A }); if (z || z === 0) { return z } else { return "" } }

    function k(B, A) { var z; return b(((z = ((z = ((z = (B && B.meta)), z == null || z === false ? z : z.elClass)), z == null || z === false ? z : z.tile)), typeof z === c ? z.apply(B) : z)) }

    function i(A, z) { return "tile--c" }

    function g(D, C) { var z = "",
            A, B;
        z += 'data-link="'; if (B = q.url) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.url);
            A = typeof B === c ? B.call(D, { hash: {}, data: C }) : B } z += b(A) + '"'; return z }

    function x(A, z) { return "has-foot" }

    function v(D, C) { var A, B, z;
        A = (B = q.include || (D && D.include), z = { hash: {}, data: C }, B ? B.call(D, "tile_snippet", z) : p.call(D, "include", "tile_snippet", z)); if (A || A === 0) { return A } else { return "" } }

    function u(E, D) { var z = "",
            B, C, A;
        z += '<div class="tile__foot ' + b(((B = ((B = ((B = (E && E.meta)), B == null || B === false ? B : B.elClass)), B == null || B === false ? B : B.tileFoot)), typeof B === c ? B.apply(E) : B)) + '">';
        B = (C = q.include || (E && E.include), A = { hash: {}, data: D }, C ? C.call(E, ((B = ((B = (E && E.meta)), B == null || B === false ? B : B.options)), B == null || B === false ? B : B.footer), A) : p.call(E, "include", ((B = ((B = (E && E.meta)), B == null || B === false ? B : B.options)), B == null || B === false ? B : B.footer), A)); if (B || B === 0) { z += B } z += "</div>"; return z }

    function t(D, C) { var A, B, z;
        A = (B = q.include || (D && D.include), z = { hash: {}, data: C }, B ? B.call(D, "date_badge", z) : p.call(D, "include", "date_badge", z)); if (A || A === 0) { return A } else { return "" } } r += '<div class="tile ';
    h = q["if"].call(s, (s && s.elClass), { hash: {}, inverse: o.program(3, m, y), fn: o.program(1, n, y), data: y }); if (h || h === 0) { r += h } r += " tile--" + b(((h = ((h = (s && s.meta)), h == null || h === false ? h : h.id)), typeof h === c ? h.apply(s) : h)) + '" ';
    h = q["if"].call(s, (s && s.url), { hash: {}, inverse: o.noop, fn: o.program(8, g, y), data: y }); if (h || h === 0) { r += h } r += '><div class="tile__media ' + b(((h = ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.elClass)), h == null || h === false ? h : h.tileMedia)), typeof h === c ? h.apply(s) : h)) + '"><img src="' + b((a = q.imageProxy || (s && s.imageProxy), e = { hash: {}, data: y }, a ? a.call(s, (s && s.image), e) : p.call(s, "imageProxy", (s && s.image), e))) + '" alt="'; if (a = q.title) { h = a.call(s, { hash: {}, data: y }) } else { a = (s && s.title);
        h = typeof a === c ? a.call(s, { hash: {}, data: y }) : a } r += b(h) + '" class="tile__media__img" /></div><div class="tile__body ';
    h = q["if"].call(s, ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.footer), { hash: {}, inverse: o.noop, fn: o.program(10, x, y), data: y }); if (h || h === 0) { r += h } r += " " + b(((h = ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.elClass)), h == null || h === false ? h : h.tileBody)), typeof h === c ? h.apply(s) : h)) + '">';
    h = (a = q.include || (s && s.include), e = { hash: {}, data: y }, a ? a.call(s, "tile_titles", e) : p.call(s, "include", "tile_titles", e)); if (h || h === 0) { r += h } h = q["if"].call(s, (s && s.description), { hash: {}, inverse: o.noop, fn: o.program(12, v, y), data: y }); if (h || h === 0) { r += h } h = q["if"].call(s, ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.footer), { hash: {}, inverse: o.noop, fn: o.program(14, u, y), data: y }); if (h || h === 0) { r += h } h = q["if"].call(s, (s && s.dateBadge), { hash: {}, inverse: o.noop, fn: o.program(16, t, y), data: y }); if (h || h === 0) { r += h } r += "</div></div>"; return r });
this["DDG"]["templates"]["nlp_item"] = Handlebars.template(function(c, m, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, n, f = "function",
        h = this.escapeExpression,
        k = b.helperMissing;
    g += '<div class="tile  tile--c  tile--qa  has-detail" data-link="'; if (e = b.url) { a = e.call(m, { hash: {}, data: i }) } else { e = (m && m.url);
        a = typeof e === f ? e.call(m, { hash: {}, data: i }) : e } g += h(a) + '"><div class="tile__body  has-foot"><h6 class="tile__title  tile__title--3sm  tile__title--min">'; if (e = b.heading) { a = e.call(m, { hash: {}, data: i }) } else { e = (m && m.heading);
        a = typeof e === f ? e.call(m, { hash: {}, data: i }) : e } if (a || a === 0) { g += a } g += '</h6><div class="tile__content  tile__content--qa  js-ellipsis  hide--mob">'; if (e = b["abstract"]) { a = e.call(m, { hash: {}, data: i }) } else { e = (m && m["abstract"]);
        a = typeof e === f ? e.call(m, { hash: {}, data: i }) : e } if (a || a === 0) { g += a } g += '</div><div class="tile__foot">';
    a = (e = b.moreAt || (m && m.moreAt), n = { hash: { className: ("tile__more-link") }, data: i }, e ? e.call(m, (m && m.url), (m && m.source), n) : k.call(m, "moreAt", (m && m.url), (m && m.source), n)); if (a || a === 0) { g += a } g += "</div></div></div>"; return g });
this["DDG"]["templates"]["places_item"] = Handlebars.template(function(m, z, x, r, F) { this.compilerInfo = [4, ">= 1.0.0"];
    x = this.merge(x, m.helpers);
    F = F || {}; var y = "",
        n, a, g, e = "function",
        c = this.escapeExpression,
        v = x.helperMissing,
        u = this;

    function t(J, I) { var G, H; if (H = x.elClass) { G = H.call(J, { hash: {}, data: I }) } else { H = (J && J.elClass);
            G = typeof H === e ? H.call(J, { hash: {}, data: I }) : H } return c(G) }

    function s(I, H) { var G; return c(((G = ((G = ((G = (I && I.meta)), G == null || G === false ? G : G.elClass)), G == null || G === false ? G : G.tile)), typeof G === e ? G.apply(I) : G)) }

    function q(L, K) { var G = "",
            I, J, H;
        G += '<div class="tile__media__wrapper"><img src="" data-src="' + c((J = x.imageProxy || (L && L.imageProxy), H = { hash: {}, data: K }, J ? J.call(L, (L && L.image), H) : v.call(L, "imageProxy", (L && L.image), H))) + '" alt="'; if (J = x.title) { I = J.call(L, { hash: {}, data: K }) } else { J = (L && L.title);
            I = typeof J === e ? J.call(L, { hash: {}, data: K }) : J } G += c(I) + '" class="tile__media__img  js-lazyload" /></div>'; return G }

    function p(H, G) { return '<span class="ddgsi tile__media__no-img">@</span>' }

    function k(K, J) { var G = "",
            H, I;
        G += '<span class="tile__neighborhood">'; if (I = x.neighborhoodOrCity) { H = I.call(K, { hash: {}, data: J }) } else { I = (K && K.neighborhoodOrCity);
            H = typeof I === e ? I.call(K, { hash: {}, data: J }) : I } G += c(H) + "</span>"; return G }

    function E(K, J) { var H, I, G;
        H = (I = x.include || (K && K.include), G = { hash: {}, data: J }, I ? I.call(K, ((H = ((H = (K && K.meta)), H == null || H === false ? H : H.options)), H == null || H === false ? H : H.item_footer), G) : v.call(K, "include", ((H = ((H = (K && K.meta)), H == null || H === false ? H : H.options)), H == null || H === false ? H : H.item_footer), G)); if (H || H === 0) { return H } else { return "" } }

    function D(J, I) { var G = "",
            H;
        H = x["if"].call(J, (J && J.rating), { hash: {}, inverse: u.noop, fn: u.program(14, C, I), data: I }); if (H || H === 0) { G += H } H = x["if"].call(J, (J && J.reviews), { hash: {}, inverse: u.noop, fn: u.program(16, B, I), data: I }); if (H || H === 0) { G += H } return G }

    function C(K, J) { var H, I, G;
        H = (I = x.starRating || (K && K.starRating), G = { hash: {}, data: J }, I ? I.call(K, (K && K.rating), G) : v.call(K, "starRating", (K && K.rating), G)); if (H || H === 0) { return H } else { return "" } }

    function B(K, J) { var H, I, G;
        H = (I = x.reviewCount || (K && K.reviewCount), G = { hash: {}, data: J }, I ? I.call(K, (K && K.reviews), "", true, G) : v.call(K, "reviewCount", (K && K.reviews), "", true, G)); if (H || H === 0) { return H } else { return "" } }

    function A(H, G) { return "has-foot" }

    function o(L, K) { var G = "",
            I, J, H;
        G += '<span class="tile__price">';
        I = (J = x.priceSymbols || (L && L.priceSymbols), H = { hash: {}, data: K }, J ? J.call(L, (L && L.price), 4, H) : v.call(L, "priceSymbols", (L && L.price), 4, H)); if (I || I === 0) { G += I } G += "</span>"; return G }

    function j(I, H) { var G;
        G = x["if"].call(I, (I && I.canMakePhoneCalls), { hash: {}, inverse: u.program(25, h, H), fn: u.program(23, i, H), data: H }); if (G || G === 0) { return G } else { return "" } }

    function i(L, K) { var G = "",
            I, J, H;
        G += '<a href="tel:'; if (J = x.phone) { I = J.call(L, { hash: {}, data: K }) } else { J = (L && L.phone);
            I = typeof J === e ? J.call(L, { hash: {}, data: K }) : J } G += c(I) + '" class="tile__segment tile__call js-tel-link"><div class="tile__segment__title">';
        I = (J = x.lp || (L && L.lp), H = { hash: {}, data: K }, J ? J.call(L, "maps_places", "Call", H) : v.call(L, "lp", "maps_places", "Call", H)); if (I || I === 0) { G += I } G += '</div><div class="tile__phone">'; if (J = x.phone) { I = J.call(L, { hash: {}, data: K }) } else { J = (L && L.phone);
            I = typeof J === e ? J.call(L, { hash: {}, data: K }) : J } G += c(I) + "</div></a>"; return G }

    function h(L, K) { var G = "",
            I, J, H;
        G += '<div class="tile__segment"><div class="tile__segment__title">';
        I = (J = x.lp || (L && L.lp), H = { hash: {}, data: K }, J ? J.call(L, "maps_places", "Phone Number", H) : v.call(L, "lp", "maps_places", "Phone Number", H)); if (I || I === 0) { G += I } G += '</div><a href="tel:'; if (J = x.phone) { I = J.call(L, { hash: {}, data: K }) } else { J = (L && L.phone);
            I = typeof J === e ? J.call(L, { hash: {}, data: K }) : J } G += c(I) + '" class="tile__phone js-tel-link">'; if (J = x.phone) { I = J.call(L, { hash: {}, data: K }) } else { J = (L && L.phone);
            I = typeof J === e ? J.call(L, { hash: {}, data: K }) : J } G += c(I) + "</a></div>"; return G }

    function f(L, K) { var G = "",
            I, J, H;
        G += '<div class="tile__segment tile__directions js-directions-container"><a class="tile__directions__link tile__segment__title js-directions-link" href="'; if (J = x.directions) { I = J.call(L, { hash: {}, data: K }) } else { J = (L && L.directions);
            I = typeof J === e ? J.call(L, { hash: {}, data: K }) : J } G += c(I) + '">';
        I = (J = x.lp || (L && L.lp), H = { hash: {}, data: K }, J ? J.call(L, "maps_places", "Directions", H) : v.call(L, "lp", "maps_places", "Directions", H)); if (I || I === 0) { G += I } G += "</a></div>"; return G }

    function b(L, K) { var G = "",
            I, J, H;
        G += '<div class="tile__foot">';
        I = (J = x.moreAt || (L && L.moreAt), H = { hash: { dynamicMoreAtText: (5), className: ("tile--loc__more"), iconClassName: ("tile--loc__more__icon"), iconPlaceholder: ("true") }, data: K }, J ? J.call(L, (L && L.url), ((I = (L && L.meta)), I == null || I === false ? I : I.sourceName), H) : v.call(L, "moreAt", (L && L.url), ((I = (L && L.meta)), I == null || I === false ? I : I.sourceName), H)); if (I || I === 0) { G += I } G += "</div>"; return G } y += '<div class="tile  tile--f  tile--loc ';
    n = x["if"].call(z, (z && z.elClass), { hash: {}, inverse: u.program(3, s, F), fn: u.program(1, t, F), data: F }); if (n || n === 0) { y += n } y += '"><div class="tile--f__main  tile--loc__main"><div class="tile__media">';
    n = x["if"].call(z, (z && z.image), { hash: {}, inverse: u.program(7, p, F), fn: u.program(5, q, F), data: F }); if (n || n === 0) { y += n } y += '</div><div class="tile__num">'; if (a = x.num) { n = a.call(z, { hash: {}, data: F }) } else { a = (z && z.num);
        n = typeof a === e ? a.call(z, { hash: {}, data: F }) : a } y += c(n) + '</div><div class="tile__body"><h6 class="tile__title">' + c((a = x.ellipsis || (z && z.ellipsis), g = { hash: {}, data: F }, a ? a.call(z, (z && z.name), 33, g) : v.call(z, "ellipsis", (z && z.name), 33, g))) + "</h6>";
    n = x["if"].call(z, (z && z.neighborhoodOrCity), { hash: {}, inverse: u.noop, fn: u.program(9, k, F), data: F }); if (n || n === 0) { y += n } y += '<div class="tile__foot  tile__rating  one-line">';
    n = x["if"].call(z, ((n = ((n = (z && z.meta)), n == null || n === false ? n : n.options)), n == null || n === false ? n : n.item_footer), { hash: {}, inverse: u.program(13, D, F), fn: u.program(11, E, F), data: F }); if (n || n === 0) { y += n } y += '</div></div></div><div class="tile--f__alt  tile--loc__alt"><div class="tile__body  ';
    n = (a = x.and || (z && z.and), g = { hash: {}, inverse: u.noop, fn: u.program(18, A, F), data: F }, a ? a.call(z, (z && z.url), ((n = (z && z.meta)), n == null || n === false ? n : n.sourceName), g) : v.call(z, "and", (z && z.url), ((n = (z && z.meta)), n == null || n === false ? n : n.sourceName), g)); if (n || n === 0) { y += n } y += ' has-segments"><div class="tile__segment"><h6 class="tile__title"><a href="'; if (a = x.url) { n = a.call(z, { hash: {}, data: F }) } else { a = (z && z.url);
        n = typeof a === e ? a.call(z, { hash: {}, data: F }) : a } y += c(n) + '" title="'; if (a = x.name) { n = a.call(z, { hash: {}, data: F }) } else { a = (z && z.name);
        n = typeof a === e ? a.call(z, { hash: {}, data: F }) : a } y += c(n) + '">' + c((a = x.ellipsis || (z && z.ellipsis), g = { hash: {}, data: F }, a ? a.call(z, (z && z.name), 33, g) : v.call(z, "ellipsis", (z && z.name), 33, g))) + "</a></h6>";
    n = x["if"].call(z, (z && z.price), { hash: {}, inverse: u.noop, fn: u.program(20, o, F), data: F }); if (n || n === 0) { y += n } y += "</div>";
    n = x["if"].call(z, (z && z.phone), { hash: {}, inverse: u.noop, fn: u.program(22, j, F), data: F }); if (n || n === 0) { y += n } n = x["if"].call(z, (z && z.address), { hash: {}, inverse: u.noop, fn: u.program(27, f, F), data: F }); if (n || n === 0) { y += n } n = (a = x.and || (z && z.and), g = { hash: {}, inverse: u.noop, fn: u.program(29, b, F), data: F }, a ? a.call(z, (z && z.url), ((n = (z && z.meta)), n == null || n === false ? n : n.sourceName), g) : v.call(z, "and", (z && z.url), ((n = (z && z.meta)), n == null || n === false ? n : n.sourceName), g)); if (n || n === 0) { y += n } y += "</div></div></div>"; return y });
this["DDG"]["templates"]["products_item"] = Handlebars.template(function(g, u, s, m, B) { this.compilerInfo = [4, ">= 1.0.0"];
    s = this.merge(s, g.helpers);
    B = B || {}; var t = "",
        i, a, e, c = "function",
        b = this.escapeExpression,
        q = this,
        r = s.helperMissing;

    function p(F, E) { var C, D; if (D = s.elClass) { C = D.call(F, { hash: {}, data: E }) } else { D = (F && F.elClass);
            C = typeof D === c ? D.call(F, { hash: {}, data: E }) : D } return b(C) }

    function o(E, D) { var C;
        C = s["if"].call(E, ((C = ((C = (E && E.meta)), C == null || C === false ? C : C.elClass)), C == null || C === false ? C : C.tile), { hash: {}, inverse: q.program(6, k, D), fn: q.program(4, n, D), data: D }); if (C || C === 0) { return C } else { return "" } }

    function n(E, D) { var C; return b(((C = ((C = ((C = (E && E.meta)), C == null || C === false ? C : C.elClass)), C == null || C === false ? C : C.tile)), typeof C === c ? C.apply(E) : C)) }

    function k(D, C) { return "tile--c" }

    function h(D, C) { return " has-rating" }

    function A(G, F) { var D, E, C;
        D = (E = s.include || (G && G.include), C = { hash: {}, data: F }, E ? E.call(G, ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.badge), C) : r.call(G, "include", ((D = ((D = (G && G.meta)), D == null || D === false ? D : D.options)), D == null || D === false ? D : D.badge), C)); if (D || D === 0) { return D } else { return "" } }

    function z(G, F) { var D, E, C;
        D = (E = s.formatTitle || (G && G.formatTitle), C = { hash: { el: ("h6"), className: ("tile__title"), classNameSec: ("tile__title--pr"), href: ("url"), optSub: (true), ellipsis: (100) }, data: F }, E ? E.call(G, (G && G.heading), C) : r.call(G, "formatTitle", (G && G.heading), C)); if (D || D === 0) { return D } else { return "" } }

    function y(G, F) { var D, E, C;
        D = (E = s.formatTitle || (G && G.formatTitle), C = { hash: { el: ("h6"), className: ("tile__title"), classNameSec: ("tile__title--pr"), optSub: (true), ellipsis: (100) }, data: F }, E ? E.call(G, (G && G.heading), C) : r.call(G, "formatTitle", (G && G.heading), C)); if (D || D === 0) { return D } else { return "" } }

    function x(G, F) { var C = "",
            D, E;
        C += '<span class="tile--pr__price  price">'; if (E = s.price) { D = E.call(G, { hash: {}, data: F }) } else { E = (G && G.price);
            D = typeof E === c ? E.call(G, { hash: {}, data: F }) : E } C += b(D) + "</span>"; return C }

    function v(D, C) { return '<span class="sep  tile__sep"></span>' }

    function j(H, G) { var C = "",
            E, F, D;
        C += '<span class="tile--pr__brand">';
        E = (F = s.lp || (H && H.lp), D = { hash: {}, data: G }, F ? F.call(H, "made_by", "by %s", (H && H.brand), D) : r.call(H, "lp", "made_by", "by %s", (H && H.brand), D)); if (E || E === 0) { C += E } C += "</span>"; return C }

    function f(H, G) { var C = "",
            E, F, D;
        C += '<div class="tile__tx  tile__rating  one-line">';
        E = (F = s.starsAndReviews || (H && H.starsAndReviews), D = { hash: {}, data: G }, F ? F.call(H, (H && H.rating), (H && H.reviewCount), (H && H.url_review), true, D) : r.call(H, "starsAndReviews", (H && H.rating), (H && H.reviewCount), (H && H.url_review), true, D)); if (E || E === 0) { C += E } C += "</div>"; return C } t += '<div class="tile  tile--pr ';
    i = s["if"].call(u, (u && u.elClass), { hash: {}, inverse: q.program(3, o, B), fn: q.program(1, p, B), data: B }); if (i || i === 0) { t += i } t += " has-detail  tile--"; if (a = s.parentId) { i = a.call(u, { hash: {}, data: B }) } else { a = (u && u.parentId);
        i = typeof a === c ? a.call(u, { hash: {}, data: B }) : a } t += b(i) + " ";
    i = s["if"].call(u, ((i = ((i = (u && u.meta)), i == null || i === false ? i : i.options)), i == null || i === false ? i : i.rating), { hash: {}, inverse: q.noop, fn: q.program(8, h, B), data: B }); if (i || i === 0) { t += i } t += ' opt--t-xxs" data-link="'; if (a = s.url) { i = a.call(u, { hash: {}, data: B }) } else { a = (u && u.url);
        i = typeof a === c ? a.call(u, { hash: {}, data: B }) : a } t += b(i) + '"><div class="tile__media  tile__media--pr"><img src="" data-src="';
    i = (a = s.imageProxy || (u && u.imageProxy), e = { hash: {}, data: B }, a ? a.call(u, (u && u.img), e) : r.call(u, "imageProxy", (u && u.img), e)); if (i || i === 0) { t += i } t += '" alt="'; if (a = s.title) { i = a.call(u, { hash: {}, data: B }) } else { a = (u && u.title);
        i = typeof a === c ? a.call(u, { hash: {}, data: B }) : a } t += b(i) + '" class="tile__media__img  js-lazyload" />';
    i = (a = s.and || (u && u.and), e = { hash: {}, inverse: q.noop, fn: q.program(10, A, B), data: B }, a ? a.call(u, (u && u.showBadge), ((i = ((i = (u && u.meta)), i == null || i === false ? i : i.options)), i == null || i === false ? i : i.badge), e) : r.call(u, "and", (u && u.showBadge), ((i = ((i = (u && u.meta)), i == null || i === false ? i : i.options)), i == null || i === false ? i : i.badge), e)); if (i || i === 0) { t += i } t += '</div><div class="tile__body  tile__body--pr">';
    i = s["if"].call(u, (u && u.url), { hash: {}, inverse: q.program(14, y, B), fn: q.program(12, z, B), data: B }); if (i || i === 0) { t += i } t += '<div class="tile__tx  tile--pr__sub  one-line">';
    i = (a = s.and || (u && u.and), e = { hash: {}, inverse: q.noop, fn: q.program(16, x, B), data: B }, a ? a.call(u, ((i = ((i = (u && u.meta)), i == null || i === false ? i : i.options)), i == null || i === false ? i : i.price), (u && u.price), e) : r.call(u, "and", ((i = ((i = (u && u.meta)), i == null || i === false ? i : i.options)), i == null || i === false ? i : i.price), (u && u.price), e)); if (i || i === 0) { t += i } i = (a = s.and || (u && u.and), e = { hash: {}, inverse: q.noop, fn: q.program(18, v, B), data: B }, a ? a.call(u, ((i = ((i = (u && u.meta)), i == null || i === false ? i : i.options)), i == null || i === false ? i : i.price), ((i = ((i = (u && u.meta)), i == null || i === false ? i : i.options)), i == null || i === false ? i : i.brand), (u && u.price), (u && u.brand), e) : r.call(u, "and", ((i = ((i = (u && u.meta)), i == null || i === false ? i : i.options)), i == null || i === false ? i : i.price), ((i = ((i = (u && u.meta)), i == null || i === false ? i : i.options)), i == null || i === false ? i : i.brand), (u && u.price), (u && u.brand), e)); if (i || i === 0) { t += i } i = (a = s.and || (u && u.and), e = { hash: {}, inverse: q.noop, fn: q.program(20, j, B), data: B }, a ? a.call(u, ((i = ((i = (u && u.meta)), i == null || i === false ? i : i.options)), i == null || i === false ? i : i.brand), (u && u.brand), e) : r.call(u, "and", ((i = ((i = (u && u.meta)), i == null || i === false ? i : i.options)), i == null || i === false ? i : i.brand), (u && u.brand), e)); if (i || i === 0) { t += i } t += "</div>";
    i = s["if"].call(u, ((i = ((i = (u && u.meta)), i == null || i === false ? i : i.options)), i == null || i === false ? i : i.rating), { hash: {}, inverse: q.noop, fn: q.program(22, f, B), data: B }); if (i || i === 0) { t += i } t += "</div></div>"; return t });
this["DDG"]["templates"]["text_item"] = Handlebars.template(function(f, s, q, j, x) { this.compilerInfo = [4, ">= 1.0.0"];
    q = this.merge(q, f.helpers);
    x = x || {}; var r = "",
        h, a, e, c = "function",
        b = this.escapeExpression,
        o = this,
        p = q.helperMissing;

    function n(B, A) { var y, z; if (z = q.elClass) { y = z.call(B, { hash: {}, data: A }) } else { z = (B && B.elClass);
            y = typeof z === c ? z.call(B, { hash: {}, data: A }) : z } return b(y) }

    function m(A, z) { var y;
        y = q["if"].call(A, ((y = ((y = (A && A.meta)), y == null || y === false ? y : y.elClass)), y == null || y === false ? y : y.tile), { hash: {}, inverse: o.program(6, i, z), fn: o.program(4, k, z), data: z }); if (y || y === 0) { return y } else { return "" } }

    function k(A, z) { var y; return b(((y = ((y = ((y = (A && A.meta)), y == null || y === false ? y : y.elClass)), y == null || y === false ? y : y.tile)), typeof y === c ? y.apply(A) : y)) }

    function i(z, y) { return "tile--c" }

    function g(C, B) { var y = "",
            z, A;
        y += 'data-link="'; if (A = q.url) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.url);
            z = typeof A === c ? A.call(C, { hash: {}, data: B }) : A } y += b(z) + '"'; return y }

    function v(z, y) { return "has-foot" }

    function u(D, C) { var y = "",
            A, B, z;
        y += '<div class="tile__foot ' + b(((A = ((A = ((A = (D && D.meta)), A == null || A === false ? A : A.elClass)), A == null || A === false ? A : A.tileFoot)), typeof A === c ? A.apply(D) : A)) + '">';
        A = (B = q.include || (D && D.include), z = { hash: {}, data: C }, B ? B.call(D, ((A = ((A = (D && D.meta)), A == null || A === false ? A : A.options)), A == null || A === false ? A : A.footer), z) : p.call(D, "include", ((A = ((A = (D && D.meta)), A == null || A === false ? A : A.options)), A == null || A === false ? A : A.footer), z)); if (A || A === 0) { y += A } y += "</div>"; return y }

    function t(C, B) { var z, A, y;
        z = (A = q.include || (C && C.include), y = { hash: {}, data: B }, A ? A.call(C, "date_badge", y) : p.call(C, "include", "date_badge", y)); if (z || z === 0) { return z } else { return "" } } r += '<div class="tile ';
    h = q["if"].call(s, (s && s.elClass), { hash: {}, inverse: o.program(3, m, x), fn: o.program(1, n, x), data: x }); if (h || h === 0) { r += h } r += " tile--" + b(((h = ((h = (s && s.meta)), h == null || h === false ? h : h.id)), typeof h === c ? h.apply(s) : h)) + '" ';
    h = q["if"].call(s, (s && s.url), { hash: {}, inverse: o.noop, fn: o.program(8, g, x), data: x }); if (h || h === 0) { r += h } r += '><div class="tile__body ';
    h = q["if"].call(s, ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.footer), { hash: {}, inverse: o.noop, fn: o.program(10, v, x), data: x }); if (h || h === 0) { r += h } r += " " + b(((h = ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.elClass)), h == null || h === false ? h : h.tileBody)), typeof h === c ? h.apply(s) : h)) + '">';
    h = (a = q.include || (s && s.include), e = { hash: {}, data: x }, a ? a.call(s, "tile_titles", e) : p.call(s, "include", "tile_titles", e)); if (h || h === 0) { r += h } r += '<div class="tile__content ' + b(((h = ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.elClass)), h == null || h === false ? h : h.tileSnippet)), typeof h === c ? h.apply(s) : h)) + '">' + b((a = q.ellipsis || (s && s.ellipsis), e = { hash: { fallback: (100) }, data: x }, a ? a.call(s, (s && s.description), ((h = (s && s.meta)), h == null || h === false ? h : h.snippetChars), e) : p.call(s, "ellipsis", (s && s.description), ((h = (s && s.meta)), h == null || h === false ? h : h.snippetChars), e))) + "</div>";
    h = q["if"].call(s, ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.footer), { hash: {}, inverse: o.noop, fn: o.program(12, u, x), data: x }); if (h || h === 0) { r += h } h = q["if"].call(s, (s && s.dateBadge), { hash: {}, inverse: o.noop, fn: o.program(14, t, x), data: x }); if (h || h === 0) { r += h } r += "</div></div>"; return r });
this["DDG"]["templates"]["tiles_item"] = Handlebars.template(function(f, m, e, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    j = j || {}; var h = "",
        b, g = "function",
        i = this.escapeExpression,
        n = this;

    function c(s, r) { var o = "",
            p, q;
        o += "spice_"; if (q = e.spice_name) { p = q.call(s, { hash: {}, data: r }) } else { q = (s && s.spice_name);
            p = typeof q === g ? q.call(s, { hash: {}, data: r }) : q } o += i(p); return o }

    function a(r, q) { var o, p; if (p = e.subcontent) { o = p.call(r, { hash: {}, data: q }) } else { p = (r && r.subcontent);
            o = typeof p === g ? p.call(r, { hash: {}, data: q }) : p } if (o || o === 0) { return o } else { return "" } } h += '<div class="tile  tile--s ';
    b = e["if"].call(m, (m && m.spice_name), { hash: {}, inverse: n.noop, fn: n.program(1, c, j), data: j }); if (b || b === 0) { h += b } h += '">';
    b = e["if"].call(m, (m && m.subcontent), { hash: {}, inverse: n.noop, fn: n.program(3, a, j), data: j }); if (b || b === 0) { h += b } h += "</div>"; return h });
this["DDG"]["templates"]["tiles_load_more"] = Handlebars.template(function(e, n, c, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    j = j || {}; var h = "",
        a, f, p, g = "function",
        i = this.escapeExpression,
        o = this,
        m = c.helperMissing;

    function b(s, r) { var q; return i(((q = ((q = ((q = (s && s.meta)), q == null || q === false ? q : q.elClass)), q == null || q === false ? q : q.tile)), typeof q === g ? q.apply(s) : q)) } h += '<div class="tile  tile--m  tile--m--'; if (f = c.id) { a = f.call(n, { hash: {}, data: j }) } else { f = (n && n.id);
        a = typeof f === g ? f.call(n, { hash: {}, data: j }) : f } h += i(a) + "  ";
    a = c["if"].call(n, ((a = ((a = (n && n.meta)), a == null || a === false ? a : a.elClass)), a == null || a === false ? a : a.tile), { hash: {}, inverse: o.noop, fn: o.program(1, b, j), data: j }); if (a || a === 0) { h += a } h += '"><div class="tile__body  hide--mob"><i class="tile--m__icon  tile--m__icon--l">+</i><span class="tile--m__subtitle">';
    a = (f = c.lp || (n && n.lp), p = { hash: {}, data: j }, f ? f.call(n, "additional", "More", p) : m.call(n, "lp", "additional", "More", p)); if (a || a === 0) { h += a } h += '</span></div><span class="tile--m--mob">';
    a = (f = c.lp || (n && n.lp), p = { hash: {}, data: j }, f ? f.call(n, "expand_text", "Show More", p) : m.call(n, "lp", "expand_text", "Show More", p)); if (a || a === 0) { h += a } h += "</span>"; if (f = c.loader) { a = f.call(n, { hash: {}, data: j }) } else { f = (n && n.loader);
        a = typeof f === g ? f.call(n, { hash: {}, data: j }) : f } if (a || a === 0) { h += a } h += "</div>"; return h });
this["DDG"]["templates"]["videos_item"] = Handlebars.template(function(f, o, e, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    k = k || {}; var i = "",
        b, g, r, h = "function",
        j = this.escapeExpression,
        q = this,
        n = e.helperMissing;

    function c(x, v) { var s = "",
            t, u;
        s += 'data-link="'; if (u = e.url) { t = u.call(x, { hash: {}, data: v }) } else { u = (x && x.url);
            t = typeof u === h ? u.call(x, { hash: {}, data: v }) : u } s += j(t) + '"'; return s }

    function a(x, v) { var s = "",
            t, u;
        s += '<a href="'; if (u = e.url) { t = u.call(x, { hash: {}, data: v }) } else { u = (x && x.url);
            t = typeof u === h ? u.call(x, { hash: {}, data: v }) : u } s += j(t) + '">'; return s }

    function p(t, s) { return "</a>" } i += '<div class="tile  tile--c--w  tile--vid  has-detail  opt--t-xxs" ';
    b = e["if"].call(o, (o && o.url), { hash: {}, inverse: q.noop, fn: q.program(1, c, k), data: k }); if (b || b === 0) { i += b } i += '><div class="tile__media"><img src="" data-src="' + j((g = e.imageProxy || (o && o.imageProxy), r = { hash: {}, data: k }, g ? g.call(o, ((b = (o && o.images)), b == null || b === false ? b : b.medium), r) : n.call(o, "imageProxy", ((b = (o && o.images)), b == null || b === false ? b : b.medium), r))) + '" alt="'; if (g = e.title) { b = g.call(o, { hash: {}, data: k }) } else { g = (o && o.title);
        b = typeof g === h ? g.call(o, { hash: {}, data: k }) : g } i += j(b) + '" class="tile__media__img  js-lazyload" /><span class="tile--vid__dur">'; if (g = e.duration) { b = g.call(o, { hash: {}, data: k }) } else { g = (o && o.duration);
        b = typeof g === h ? g.call(o, { hash: {}, data: k }) : g } i += j(b) + '</span></div><div class="tile__body"><h6 class="tile__title  tile__title--2">';
    b = e["if"].call(o, (o && o.url), { hash: {}, inverse: q.noop, fn: q.program(3, a, k), data: k }); if (b || b === 0) { i += b } i += j((g = e.ellipsis || (o && o.ellipsis), r = { hash: {}, data: k }, g ? g.call(o, (o && o.title), 55, r) : n.call(o, "ellipsis", (o && o.title), 55, r)));
    b = e["if"].call(o, (o && o.url), { hash: {}, inverse: q.noop, fn: q.program(5, p, k), data: k }); if (b || b === 0) { i += b } i += "</h6><span>";
    b = (g = e.favicon || (o && o.favicon), r = { hash: { lazy: ("1"), className: ("tile__favicon") }, data: k }, g ? g.call(o, (o && o.url), r) : n.call(o, "favicon", (o && o.url), r)); if (b || b === 0) { i += b } i += '<span class="video-source">'; if (g = e.provider) { b = g.call(o, { hash: {}, data: k }) } else { g = (o && o.provider);
        b = typeof g === h ? g.call(o, { hash: {}, data: k }) : g } i += j(b) + '</span></span><span class="tile__count">'; if (g = e.viewCount) { b = g.call(o, { hash: {}, data: k }) } else { g = (o && o.viewCount);
        b = typeof g === h ? g.call(o, { hash: {}, data: k }) : g } if (b || b === 0) { i += b } i += "</span></div></div>"; return i });
this["DDG"]["templates"]["base_item_detail"] = Handlebars.template(function(f, n, e, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    j = j || {}; var h = "",
        b, g = "function",
        i = this.escapeExpression,
        m = e.helperMissing,
        p = this;

    function c(v, u) { var q = "",
            s, t, r;
        q += '<div class="detail__media detail__media--' + i(((s = ((s = (v && v.meta)), s == null || s === false ? s : s.id)), typeof s === g ? s.apply(v) : s)) + " " + i(((s = ((s = ((s = (v && v.meta)), s == null || s === false ? s : s.elClass)), s == null || s === false ? s : s.detailMedia)), typeof s === g ? s.apply(v) : s)) + '"><img class="detail__media__img ' + i(((s = ((s = ((s = (v && v.meta)), s == null || s === false ? s : s.elClass)), s == null || s === false ? s : s.detailImg)), typeof s === g ? s.apply(v) : s)) + '" src="' + i((t = e.imageProxy || (v && v.imageProxy), r = { hash: {}, data: u }, t ? t.call(v, (v && v.image), r) : m.call(v, "imageProxy", (v && v.image), r))) + '" alt="'; if (t = e.imageAlt) { s = t.call(v, { hash: {}, data: u }) } else { t = (v && v.imageAlt);
            s = typeof t === g ? t.call(v, { hash: {}, data: u }) : t } q += i(s) + '" /></div>'; return q }

    function a(t, s) { var q, r; if (r = e.content) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.content);
            q = typeof r === g ? r.call(t, { hash: {}, data: s }) : r } if (q || q === 0) { return q } else { return "" } }

    function o(u, t) { var r, s, q;
        r = (s = e.include || (u && u.include), q = { hash: {}, data: t }, s ? s.call(u, ((r = ((r = (u && u.meta)), r == null || r === false ? r : r.options)), r == null || r === false ? r : r.content), q) : m.call(u, "include", ((r = ((r = (u && u.meta)), r == null || r === false ? r : r.options)), r == null || r === false ? r : r.content), q)); if (r || r === 0) { return r } else { return "" } } h += '<div class="detail__inner">';
    b = e["if"].call(n, (n && n.image), { hash: {}, inverse: p.noop, fn: p.program(1, c, j), data: j }); if (b || b === 0) { h += b } h += '<div class="detail__body detail__body--' + i(((b = ((b = (n && n.meta)), b == null || b === false ? b : b.id)), typeof b === g ? b.apply(n) : b)) + " " + i(((b = ((b = ((b = (n && n.meta)), b == null || b === false ? b : b.elClass)), b == null || b === false ? b : b.detailBody)), typeof b === g ? b.apply(n) : b)) + '"><div class="detail__body__content">';
    b = e["if"].call(n, (n && n.content), { hash: {}, inverse: p.program(5, o, j), fn: p.program(3, a, j), data: j }); if (b || b === 0) { h += b } h += "</div></div></div>"; return h });
this["DDG"]["templates"]["images_detail"] = Handlebars.template(function(f, s, q, j, t) { this.compilerInfo = [4, ">= 1.0.0"];
    q = this.merge(q, f.helpers);
    t = t || {}; var r = "",
        h, a, e, c = "function",
        b = this.escapeExpression,
        o = this,
        p = q.helperMissing;

    function n(z, y) { var u = "",
            v, x;
        u += "<a ";
        v = q["if"].call(z, ((v = (z && z.detail)), v == null || v === false ? v : v.width), { hash: {}, inverse: o.noop, fn: o.program(2, m, y), data: y }); if (v || v === 0) { u += v } u += ' href="'; if (x = q.image) { v = x.call(z, { hash: {}, data: y }) } else { x = (z && z.image);
            v = typeof x === c ? x.call(z, { hash: {}, data: y }) : x } u += b(v) + '" class="detail__media__img-link  js-detail-img  js-image-detail-link" target="_blank">'; return u }

    function m(y, x) { var u = "",
            v;
        u += 'style="width:' + b(((v = ((v = (y && y.detail)), v == null || v === false ? v : v.width)), typeof v === c ? v.apply(y) : v)) + ";height:" + b(((v = ((v = (y && y.detail)), v == null || v === false ? v : v.height)), typeof v === c ? v.apply(y) : v)) + ";top:" + b(((v = ((v = (y && y.detail)), v == null || v === false ? v : v.top)), typeof v === c ? v.apply(y) : v)) + ';"'; return u }

    function k(v, u) { return "</a>" }

    function i(A, z) { var u = "",
            x, y, v;
        u += '<a href="'; if (y = q.image) { x = y.call(A, { hash: {}, data: z }) } else { y = (A && A.image);
            x = typeof y === c ? y.call(A, { hash: {}, data: z }) : y } u += b(x) + '" target="_blank" class="c-detail__btn c-detail__btn--right btn js-image-detail-link">';
        x = (y = q.l || (A && A.l), v = { hash: {}, data: z }, y ? y.call(A, "View file", v) : p.call(A, "l", "View file", v)); if (x || x === 0) { u += x } u += "</a>"; return u }

    function g(A, z) { var u = "",
            x, y, v;
        u += '<a href="'; if (y = q.image) { x = y.call(A, { hash: {}, data: z }) } else { y = (A && A.image);
            x = typeof y === c ? y.call(A, { hash: {}, data: z }) : y } u += b(x) + '" target="_blank" class="c-detail__btn c-detail__btn--bottom btn js-image-detail-link">';
        x = (y = q.l || (A && A.l), v = { hash: {}, data: z }, y ? y.call(A, "View file", v) : p.call(A, "l", "View file", v)); if (x || x === 0) { u += x } u += "</a>"; return u } r += '<div class="detail__inner"><div class="detail__media  detail__media--images"><div class="detail__media__img-wrapper  js-image-detail-wrapper">';
    h = q["if"].call(s, (s && s.linkImage), { hash: {}, inverse: o.noop, fn: o.program(1, n, t), data: t }); if (h || h === 0) { r += h } r += '<div style="width:' + b(((h = ((h = (s && s.detail)), h == null || h === false ? h : h.transBgWidth)), typeof h === c ? h.apply(s) : h)) + ";height:" + b(((h = ((h = (s && s.detail)), h == null || h === false ? h : h.transBgHeight)), typeof h === c ? h.apply(s) : h)) + ';" class="detail__media__img-bg  js-detail-img  js-detail-img-bg"></div><img src="' + b((a = q.imageProxy || (s && s.imageProxy), e = { hash: {}, data: t }, a ? a.call(s, (s && s.thumbnail), e) : p.call(s, "imageProxy", (s && s.thumbnail), e))) + '" ';
    h = q["if"].call(s, ((h = (s && s.detail)), h == null || h === false ? h : h.width), { hash: {}, inverse: o.noop, fn: o.program(2, m, t), data: t }); if (h || h === 0) { r += h } r += ' class="detail__media__img-thumbnail  js-detail-img  js-detail-img-thumb" /><img ';
    h = q["if"].call(s, ((h = (s && s.detail)), h == null || h === false ? h : h.width), { hash: {}, inverse: o.noop, fn: o.program(2, m, t), data: t }); if (h || h === 0) { r += h } r += ' alt="'; if (a = q.title) { h = a.call(s, { hash: {}, data: t }) } else { a = (s && s.title);
        h = typeof a === c ? a.call(s, { hash: {}, data: t }) : a } r += b(h) + '" class="detail__media__img-highres  js-detail-img  js-detail-img-high" />';
    h = q["if"].call(s, (s && s.linkImage), { hash: {}, inverse: o.noop, fn: o.program(4, k, t), data: t }); if (h || h === 0) { r += h } r += '</div></div><div class="detail__body  detail__body--images"><div class="c-detail  detail__body__content"><h5 class="c-detail__title"><a href="'; if (a = q.url) { h = a.call(s, { hash: {}, data: t }) } else { a = (s && s.url);
        h = typeof a === c ? a.call(s, { hash: {}, data: t }) : a } r += b(h) + '">'; if (a = q.title) { h = a.call(s, { hash: {}, data: t }) } else { a = (s && s.title);
        h = typeof a === c ? a.call(s, { hash: {}, data: t }) : a } r += b(h) + '</a></h5><div class="c-detail__desc">';
    h = q["if"].call(s, (s && s.isMobile), { hash: {}, inverse: o.noop, fn: o.program(6, i, t), data: t }); if (h || h === 0) { r += h } r += '<p><a href="'; if (a = q.url) { h = a.call(s, { hash: {}, data: t }) } else { a = (s && s.url);
        h = typeof a === c ? a.call(s, { hash: {}, data: t }) : a } r += b(h) + '">' + b((a = q.domain || (s && s.domain), e = { hash: {}, data: t }, a ? a.call(s, (s && s.url), e) : p.call(s, "domain", (s && s.url), e))) + '</a></p><div class="c-detail__filemeta">'; if (a = q.width) { h = a.call(s, { hash: {}, data: t }) } else { a = (s && s.width);
        h = typeof a === c ? a.call(s, { hash: {}, data: t }) : a } r += b(h) + " &times; "; if (a = q.height) { h = a.call(s, { hash: {}, data: t }) } else { a = (s && s.height);
        h = typeof a === c ? a.call(s, { hash: {}, data: t }) : a } r += b(h) + "</div>";
    h = q["if"].call(s, (s && s.isMobile), { hash: {}, inverse: o.program(8, g, t), fn: o.noop, data: t }); if (h || h === 0) { r += h } r += "</div></div></div></div>"; return r });
this["DDG"]["templates"]["media_item_detail"] = Handlebars.template(function(f, o, e, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    k = k || {}; var i = "",
        b, g, h = "function",
        j = this.escapeExpression,
        n = e.helperMissing,
        s = this;

    function c(z, y) { var t = "",
            v, x, u;
        t += '<div class="detail__media ' + j(((v = ((v = ((v = (z && z.meta)), v == null || v === false ? v : v.elClass)), v == null || v === false ? v : v.detailMedia)), typeof v === h ? v.apply(z) : v)) + '"><img class="detail__media__img ' + j(((v = ((v = ((v = (z && z.meta)), v == null || v === false ? v : v.elClass)), v == null || v === false ? v : v.detailImg)), typeof v === h ? v.apply(z) : v)) + '" src="' + j((x = e.imageProxy || (z && z.imageProxy), u = { hash: {}, data: y }, x ? x.call(z, (z && z.image), u) : n.call(z, "imageProxy", (z && z.image), u))) + '" alt="imageAlt" /></div>'; return t }

    function a(z, y) { var t = "",
            v, x, u;
        t += '<span class="c-detail__title__sub ' + j(((v = ((v = ((v = (z && z.meta)), v == null || v === false ? v : v.elClass)), v == null || v === false ? v : v.detailAltSubtitle)), typeof v === h ? v.apply(z) : v)) + '">';
        v = (x = e.formatSubtitle || (z && z.formatSubtitle), u = { hash: {}, data: y }, x ? x.call(z, (z && z.altSubtitle), u) : n.call(z, "formatSubtitle", (z && z.altSubtitle), u)); if (v || v === 0) { t += v } t += "</span>"; return t }

    function r(z, y) { var t = "",
            v, x, u;
        t += '<span class="c-detail__subtitle ' + j(((v = ((v = ((v = (z && z.meta)), v == null || v === false ? v : v.elClass)), v == null || v === false ? v : v.detailSubtitle)), typeof v === h ? v.apply(z) : v)) + '">';
        v = (x = e.formatSubtitle || (z && z.formatSubtitle), u = { hash: {}, data: y }, x ? x.call(z, (z && z.subtitle), u) : n.call(z, "formatSubtitle", (z && z.subtitle), u)); if (v || v === 0) { t += v } t += "</span>"; return t }

    function q(z, y) { var t = "",
            v, x, u;
        t += '<div class="c-detail__desc ' + j(((v = ((v = ((v = (z && z.meta)), v == null || v === false ? v : v.elClass)), v == null || v === false ? v : v.detailSnippet)), typeof v === h ? v.apply(z) : v)) + '">' + j((x = e.ellipsis || (z && z.ellipsis), u = { hash: { fallback: (155) }, data: y }, x ? x.call(z, (z && z.description), ((v = (z && z.meta)), v == null || v === false ? v : v.snippetChars), u) : n.call(z, "ellipsis", (z && z.description), ((v = (z && z.meta)), v == null || v === false ? v : v.snippetChars), u))) + "</div>"; return t }

    function p(z, y) { var t = "",
            v, x, u;
        t += '<div class="c-detail__callout ' + j(((v = ((v = ((v = (z && z.meta)), v == null || v === false ? v : v.elClass)), v == null || v === false ? v : v.detailFoot)), typeof v === h ? v.apply(z) : v)) + '">';
        v = (x = e.include || (z && z.include), u = { hash: {}, data: y }, x ? x.call(z, ((v = ((v = (z && z.meta)), v == null || v === false ? v : v.options)), v == null || v === false ? v : v.callout), u) : n.call(z, "include", ((v = ((v = (z && z.meta)), v == null || v === false ? v : v.options)), v == null || v === false ? v : v.callout), u)); if (v || v === 0) { t += v } t += "</div>"; return t } i += '<div class="detail__inner">';
    b = e["if"].call(o, (o && o.image), { hash: {}, inverse: s.noop, fn: s.program(1, c, k), data: k }); if (b || b === 0) { i += b } i += '<div class="detail__body ' + j(((b = ((b = ((b = (o && o.meta)), b == null || b === false ? b : b.elClass)), b == null || b === false ? b : b.detailBody)), typeof b === h ? b.apply(o) : b)) + '"><div class="c-detail detail__body__content"><h5 class="c-detail__title ' + j(((b = ((b = ((b = (o && o.meta)), b == null || b === false ? b : b.elClass)), b == null || b === false ? b : b.detailTitle)), typeof b === h ? b.apply(o) : b)) + '">'; if (g = e.title) { b = g.call(o, { hash: {}, data: k }) } else { g = (o && o.title);
        b = typeof g === h ? g.call(o, { hash: {}, data: k }) : g } i += j(b);
    b = e["if"].call(o, (o && o.altSubtitle), { hash: {}, inverse: s.noop, fn: s.program(3, a, k), data: k }); if (b || b === 0) { i += b } i += "</h5>";
    b = e["if"].call(o, (o && o.subtitle), { hash: {}, inverse: s.noop, fn: s.program(5, r, k), data: k }); if (b || b === 0) { i += b } b = e["if"].call(o, (o && o.description), { hash: {}, inverse: s.noop, fn: s.program(7, q, k), data: k }); if (b || b === 0) { i += b } b = e["if"].call(o, ((b = ((b = (o && o.meta)), b == null || b === false ? b : b.options)), b == null || b === false ? b : b.callout), { hash: {}, inverse: s.noop, fn: s.program(9, p, k), data: k }); if (b || b === 0) { i += b } i += "</div></div></div>"; return i });
this["DDG"]["templates"]["products_item_detail"] = Handlebars.template(function(g, s, q, k, v) { this.compilerInfo = [4, ">= 1.0.0"];
    q = this.merge(q, g.helpers);
    v = v || {}; var r = "",
        h, a, e, p = q.helperMissing,
        b = this.escapeExpression,
        c = "function",
        o = this;

    function n(B, A) { var x = "",
            z, y;
        x += '<div class="detail__media  detail__media--pr"><img class="detail__media__img" src="' + b((z = q.imageProxy || (B && B.imageProxy), y = { hash: {}, data: A }, z ? z.call(B, (B && B.img_m), y) : p.call(B, "imageProxy", (B && B.img_m), y))) + '" /></div>'; return x }

    function m(B, A) { var x = "",
            y, z;
        x += '<span class="c-detail__price  price  tx-clr--dk2">'; if (z = q.price) { y = z.call(B, { hash: {}, data: A }) } else { z = (B && B.price);
            y = typeof z === c ? z.call(B, { hash: {}, data: A }) : z } x += b(y) + "</span>"; return x }

    function j(y, x) { return '<span class="sep  c-detail__sep"></span>' }

    function i(C, B) { var x = "",
            z, A, y;
        x += '<span class="c-detail__brand">';
        z = (A = q.lp || (C && C.lp), y = { hash: {}, data: B }, A ? A.call(C, "made_by", "by %s", (C && C.brand), y) : p.call(C, "lp", "made_by", "by %s", (C && C.brand), y)); if (z || z === 0) { x += z } x += "</span>"; return x }

    function f(B, A) { var y, z, x;
        y = (z = q.include || (B && B.include), x = { hash: {}, data: A }, z ? z.call(B, ((y = ((y = (B && B.meta)), y == null || y === false ? y : y.options)), y == null || y === false ? y : y.subtitle_content), x) : p.call(B, "include", ((y = ((y = (B && B.meta)), y == null || y === false ? y : y.options)), y == null || y === false ? y : y.subtitle_content), x)); if (y || y === 0) { return y } else { return "" } }

    function u(C, B) { var x = "",
            z, A, y;
        x += '<p class="c-detail__rating">';
        z = (A = q.starsAndReviews || (C && C.starsAndReviews), y = { hash: {}, data: B }, A ? A.call(C, (C && C.rating), (C && C.reviewCount), (C && C.url_review), ((z = ((z = (C && C.meta)), z == null || z === false ? z : z.options)), z == null || z === false ? z : z.hideReviewText), y) : p.call(C, "starsAndReviews", (C && C.rating), (C && C.reviewCount), (C && C.url_review), ((z = ((z = (C && C.meta)), z == null || z === false ? z : z.options)), z == null || z === false ? z : z.hideReviewText), y)); if (z || z === 0) { x += z } x += "</p>"; return x }

    function t(B, A) { var y, z, x;
        y = (z = q.include || (B && B.include), x = { hash: {}, data: A }, z ? z.call(B, ((y = ((y = (B && B.meta)), y == null || y === false ? y : y.options)), y == null || y === false ? y : y.buy), x) : p.call(B, "include", ((y = ((y = (B && B.meta)), y == null || y === false ? y : y.options)), y == null || y === false ? y : y.buy), x)); if (y || y === 0) { return y } else { return "" } } r += '<div class="detail__inner">';
    h = q["if"].call(s, (s && s.img_m), { hash: {}, inverse: o.noop, fn: o.program(1, n, v), data: v }); if (h || h === 0) { r += h } r += '<div class="detail__body  detail__body--pr"><div class="c-detail  detail__body__content">';
    h = (a = q.formatTitle || (s && s.formatTitle), e = { hash: { href: ((s && s.url)), el: ("h5"), className: ("c-detail__title"), ellipsis: (120) }, data: v }, a ? a.call(s, (s && s.heading), e) : p.call(s, "formatTitle", (s && s.heading), e)); if (h || h === 0) { r += h } r += '<p class="c-detail__subtitle">';
    h = (a = q.and || (s && s.and), e = { hash: {}, inverse: o.noop, fn: o.program(3, m, v), data: v }, a ? a.call(s, ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.price), (s && s.price), e) : p.call(s, "and", ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.price), (s && s.price), e)); if (h || h === 0) { r += h } h = (a = q.and || (s && s.and), e = { hash: {}, inverse: o.noop, fn: o.program(5, j, v), data: v }, a ? a.call(s, ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.price), ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.brand), (s && s.price), (s && s.brand), e) : p.call(s, "and", ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.price), ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.brand), (s && s.price), (s && s.brand), e)); if (h || h === 0) { r += h } h = (a = q.and || (s && s.and), e = { hash: {}, inverse: o.noop, fn: o.program(7, i, v), data: v }, a ? a.call(s, ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.brand), (s && s.brand), e) : p.call(s, "and", ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.brand), (s && s.brand), e)); if (h || h === 0) { r += h } h = q["if"].call(s, ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.subtitle_content), { hash: {}, inverse: o.noop, fn: o.program(9, f, v), data: v }); if (h || h === 0) { r += h } r += "</p>";
    h = q["if"].call(s, ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.rating), { hash: {}, inverse: o.noop, fn: o.program(11, u, v), data: v }); if (h || h === 0) { r += h } r += '<p class="c-detail__desc  hide--screen-xs">'; if (a = q["abstract"]) { h = a.call(s, { hash: {}, data: v }) } else { a = (s && s["abstract"]);
        h = typeof a === c ? a.call(s, { hash: {}, data: v }) : a } if (h || h === 0) { r += h } r += "</p>";
    h = q["if"].call(s, ((h = ((h = (s && s.meta)), h == null || h === false ? h : h.options)), h == null || h === false ? h : h.buy), { hash: {}, inverse: o.noop, fn: o.program(13, t, v), data: v }); if (h || h === 0) { r += h } r += "</div></div></div>"; return r });
this["DDG"]["templates"]["qa_detail"] = Handlebars.template(function(c, m, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, n, f = "function",
        h = this.escapeExpression,
        k = b.helperMissing;
    g += '<div class="detail__inner"><div class="detail__body  detail__body--qa"><div class="c-detail detail__body__content  detail__body__content--qa"><h4 class="c-detail__title  detail__title--qa"><a href="'; if (e = b.url) { a = e.call(m, { hash: {}, data: i }) } else { e = (m && m.url);
        a = typeof e === f ? e.call(m, { hash: {}, data: i }) : e } g += h(a) + '">'; if (e = b.heading) { a = e.call(m, { hash: {}, data: i }) } else { e = (m && m.heading);
        a = typeof e === f ? e.call(m, { hash: {}, data: i }) : e } if (a || a === 0) { g += a } g += '</a></h4><div class="chomp--scroll">'; if (e = b["abstract"]) { a = e.call(m, { hash: {}, data: i }) } else { e = (m && m["abstract"]);
        a = typeof e === f ? e.call(m, { hash: {}, data: i }) : e } if (a || a === 0) { g += a } g += '</div><p class="c-detail__more">';
    a = (e = b.moreAt || (m && m.moreAt), n = { hash: {}, data: i }, e ? e.call(m, (m && m.url), (m && m.source), n) : k.call(m, "moreAt", (m && m.url), (m && m.source), n)); if (a || a === 0) { g += a } g += "</p></div></div></div>"; return g });
this["DDG"]["templates"]["videos_detail"] = Handlebars.template(function(f, o, e, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    k = k || {}; var i = "",
        b, g, r, h = "function",
        j = this.escapeExpression,
        n = e.helperMissing,
        q = this;

    function c(x, v) { var s = "",
            t, u;
        s += '<p class="c-detail__user"><i class="c-detail__icon  c-detail__user__icon">u</i> <a href=\''; if (u = e.userURL) { t = u.call(x, { hash: {}, data: v }) } else { u = (x && x.userURL);
            t = typeof u === h ? u.call(x, { hash: {}, data: v }) : u } s += j(t) + "'>"; if (u = e.username) { t = u.call(x, { hash: {}, data: v }) } else { u = (x && x.username);
            t = typeof u === h ? u.call(x, { hash: {}, data: v }) : u } if (t || t === 0) { s += t } s += "</a></p>"; return s }

    function a(x, v) { var s = "",
            t, u;
        s += '<p class="c-detail__date"><i class="c-detail__icon  c-detail__date__icon">&uArr;</i> '; if (u = e.publishedDate) { t = u.call(x, { hash: {}, data: v }) } else { u = (x && x.publishedDate);
            t = typeof u === h ? u.call(x, { hash: {}, data: v }) : u } if (t || t === 0) { s += t } s += "</p>"; return s }

    function p(y, x) { var s = "",
            u, v, t;
        s += '<h6 class="c-detail__links--title">';
        u = (v = e.lp || (y && y.lp), t = { hash: {}, data: x }, v ? v.call(y, "access_song", "Get this song on:", t) : n.call(y, "lp", "access_song", "Get this song on:", t)); if (u || u === 0) { s += u } s += '</h6><p class="c-detail__links"><a href=\'/?q=' + j(((u = ((u = (y && y.musicVideo)), u == null || u === false ? u : u.spotifyURL)), typeof u === h ? u.apply(y) : u)) + "' class='btn c-detail__links__btn'>";
        u = (v = e.favicon || (y && y.favicon), t = { hash: { className: ("btn__icon"), w: ("auto"), h: ("auto") }, data: x }, v ? v.call(y, "spotify", t) : n.call(y, "favicon", "spotify", t)); if (u || u === 0) { s += u } s += "Spotify</a><a href='/?q=" + j(((u = ((u = (y && y.musicVideo)), u == null || u === false ? u : u.amazonURL)), typeof u === h ? u.apply(y) : u)) + "' class='btn c-detail__links__btn'>";
        u = (v = e.favicon || (y && y.favicon), t = { hash: { className: ("btn__icon"), w: ("auto"), h: ("auto") }, data: x }, v ? v.call(y, "amazon", t) : n.call(y, "favicon", "amazon", t)); if (u || u === 0) { s += u } s += "Amazon  </a><a style=\"display: none;\" href='' id=\"video-detail-itunes\" class='btn c-detail__links__btn' data-title='" + j(((u = ((u = (y && y.musicVideo)), u == null || u === false ? u : u.title)), typeof u === h ? u.apply(y) : u)) + "' data-artist='" + j(((u = ((u = (y && y.musicVideo)), u == null || u === false ? u : u.artist)), typeof u === h ? u.apply(y) : u)) + "' data-song='" + j(((u = ((u = (y && y.musicVideo)), u == null || u === false ? u : u.song)), typeof u === h ? u.apply(y) : u)) + "'>";
        u = (v = e.favicon || (y && y.favicon), t = { hash: { className: ("btn__icon"), w: ("auto"), h: ("auto") }, data: x }, v ? v.call(y, "apple", t) : n.call(y, "favicon", "apple", t)); if (u || u === 0) { s += u } s += "iTunes  </a></p>"; return s } i += '<div class="detail__inner"><div class="detail__media  detail__media--vid  js-video"><div class="detail__media__vid-wrap  js-video-media" style="background-image:url(\'' + j((g = e.imageProxy || (o && o.imageProxy), r = { hash: {}, data: k }, g ? g.call(o, ((b = (o && o.images)), b == null || b === false ? b : b.medium), r) : n.call(o, "imageProxy", ((b = (o && o.images)), b == null || b === false ? b : b.medium), r))) + '\');"></div></div><div class="detail__body"><div class="c-detail  detail__body__content"><h5 class="c-detail__title"><a href=\''; if (g = e.url) { b = g.call(o, { hash: {}, data: k }) } else { g = (o && o.url);
        b = typeof g === h ? g.call(o, { hash: {}, data: k }) : g } i += j(b) + "' title=\""; if (g = e.title) { b = g.call(o, { hash: {}, data: k }) } else { g = (o && o.title);
        b = typeof g === h ? g.call(o, { hash: {}, data: k }) : g } i += j(b) + '">'; if (g = e.title) { b = g.call(o, { hash: {}, data: k }) } else { g = (o && o.title);
        b = typeof g === h ? g.call(o, { hash: {}, data: k }) : g } i += j(b) + '</a></h5><div class="c-detail__desc">';
    b = e["if"].call(o, (o && o.username), { hash: {}, inverse: q.noop, fn: q.program(1, c, k), data: k }); if (b || b === 0) { i += b } i += '<p class="c-detail__count"><i class="c-detail__icon  c-detail__count__icon">i</i> '; if (g = e.viewCount) { b = g.call(o, { hash: {}, data: k }) } else { g = (o && o.viewCount);
        b = typeof g === h ? g.call(o, { hash: {}, data: k }) : g } if (b || b === 0) { i += b } i += "</p>";
    b = e["if"].call(o, (o && o.publishedDate), { hash: {}, inverse: q.noop, fn: q.program(3, a, k), data: k }); if (b || b === 0) { i += b } i += "</div>    ";
    b = e["if"].call(o, (o && o.musicVideo), { hash: {}, inverse: q.noop, fn: q.program(5, p, k), data: k }); if (b || b === 0) { i += b } i += '<p class="c-detail__more">';
    b = (g = e.moreAt || (o && o.moreAt), r = { hash: { className: (" "), iconClassName: ("c-detail__icon"), iconUrl: ((o && o.faviconURL)) }, data: k }, g ? g.call(o, (o && o.searchURL), (o && o.provider), r) : n.call(o, "moreAt", (o && o.searchURL), (o && o.provider), r)); if (b || b === 0) { i += b } i += "</p></div></div></div>"; return i });
this["DDG"]["templates"]["videos_detail_embed"] = Handlebars.template(function(c, k, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, f = "function",
        h = this.escapeExpression;
    g += '<iframe class="detail__media__vid" src="'; if (e = b.embedURL) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.embedURL);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + '" frameborder="0" scrolling="no" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>'; return g });
this["DDG"]["templates"]["videos_detail_privacy"] = Handlebars.template(function(c, j, b, h, g) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    g = g || {}; var f = "",
        a, e, k, i = b.helperMissing;
    f += '<div class="overlay  overlay--video-privacy"><div class="overlay__wrap"><div class="overlay__content"><div class="overlay--video-privacy__icon"></div><h3 class="overlay__title  detail__media__privacy__header">';
    a = (e = b.l || (j && j.l), k = { hash: {}, data: g }, e ? e.call(j, "YouTube Privacy Warning", k) : i.call(j, "l", "YouTube Privacy Warning", k)); if (a || a === 0) { f += a } f += '</h3><p class="overlay__text  overlay--video-privacy__text">';
    a = (e = b.l || (j && j.l), k = { hash: {}, data: g }, e ? e.call(j, "YouTube (owned by Google) does not let you watch videos anonymously. As such, watching YouTube videos here will be tracked by YouTube/Google.", k) : i.call(j, "l", "YouTube (owned by Google) does not let you watch videos anonymously. As such, watching YouTube videos here will be tracked by YouTube/Google.", k)); if (a || a === 0) { f += a } f += '</p><ul class="overlay__btn-list"><li class="overlay__btn-list__li"><a class="btn  btn--wire  overlay__btn  js-video-privacy-watch" href="#" title="';
    a = (e = b.l || (j && j.l), k = { hash: {}, data: g }, e ? e.call(j, "Watch Here", k) : i.call(j, "l", "Watch Here", k)); if (a || a === 0) { f += a } f += '">';
    a = (e = b.l || (j && j.l), k = { hash: {}, data: g }, e ? e.call(j, "Watch Here", k) : i.call(j, "l", "Watch Here", k)); if (a || a === 0) { f += a } f += '</a></li><li class="overlay__btn-list__li"><a class="btn  btn--wire  overlay__btn  js-video-privacy-leave" href="#" title="';
    a = (e = b.l || (j && j.l), k = { hash: {}, data: g }, e ? e.call(j, "Watch on YouTube", k) : i.call(j, "l", "Watch on YouTube", k)); if (a || a === 0) { f += a } f += '">';
    a = (e = b.l || (j && j.l), k = { hash: {}, data: g }, e ? e.call(j, "Watch on YouTube", k) : i.call(j, "l", "Watch on YouTube", k)); if (a || a === 0) { f += a } f += '</a></li></ul><label class="overlay--video-privacy__remember  js-video-privacy-remember-label"><input type="checkbox" class="js-video-privacy-remember" type="checkbox" checked="checked" />';
    a = (e = b.l || (j && j.l), k = { hash: {}, data: g }, e ? e.call(j, "Remember my choice (this can be changed in %sSettings%s)", '<a href="/settings#privacy" title="{{{l "Open Settings"}}}">', "</a>", k) : i.call(j, "l", "Remember my choice (this can be changed in %sSettings%s)", '<a href="/settings#privacy" title="{{{l "Open Settings"}}}">', "</a>", k)); if (a || a === 0) { f += a } f += "</label></div></div></div>"; return f });
this["DDG"]["templates"]["attribution"] = Handlebars.template(function(c, k, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, f = "function",
        h = this.escapeExpression;
    g += '<span class="modal-trig  '; if (e = b.className) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.className);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + '  hide--screen-s  hide--mob"><a class="attribution--link  js-attribution-link"><span class="attribution--link__icon  ddgsi">I</span></a></span>'; return g });
this["DDG"]["templates"]["attribution_modal"] = Handlebars.template(function(g, p, f, n, m) { this.compilerInfo = [4, ">= 1.0.0"];
    f = this.merge(f, g.helpers);
    m = m || {}; var j = "",
        b, h, r, o = f.helperMissing,
        i = "function",
        k = this.escapeExpression,
        q = this;

    function e(v, u) { var s = "",
            t;
        s += '<hr class="attribution__hr"/>';
        t = f.each.call(v, (v && v.devs), { hash: {}, inverse: q.noop, fn: q.program(2, c, u), data: u }); if (t || t === 0) { s += t } return s }

    function c(u, t) { var s;
        s = f["if"].call(u, (u && u.show), { hash: {}, inverse: q.noop, fn: q.program(3, a, t), data: t }); if (s || s === 0) { return s } else { return "" } }

    function a(y, x) { var s = "",
            u, v, t;
        s += '<div class="tx-clr--slate-light">';
        u = (v = f.lp || (y && y.lp), t = { hash: {}, data: x }, v ? v.call(y, "attribution", "Developer", t) : o.call(y, "lp", "attribution", "Developer", t)); if (u || u === 0) { s += u } s += ': <a href="' + k(((u = (y && y.url)), typeof u === i ? u.apply(y) : u)) + '" class="tx-clr--slate">' + k(((u = (y && y.name)), typeof u === i ? u.apply(y) : u)) + "</a></div>"; return s } j += '<div class="modal  modal--popout  modal--popout--'; if (h = f.direction) { b = h.call(p, { hash: {}, data: m }) } else { h = (p && p.direction);
        b = typeof h === i ? h.call(p, { hash: {}, data: m }) : h } j += k(b) + '  modal--popout--lg"><div class="modal__overlay js-modal-close"></div><div class="modal__wrap"><div class="modal__box"><div class="modal__body"><div class="attribution"><p class="tx-clr--slate">';
    b = (h = f.lp || (p && p.lp), r = { hash: {}, data: m }, h ? h.call(p, "attribution", "This instant answer was made by the %sDuckDuckHack%s Community.", "", "", r) : o.call(p, "lp", "attribution", "This instant answer was made by the %sDuckDuckHack%s Community.", "", "", r)); if (b || b === 0) { j += b } j += "</p>";
    b = f["if"].call(p, (p && p.devs), { hash: {}, inverse: q.noop, fn: q.program(1, e, m), data: m }); if (b || b === 0) { j += b } j += "</div></div></div></div></div>"; return j });
this["DDG"]["templates"]["chomp_link"] = Handlebars.template(function(e, n, c, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    j = j || {}; var h = "",
        a, f, p, g = "function",
        i = this.escapeExpression,
        o = this,
        m = c.helperMissing;

    function b(r, q) { return "sep--after" } h += '<a class="'; if (f = c.className) { a = f.call(n, { hash: {}, data: j }) } else { f = (n && n.className);
        a = typeof f === g ? f.call(n, { hash: {}, data: j }) : f } h += i(a) + "  chomp--link  js-chomp-link  ";
    a = c["if"].call(n, (n && n.sep), { hash: {}, inverse: o.noop, fn: o.program(1, b, j), data: j }); if (a || a === 0) { h += a } h += '"><i class="chomp--link__icn"></i><span class="chomp--link__mr">';
    a = (f = c.lp || (n && n.lp), p = { hash: {}, data: j }, f ? f.call(n, "expand_text", "Show More", p) : m.call(n, "lp", "expand_text", "Show More", p)); if (a || a === 0) { h += a } h += '</span><span class="chomp--link__ls">';
    a = (f = c.lp || (n && n.lp), p = { hash: {}, data: j }, f ? f.call(n, "expand_text", "Show Less", p) : m.call(n, "lp", "expand_text", "Show Less", p)); if (a || a === 0) { h += a } h += "</span></a>"; return h });
this["DDG"]["templates"]["date_badge"] = Handlebars.template(function(f, k, e, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    i = i || {}; var a, g = "function",
        h = this.escapeExpression,
        m = this;

    function c(r, q) { var o = "",
            p;
        o += '<div class="date-badge">';
        p = e["if"].call(r, (r && r.text), { hash: {}, inverse: m.program(4, n, q), fn: m.program(2, b, q), data: q }); if (p || p === 0) { o += p } o += "</div>"; return o }

    function b(s, r) { var o = "",
            p, q;
        o += '<span class="date-badge__text">'; if (q = e.text) { p = q.call(s, { hash: {}, data: r }) } else { q = (s && s.text);
            p = typeof q === g ? q.call(s, { hash: {}, data: r }) : q } o += h(p) + "</span>"; return o }

    function n(s, r) { var o = "",
            p, q;
        o += '<span class="date-badge__month">'; if (q = e.month) { p = q.call(s, { hash: {}, data: r }) } else { q = (s && s.month);
            p = typeof q === g ? q.call(s, { hash: {}, data: r }) : q } o += h(p) + '</span><span class="date-badge__day">'; if (q = e.day) { p = q.call(s, { hash: {}, data: r }) } else { q = (s && s.day);
            p = typeof q === g ? q.call(s, { hash: {}, data: r }) : q } o += h(p) + "</span>"; return o } a = e["with"].call(k, (k && k.dateBadge), { hash: {}, inverse: m.noop, fn: m.program(1, c, i), data: i }); if (a || a === 0) { return a } else { return "" } });
this["DDG"]["templates"]["infobox"] = Handlebars.template(function(e, s, q, j, x) { this.compilerInfo = [4, ">= 1.0.0"];
    q = this.merge(q, e.helpers);
    x = x || {}; var r = "",
        f, b = "function",
        a = this.escapeExpression,
        o = this,
        p = q.helperMissing;

    function n(B, A) { var y = "",
            z;
        z = q["if"].call(B, (B && B.heading), { hash: {}, inverse: o.noop, fn: o.program(2, m, A), data: A }); if (z || z === 0) { y += z } z = q["if"].call(B, (B && B.url), { hash: {}, inverse: o.program(13, u, A), fn: o.program(4, k, A), data: A }); if (z || z === 0) { y += z } return y }

    function m(C, B) { var y = "",
            z, A;
        y += '<h6 class="info  info--head">'; if (A = q.heading) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.heading);
            z = typeof A === b ? A.call(C, { hash: {}, data: B }) : A } y += a(z) + "</h6>"; return y }

    function k(B, A) { var y = "",
            z;
        y += '<div class="info  one-line">';
        z = q["if"].call(B, (B && B.label), { hash: {}, inverse: o.program(11, v, A), fn: o.program(5, i, A), data: A }); if (z || z === 0) { y += z } y += " </div>"; return y }

    function i(D, C) { var y = "",
            A, B, z;
        y += '<a class="tile--info__link" href="' + a((B = q.makeRelative || (D && D.makeRelative), z = { hash: {}, data: C }, B ? B.call(D, (D && D.url), z) : p.call(D, "makeRelative", (D && D.url), z))) + '"><span class="info__label">'; if (B = q.label) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.label);
            A = typeof B === b ? B.call(D, { hash: {}, data: C }) : B } y += a(A) + '</span><span class="info__value">';
        A = q["if"].call(D, ((A = (D && D.value)), A == null || A === false ? A : A.content), { hash: {}, inverse: o.program(9, c, C), fn: o.program(6, h, C), data: C }); if (A || A === 0) { y += A } y += "</span></a>"; return y }

    function h(A, z) { var y;
        y = q.each.call(A, ((y = (A && A.value)), y == null || y === false ? y : y.content), { hash: {}, inverse: o.noop, fn: o.program(7, g, z), data: z }); if (y || y === 0) { return y } else { return "" } }

    function g(C, B) { var y = "",
            z, A;
        y += '<span class="info__value__nested"><span class="info__value__nested__label">'; if (A = q.label) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.label);
            z = typeof A === b ? A.call(C, { hash: {}, data: B }) : A } y += a(z) + ":</span> "; if (A = q.value) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.value);
            z = typeof A === b ? A.call(C, { hash: {}, data: B }) : A } y += a(z) + "</span>"; return y }

    function c(B, A) { var y, z; if (z = q.value) { y = z.call(B, { hash: {}, data: A }) } else { z = (B && B.value);
            y = typeof z === b ? z.call(B, { hash: {}, data: A }) : z } return a(y) }

    function v(D, C) { var y = "",
            A, B, z;
        y += '<a class="tile--info__link" href="' + a((B = q.makeRelative || (D && D.makeRelative), z = { hash: {}, data: C }, B ? B.call(D, (D && D.url), z) : p.call(D, "makeRelative", (D && D.url), z))) + '">'; if (B = q.urlTitle) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.urlTitle);
            A = typeof B === b ? B.call(D, { hash: {}, data: C }) : B } if (A || A === 0) { y += A } y += "</a>"; return y }

    function u(A, z) { var y;
        y = q["if"].call(A, (A && A.label), { hash: {}, inverse: o.noop, fn: o.program(14, t, z), data: z }); if (y || y === 0) { return y } else { return "" } }

    function t(C, B) { var y = "",
            z, A;
        y += '<div class="info"><span class="info__label">'; if (A = q.label) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.label);
            z = typeof A === b ? A.call(C, { hash: {}, data: B }) : A } y += a(z) + '</span><span class="info__value">';
        z = q["if"].call(C, ((z = (C && C.value)), z == null || z === false ? z : z.content), { hash: {}, inverse: o.program(9, c, B), fn: o.program(6, h, B), data: B }); if (z || z === 0) { y += z } y += "</span></div>"; return y } r += '<div class="zci__aux"><div class="tile  tile--info  js-infobox-tile">';
    f = q.each.call(s, (s && s.data), { hash: {}, inverse: o.noop, fn: o.program(1, n, x), data: x }); if (f || f === 0) { r += f } r += '<div class="tile__expand  tile--info__expand  is-hidden  js-tile-expand"></div></div></div>'; return r });
this["DDG"]["templates"]["more_at"] = Handlebars.template(function(f, o, e, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    k = k || {}; var i = "",
        b, g, n = e.helperMissing,
        h = "function",
        j = this.escapeExpression,
        p = this;

    function c(u, t) { var r, s, q;
        r = (s = e.favicon || (u && u.favicon), q = { hash: { className: ((u && u.iconClassName)) }, data: t }, s ? s.call(u, (u && u.sourceUrl), q) : n.call(u, "favicon", (u && u.sourceUrl), q)); if (r || r === 0) { return r } else { return "" } }

    function a(v, u) { var q = "",
            s, t, r;
        q += '<img class="'; if (t = e.iconClassName) { s = t.call(v, { hash: {}, data: u }) } else { t = (v && v.iconClassName);
            s = typeof t === h ? t.call(v, { hash: {}, data: u }) : t } q += j(s) + '" src="' + j((t = e.imageProxy || (v && v.imageProxy), r = { hash: {}, data: u }, t ? t.call(v, (v && v.sourceIconUrl), r) : n.call(v, "imageProxy", (v && v.sourceIconUrl), r))) + '" />'; return q } i += '<a href="'; if (g = e.sourceUrl) { b = g.call(o, { hash: {}, data: k }) } else { g = (o && o.sourceUrl);
        b = typeof g === h ? g.call(o, { hash: {}, data: k }) : g } i += j(b) + '" class="'; if (g = e.className) { b = g.call(o, { hash: {}, data: k }) } else { g = (o && o.className);
        b = typeof g === h ? g.call(o, { hash: {}, data: k }) : g } i += j(b) + '">';
    b = e["if"].call(o, (o && o.sourceIcon), { hash: {}, inverse: p.noop, fn: p.program(1, c, k), data: k }); if (b || b === 0) { i += b } b = e["if"].call(o, (o && o.sourceIconUrl), { hash: {}, inverse: p.noop, fn: p.program(3, a, k), data: k }); if (b || b === 0) { i += b } if (g = e.moreAtText) { b = g.call(o, { hash: {}, data: k }) } else { g = (o && o.moreAtText);
        b = typeof g === h ? g.call(o, { hash: {}, data: k }) : g } if (b || b === 0) { i += b } i += "</a>"; return i });
this["DDG"]["templates"]["more_at_text"] = Handlebars.template(function(f, k, e, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    i = i || {}; var b, g = "function",
        h = this.escapeExpression,
        m = this;

    function c(r, q) { var o, p; if (p = e.sourceName) { o = p.call(r, { hash: {}, data: q }) } else { p = (r && r.sourceName);
            o = typeof p === g ? p.call(r, { hash: {}, data: q }) : p } return h(o) }

    function a(q, p) { var o;
        o = e["with"].call(q, (q && q.sourceLogo), { hash: {}, inverse: m.noop, fn: m.program(4, n, p), data: p }); if (o || o === 0) { return o } else { return "" } }

    function n(s, r) { var o = "",
            p, q;
        o += '<img class="zci__more-at__logo" src="'; if (q = e.url) { p = q.call(s, { hash: {}, data: r }) } else { q = (s && s.url);
            p = typeof q === g ? q.call(s, { hash: {}, data: r }) : q } o += h(p) + '" width="'; if (q = e.width) { p = q.call(s, { hash: {}, data: r }) } else { q = (s && s.width);
            p = typeof q === g ? q.call(s, { hash: {}, data: r }) : q } o += h(p) + '" height="'; if (q = e.height) { p = q.call(s, { hash: {}, data: r }) } else { q = (s && s.height);
            p = typeof q === g ? q.call(s, { hash: {}, data: r }) : q } o += h(p) + '" />'; return o } b = e.unless.call(k, (k && k.sourceLogo), { hash: {}, inverse: m.program(3, a, i), fn: m.program(1, c, i), data: i }); if (b || b === 0) { return b } else { return "" } });
this["DDG"]["templates"]["no_ia_results"] = Handlebars.template(function(f, n, e, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    j = j || {}; var h = "",
        b, g = "function",
        i = this.escapeExpression,
        m = e.helperMissing,
        o = this;

    function c(s, r) { var p, q; if (q = e.message) { p = q.call(s, { hash: {}, data: r }) } else { q = (s && s.message);
            p = typeof q === g ? q.call(s, { hash: {}, data: r }) : q } return i(p) }

    function a(t, s) { var q, r, p;
        q = (r = e.l || (t && t.l), p = { hash: {}, data: s }, r ? r.call(t, "Sorry, no results here.", p) : m.call(t, "l", "Sorry, no results here.", p)); if (q || q === 0) { return q } else { return "" } } h += '<div class="zci__no-results  t-s--screen-xs"><span class="zci__no-results__txt">';
    b = e["if"].call(n, (n && n.message), { hash: {}, inverse: o.program(3, a, j), fn: o.program(1, c, j), data: j }); if (b || b === 0) { h += b } h += "</span></div>"; return h });
this["DDG"]["templates"]["places_detail_rating_foursquare"] = Handlebars.template(function(e, m, c, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    j = j || {}; var h = "",
        a, f, g = "function",
        i = this.escapeExpression,
        n = this;

    function b(s, r) { var o = "",
            p, q;
        o += '<a class="review-count review-count--foursquare" href="'; if (q = c.url) { p = q.call(s, { hash: {}, data: r }) } else { q = (s && s.url);
            p = typeof q === g ? q.call(s, { hash: {}, data: r }) : q } o += i(p) + '"><span class="review-count__icon  ddgsi">O</span>'; if (q = c.reviews) { p = q.call(s, { hash: {}, data: r }) } else { q = (s && s.reviews);
            p = typeof q === g ? q.call(s, { hash: {}, data: r }) : q } o += i(p) + "</a>"; return o } h += '<span class="tile__rating__foursquare  '; if (f = c.ratingClass) { a = f.call(m, { hash: {}, data: j }) } else { f = (m && m.ratingClass);
        a = typeof f === g ? f.call(m, { hash: {}, data: j }) : f } h += i(a) + '  badge--txt">'; if (f = c.rating) { a = f.call(m, { hash: {}, data: j }) } else { f = (m && m.rating);
        a = typeof f === g ? f.call(m, { hash: {}, data: j }) : f } h += i(a) + "</span>";
    a = c["if"].call(m, (m && m.reviews), { hash: {}, inverse: n.noop, fn: n.program(1, b, j), data: j }); if (a || a === 0) { h += a } return h });
this["DDG"]["templates"]["places_detail_rating_yelp"] = Handlebars.template(function(e, m, c, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    i = i || {}; var g = "",
        a, f, o, k = c.helperMissing,
        h = this.escapeExpression,
        n = this;

    function b(t, s) { var q, r, p;
        q = (r = c.reviewCount || (t && t.reviewCount), p = { hash: {}, data: s }, r ? r.call(t, (t && t.reviews), (t && t.url), p) : k.call(t, "reviewCount", (t && t.reviews), (t && t.url), p)); if (q || q === 0) { return q } else { return "" } } g += '<img src="' + h((f = c.imageProxy || (m && m.imageProxy), o = { hash: {}, data: i }, f ? f.call(m, (m && m.ratingImageURL), o) : k.call(m, "imageProxy", (m && m.ratingImageURL), o))) + '" class="tile__rating__yelp-stars" />';
    a = c["if"].call(m, (m && m.reviews), { hash: {}, inverse: n.noop, fn: n.program(1, b, i), data: i }); if (a || a === 0) { g += a } return g });
this["DDG"]["templates"]["places_item_footer_foursquare"] = Handlebars.template(function(e, m, c, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    j = j || {}; var h = "",
        a, f, g = "function",
        i = this.escapeExpression,
        n = this;

    function b(s, r) { var o = "",
            p, q;
        o += '<span class="review-count review-count--foursquare"><span class="review-count__icon  ddgsi">O</span>'; if (q = c.reviews) { p = q.call(s, { hash: {}, data: r }) } else { q = (s && s.reviews);
            p = typeof q === g ? q.call(s, { hash: {}, data: r }) : q } o += i(p) + "</span>"; return o } h += '<span class="tile__rating__foursquare  '; if (f = c.ratingClass) { a = f.call(m, { hash: {}, data: j }) } else { f = (m && m.ratingClass);
        a = typeof f === g ? f.call(m, { hash: {}, data: j }) : f } h += i(a) + '  badge--txt">'; if (f = c.rating) { a = f.call(m, { hash: {}, data: j }) } else { f = (m && m.rating);
        a = typeof f === g ? f.call(m, { hash: {}, data: j }) : f } h += i(a) + "</span>";
    a = c["if"].call(m, (m && m.reviews), { hash: {}, inverse: n.noop, fn: n.program(1, b, j), data: j }); if (a || a === 0) { h += a } return h });
this["DDG"]["templates"]["places_item_footer_yelp"] = Handlebars.template(function(e, m, c, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    i = i || {}; var g = "",
        a, f, o, k = c.helperMissing,
        h = this.escapeExpression,
        n = this;

    function b(t, s) { var q, r, p;
        q = (r = c.reviewCount || (t && t.reviewCount), p = { hash: {}, data: s }, r ? r.call(t, (t && t.reviews), "", true, p) : k.call(t, "reviewCount", (t && t.reviews), "", true, p)); if (q || q === 0) { return q } else { return "" } } g += '<img src="' + h((f = c.imageProxy || (m && m.imageProxy), o = { hash: {}, data: i }, f ? f.call(m, (m && m.ratingImageURL), o) : k.call(m, "imageProxy", (m && m.ratingImageURL), o))) + '" class="tile__rating__yelp-stars" />';
    a = c["if"].call(m, (m && m.reviews), { hash: {}, inverse: n.noop, fn: n.program(1, b, i), data: i }); if (a || a === 0) { g += a } return g });
this["DDG"]["templates"]["play_button"] = Handlebars.template(function(c, k, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, f = "function",
        h = this.escapeExpression;
    g += '<div class="play-btn js-play-btn" data-url="'; if (e = b.url) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.url);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + '"><span class="play-btn__icn  ddgsi  js-play-btn-icn">►</span><span class="play-btn__err  is-hidden  js-play-btn-err"></span></div>'; return g });
this["DDG"]["templates"]["products_amazon_badge"] = Handlebars.template(function(e, f, b, a, c) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, e.helpers);
    c = c || {}; return '<span class="tile--pr__badge  badge  badge--prime"></span>' });
this["DDG"]["templates"]["products_amazon_buy"] = Handlebars.template(function(c, m, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, n, f = "function",
        h = this.escapeExpression,
        k = b.helperMissing;
    g += '    <span class="detail__callout--pr"><a href="'; if (e = b.url) { a = e.call(m, { hash: {}, data: i }) } else { e = (m && m.url);
        a = typeof e === f ? e.call(m, { hash: {}, data: i }) : e } g += h(a) + '" class="btn btn--primary">';
    a = (e = b.l || (m && m.l), n = { hash: {}, data: i }, e ? e.call(m, "More at", n) : k.call(m, "l", "More at", n)); if (a || a === 0) { g += a } g += " " + h(((a = ((a = (m && m.meta)), a == null || a === false ? a : a.sourceName)), typeof a === f ? a.apply(m) : a)) + "</a></span>"; return g });
this["DDG"]["templates"]["record"] = Handlebars.template(function(f, o, e, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    k = k || {}; var i = "",
        b, g, s, r = this,
        h = "function",
        j = this.escapeExpression,
        n = e.helperMissing;

    function c(u, t) { return "record--keyspacing" }

    function a(u, t) { return "record--highlight" }

    function q(A, y, z) { var t = "",
            v, x, u;
        t += '<tr class="record__row  ';
        v = e["if"].call(A, ((v = ((v = (z && z.meta)), v == null || v === false ? v : v.options)), v == null || v === false ? v : v.rowHighlight), { hash: {}, inverse: r.noop, fn: r.program(6, p, y), data: y }); if (v || v === 0) { t += v } t += '"><td class="record__cell  record__cell--key">'; if (x = e.key) { v = x.call(A, { hash: {}, data: y }) } else { x = (A && A.key);
            v = typeof x === h ? x.call(A, { hash: {}, data: y }) : x } t += j(v) + '</td><td class="record__cell  record__cell--value">' + j((x = e.ellipsis || (A && A.ellipsis), u = { hash: {}, data: y }, x ? x.call(A, (A && A.value), 350, u) : n.call(A, "ellipsis", (A && A.value), 350, u))) + "</td></tr>"; return t }

    function p(u, t) { return "record__row--highlight" } i += '<div class="record  ';
    b = e["if"].call(o, ((b = ((b = (o && o.meta)), b == null || b === false ? b : b.options)), b == null || b === false ? b : b.keySpacing), { hash: {}, inverse: r.noop, fn: r.program(1, c, k), data: k }); if (b || b === 0) { i += b } i += "  ";
    b = e["if"].call(o, ((b = ((b = (o && o.meta)), b == null || b === false ? b : b.options)), b == null || b === false ? b : b.rowHighlight), { hash: {}, inverse: r.noop, fn: r.program(3, a, k), data: k }); if (b || b === 0) { i += b } i += '"><table class="record__body">';
    b = (g = e["table-each"] || (o && o["table-each"]), s = { hash: {}, inverse: r.noop, fn: r.programWithDepth(5, q, k, o), data: k }, g ? g.call(o, o, s) : n.call(o, "table-each", o, s)); if (b || b === 0) { i += b } i += "</table></div>"; return i });
this["DDG"]["templates"]["sports_score"] = Handlebars.template(function(g, v, t, o, D) { this.compilerInfo = [4, ">= 1.0.0"];
    t = this.merge(t, g.helpers);
    D = D || {}; var u = "",
        j, a, e, c = "function",
        b = this.escapeExpression,
        s = t.helperMissing,
        r = this;

    function q(I, H) { var E = "",
            F, G;
        E += '<span class="c-score__clock"><span class="c-score__clock__icon ddgsi-clock"></span>'; if (G = t.clock) { F = G.call(I, { hash: {}, data: H }) } else { G = (I && I.clock);
            F = typeof G === c ? G.call(I, { hash: {}, data: H }) : G } E += b(F) + "</span>"; return E }

    function p(H, G) { var F, E; return b((F = t.momentDate || (H && H.momentDate), E = { hash: {}, data: G }, F ? F.call(H, (H && H.start_time), E) : s.call(H, "momentDate", (H && H.start_time), E))) }

    function n(H, G) { var E = "",
            F;
        F = t.each.call(H, ((F = ((F = (H && H.score)), F == null || F === false ? F : F.away)), F == null || F === false ? F : F.sequence), { hash: {}, inverse: r.noop, fn: r.program(6, m, G), data: G }); if (F || F === 0) { E += F } F = t["if"].call(H, (H && H.current_count), { hash: {}, inverse: r.noop, fn: r.program(8, i, G), data: G }); if (F || F === 0) { E += F } return E }

    function m(I, H) { var E = "",
            F, G;
        E += '<div class="c-score__item  c-score__item--'; if (G = t.type) { F = G.call(I, { hash: {}, data: H }) } else { G = (I && I.type);
            F = typeof G === c ? G.call(I, { hash: {}, data: H }) : G } E += b(F) + '">'; if (G = t.number) { F = G.call(I, { hash: {}, data: H }) } else { G = (I && I.number);
            F = typeof G === c ? G.call(I, { hash: {}, data: H }) : G } E += b(F) + "</div>"; return E }

    function i(F, E) { return '<div class="c-score__head__total">Total</div>' }

    function C(I, H) { var E = "",
            F, G;
        E += '<div class="c-score__team"><div class="c-score__team__logo">';
        F = t["if"].call(I, (I && I.image), { hash: {}, inverse: r.program(13, A, H), fn: r.program(11, B, H), data: H }); if (F || F === 0) { E += F } E += '</div><div class="c-score__team__name"><span class="c-score__team__market">'; if (G = t.location) { F = G.call(I, { hash: {}, data: H }) } else { G = (I && I.location);
            F = typeof G === c ? G.call(I, { hash: {}, data: H }) : G } E += b(F) + '</span><span class="c-score__team__nick">'; if (G = t.name) { F = G.call(I, { hash: {}, data: H }) } else { G = (I && I.name);
            F = typeof G === c ? G.call(I, { hash: {}, data: H }) : G } E += b(F) + "</span></div></div>"; return E }

    function B(I, H) { var E = "",
            F, G;
        E += '<img class="c-score__team__img" src="'; if (G = t.image) { F = G.call(I, { hash: {}, data: H }) } else { G = (I && I.image);
            F = typeof G === c ? G.call(I, { hash: {}, data: H }) : G } E += b(F) + '">'; return E }

    function A(F, E) { return '<span class="c-score__team__logo__ph">u</span>' }

    function z(H, G) { var E = "",
            F;
        F = t.each.call(H, ((F = ((F = (H && H.score)), F == null || F === false ? F : F.away)), F == null || F === false ? F : F.sequence), { hash: {}, inverse: r.noop, fn: r.program(16, y, G), data: G }); if (F || F === 0) { E += F } F = t["if"].call(H, (H && H.current_count), { hash: {}, inverse: r.noop, fn: r.program(18, x, G), data: G }); if (F || F === 0) { E += F } return E }

    function y(I, H) { var E = "",
            F, G;
        E += '<div class="c-score__item  c-score__item--'; if (G = t.type) { F = G.call(I, { hash: {}, data: H }) } else { G = (I && I.type);
            F = typeof G === c ? G.call(I, { hash: {}, data: H }) : G } E += b(F) + '">'; if (G = t.points) { F = G.call(I, { hash: {}, data: H }) } else { G = (I && I.points);
            F = typeof G === c ? G.call(I, { hash: {}, data: H }) : G } E += b(F) + "</div>"; return E }

    function x(I, H) { var E = "",
            F, G;
        E += '<div class="c-score__line__total">'; if (G = t.away_total) { F = G.call(I, { hash: {}, data: H }) } else { G = (I && I.away_total);
            F = typeof G === c ? G.call(I, { hash: {}, data: H }) : G } E += b(F) + "</div>"; return E }

    function k(H, G) { var E = "",
            F;
        F = t.each.call(H, ((F = ((F = (H && H.score)), F == null || F === false ? F : F.home)), F == null || F === false ? F : F.sequence), { hash: {}, inverse: r.noop, fn: r.program(16, y, G), data: G }); if (F || F === 0) { E += F } F = t["if"].call(H, (H && H.current_count), { hash: {}, inverse: r.noop, fn: r.program(21, h, G), data: G }); if (F || F === 0) { E += F } return E }

    function h(I, H) { var E = "",
            F, G;
        E += '<div class="c-score__line__total">'; if (G = t.home_total) { F = G.call(I, { hash: {}, data: H }) } else { G = (I && I.home_total);
            F = typeof G === c ? G.call(I, { hash: {}, data: H }) : G } E += b(F) + "</div>"; return E }

    function f(I, H) { var E = "",
            G, F;
        E += '<span class="c-score__foot__info">Last updated ' + b((G = t.momentTime || (I && I.momentTime), F = { hash: {}, data: H }, G ? G.call(I, (I && I.updated), F) : s.call(I, "momentTime", (I && I.updated), F))) + "</span>"; return E } u += '<div class="c-score"><div class="c-score__head"><div class="c-score__head__date">';
    j = t["if"].call(v, (v && v.clock), { hash: {}, inverse: r.program(3, p, D), fn: r.program(1, q, D), data: D }); if (j || j === 0) { u += j } u += "</div>";
    j = t["if"].call(v, (v && v.score), { hash: {}, inverse: r.noop, fn: r.program(5, n, D), data: D }); if (j || j === 0) { u += j } u += '</div><div class="c-score__line  c-score__line--vs1"><div class="c-score__line__name">';
    j = t["with"].call(v, (v && v.away_team), { hash: {}, inverse: r.noop, fn: r.program(10, C, D), data: D }); if (j || j === 0) { u += j } u += "</div>";
    j = t["if"].call(v, (v && v.score), { hash: {}, inverse: r.noop, fn: r.program(15, z, D), data: D }); if (j || j === 0) { u += j } u += '</div><div class="c-score__line  c-score__line--vs2" data-vs="@"><div class="c-score__line__name">';
    j = t["with"].call(v, (v && v.home_team), { hash: {}, inverse: r.noop, fn: r.program(10, C, D), data: D }); if (j || j === 0) { u += j } u += "</div>";
    j = t["if"].call(v, (v && v.score), { hash: {}, inverse: r.noop, fn: r.program(20, k, D), data: D }); if (j || j === 0) { u += j } u += '</div><div class="c-score__foot"><div class="c-score__foot__main"><div class="c-score__venue">@ ' + b(((j = ((j = (v && v.venue)), j == null || j === false ? j : j.market)), typeof j === c ? j.apply(v) : j)) + '<span class="c-score__venue__name"> - ' + b(((j = ((j = (v && v.venue)), j == null || j === false ? j : j.name)), typeof j === c ? j.apply(v) : j)) + '</span></div><div class="c-score__foot__more  c-score__opt">';
    j = (a = t.and || (v && v.and), e = { hash: {}, inverse: r.noop, fn: r.program(23, f, D), data: D }, a ? a.call(v, (v && v.updated), ((j = ((j = (v && v.score)), j == null || j === false ? j : j.away)), j == null || j === false ? j : j.sequence), e) : s.call(v, "and", (v && v.updated), ((j = ((j = (v && v.score)), j == null || j === false ? j : j.away)), j == null || j === false ? j : j.sequence), e)); if (j || j === 0) { u += j } u += "</div></div></div></div>"; return u });
this["DDG"]["templates"]["stars"] = Handlebars.template(function(c, k, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, f = "function",
        h = this.escapeExpression;
    g += '<span class="stars  stars--'; if (e = b.rating) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.rating);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + '"><i class="star  stars__1"></i><i class="star  stars__2"></i><i class="star  stars__3"></i><i class="star  stars__4"></i><i class="star  stars__5"></i></span>'; return g });
this["DDG"]["templates"]["subtitle"] = Handlebars.template(function(f, k, e, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    i = i || {}; var a, g = "function",
        h = this.escapeExpression,
        o = this;

    function c(t, s) { var q = "",
            r;
        r = e["if"].call(t, (s == null || s === false ? s : s.index), { hash: {}, inverse: o.noop, fn: o.program(2, b, s), data: s }); if (r || r === 0) { q += r } r = e["if"].call(t, (t && t.href), { hash: {}, inverse: o.program(7, m, s), fn: o.program(4, p, s), data: s }); if (r || r === 0) { q += r } return q }

    function b(r, q) { return '<span class="sep"></span>' }

    function p(u, t) { var q = "",
            r, s;
        q += '<a href="'; if (s = e.href) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.href);
            r = typeof s === g ? s.call(u, { hash: {}, data: t }) : s } q += h(r) + '"';
        r = e["if"].call(u, (u && u.className), { hash: {}, inverse: o.noop, fn: o.program(5, n, t), data: t }); if (r || r === 0) { q += r } q += ">"; if (s = e.text) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.text);
            r = typeof s === g ? s.call(u, { hash: {}, data: t }) : s } q += h(r) + "</a>"; return q }

    function n(u, t) { var q = "",
            r, s;
        q += ' class="'; if (s = e.className) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.className);
            r = typeof s === g ? s.call(u, { hash: {}, data: t }) : s } q += h(r) + '"'; return q }

    function m(r, q) { return h((typeof r === g ? r.apply(r) : r)) } a = e.each.call(k, (k && k.components), { hash: {}, inverse: o.noop, fn: o.program(1, c, i), data: i }); if (a || a === 0) { return a } else { return "" } });
this["DDG"]["templates"]["tile_body"] = Handlebars.template(function(f, s, q, j, t) { this.compilerInfo = [4, ">= 1.0.0"];
    q = this.merge(q, f.helpers);
    t = t || {}; var r = "",
        g, a, e, c = "function",
        b = this.escapeExpression,
        o = this,
        p = q.helperMissing;

    function n(y, x) { var u = "",
            v;
        u += "has-foot ";
        v = q["if"].call(y, (y && y.footLines), { hash: {}, inverse: o.noop, fn: o.program(2, m, x), data: x }); if (v || v === 0) { u += v } return u }

    function m(z, y) { var u = "",
            v, x;
        u += "has-foot--"; if (x = q.footLines) { v = x.call(z, { hash: {}, data: y }) } else { x = (z && z.footLines);
            v = typeof x === c ? x.call(z, { hash: {}, data: y }) : x } u += b(v); return u }

    function k(z, y) { var v, x, u;
        v = (x = q.include || (z && z.include), u = { hash: {}, data: y }, x ? x.call(z, "tile_snippet", u) : p.call(z, "include", "tile_snippet", u)); if (v || v === 0) { return v } else { return "" } }

    function i(A, z) { var u = "",
            x, y, v;
        u += '<div class="tile__foot ';
        x = q["if"].call(A, (A && A.footLines), { hash: {}, inverse: o.noop, fn: o.program(7, h, z), data: z }); if (x || x === 0) { u += x } u += '">';
        x = (y = q.include || (A && A.include), v = { hash: {}, data: z }, y ? y.call(A, (A && A.footer_content), v) : p.call(A, "include", (A && A.footer_content), v)); if (x || x === 0) { u += x } u += "</div>"; return u }

    function h(z, y) { var u = "",
            v, x;
        u += "tile__foot--"; if (x = q.footLines) { v = x.call(z, { hash: {}, data: y }) } else { x = (z && z.footLines);
            v = typeof x === c ? x.call(z, { hash: {}, data: y }) : x } u += b(v); return u } r += '<div class="tile__body ';
    g = q["if"].call(s, (s && s.footer_content), { hash: {}, inverse: o.noop, fn: o.program(1, n, t), data: t }); if (g || g === 0) { r += g } r += '">';
    g = (a = q.include || (s && s.include), e = { hash: {}, data: t }, a ? a.call(s, "tile_titles", e) : p.call(s, "include", "tile_titles", e)); if (g || g === 0) { r += g } g = q["if"].call(s, (s && s.description), { hash: {}, inverse: o.noop, fn: o.program(4, k, t), data: t }); if (g || g === 0) { r += g } g = q["if"].call(s, (s && s.footer_content), { hash: {}, inverse: o.noop, fn: o.program(6, i, t), data: t }); if (g || g === 0) { r += g } r += "</div>"; return r });
this["DDG"]["templates"]["tile_snippet"] = Handlebars.template(function(f, o, e, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    k = k || {}; var i = "",
        b, g, q, h = "function",
        j = this.escapeExpression,
        p = this,
        n = e.helperMissing;

    function c(s, r) { return " tile__content--sm " }

    function a(t, s) { var r; return j(((r = ((r = ((r = (t && t.meta)), r == null || r === false ? r : r.elClass)), r == null || r === false ? r : r.tileSnippet)), typeof r === h ? r.apply(t) : r)) } i += '<div class="tile__content ';
    b = e.unless.call(o, ((b = ((b = (o && o.meta)), b == null || b === false ? b : b.elClass)), b == null || b === false ? b : b.tileSnippet), { hash: {}, inverse: p.program(3, a, k), fn: p.program(1, c, k), data: k }); if (b || b === 0) { i += b } i += '">' + j((g = e.ellipsis || (o && o.ellipsis), q = { hash: { fallback: (55) }, data: k }, g ? g.call(o, (o && o.description), ((b = (o && o.meta)), b == null || b === false ? b : b.snippetChars), q) : n.call(o, "ellipsis", (o && o.description), ((b = (o && o.meta)), b == null || b === false ? b : b.snippetChars), q))) + "</div>"; return i });
this["DDG"]["templates"]["tile_titles"] = Handlebars.template(function(f, r, p, j, x) { this.compilerInfo = [4, ">= 1.0.0"];
    p = this.merge(p, f.helpers);
    x = x || {}; var q = "",
        g, a, o = p.helperMissing,
        b = this.escapeExpression,
        c = "function",
        n = this;

    function m(D, C) { var y = "",
            A, B, z;
        y += '<img src="' + b((B = p.imageProxy || (D && D.imageProxy), z = { hash: {}, data: C }, B ? B.call(D, (D && D.icon), z) : o.call(D, "imageProxy", (D && D.icon), z))) + '" alt="'; if (B = p.title) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.title);
            A = typeof B === c ? B.call(D, { hash: {}, data: C }) : B } y += b(A) + '" class="tile__icon" />'; return y }

    function k(C, B) { var y = "",
            z, A;
        y += '<span class="tile__icon  tile__icon--pin">'; if (A = p.num) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.num);
            z = typeof A === c ? A.call(C, { hash: {}, data: B }) : A } y += b(z) + "</span>"; return y }

    function i(z, y) { return "with-sub" }

    function h(z, y) { return "has-sub--a" }

    function e(C, B) { var y = "",
            z, A;
        y += 'a href="'; if (A = p.url) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.url);
            z = typeof A === c ? A.call(C, { hash: {}, data: B }) : A } y += b(z) + '"'; return y }

    function v(z, y) { return "span" }

    function u(z, y) { return "a" }

    function t(D, C) { var y = "",
            A, B, z;
        y += '<span class="tile__title__sub ' + b(((A = ((A = ((A = (D && D.meta)), A == null || A === false ? A : A.elClass)), A == null || A === false ? A : A.tileAltSubtitle)), typeof A === c ? A.apply(D) : A)) + " "; if (B = p.altSubClass) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.altSubClass);
            A = typeof B === c ? B.call(D, { hash: {}, data: C }) : B } y += b(A) + '">';
        A = (B = p.formatSubtitle || (D && D.formatSubtitle), z = { hash: {}, data: C }, B ? B.call(D, (D && D.altSubtitle), z) : o.call(D, "formatSubtitle", (D && D.altSubtitle), z)); if (A || A === 0) { y += A } y += "</span>"; return y }

    function s(D, C) { var y = "",
            A, B, z;
        y += '<span class="tile__sub ' + b(((A = ((A = ((A = (D && D.meta)), A == null || A === false ? A : A.elClass)), A == null || A === false ? A : A.tileSubtitle)), typeof A === c ? A.apply(D) : A)) + " "; if (B = p.subClass) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.subClass);
            A = typeof B === c ? B.call(D, { hash: {}, data: C }) : B } y += b(A) + '">';
        A = (B = p.formatSubtitle || (D && D.formatSubtitle), z = { hash: {}, data: C }, B ? B.call(D, (D && D.subtitle), z) : o.call(D, "formatSubtitle", (D && D.subtitle), z)); if (A || A === 0) { y += A } y += "</span>"; return y } g = p["if"].call(r, (r && r.icon), { hash: {}, inverse: n.noop, fn: n.program(1, m, x), data: x }); if (g || g === 0) { q += g } g = p["if"].call(r, (r && r.showPin), { hash: {}, inverse: n.noop, fn: n.program(3, k, x), data: x }); if (g || g === 0) { q += g } q += '<h5 class="tile__title ';
    g = p["if"].call(r, (r && r.subtitle), { hash: {}, inverse: n.noop, fn: n.program(5, i, x), data: x }); if (g || g === 0) { q += g } q += " ";
    g = p["if"].call(r, (r && r.altSubtitle), { hash: {}, inverse: n.noop, fn: n.program(7, h, x), data: x }); if (g || g === 0) { q += g } q += " " + b(((g = ((g = ((g = (r && r.meta)), g == null || g === false ? g : g.elClass)), g == null || g === false ? g : g.tileTitle)), typeof g === c ? g.apply(r) : g)) + " "; if (a = p.titleClass) { g = a.call(r, { hash: {}, data: x }) } else { a = (r && r.titleClass);
        g = typeof a === c ? a.call(r, { hash: {}, data: x }) : a } q += b(g) + '"><';
    g = p["if"].call(r, (r && r.url), { hash: {}, inverse: n.program(11, v, x), fn: n.program(9, e, x), data: x }); if (g || g === 0) { q += g } q += ' class="tile__title__main">'; if (a = p.title) { g = a.call(r, { hash: {}, data: x }) } else { a = (r && r.title);
        g = typeof a === c ? a.call(r, { hash: {}, data: x }) : a } q += b(g) + "</";
    g = p["if"].call(r, (r && r.url), { hash: {}, inverse: n.program(11, v, x), fn: n.program(13, u, x), data: x }); if (g || g === 0) { q += g } q += ">";
    g = p["if"].call(r, (r && r.altSubtitle), { hash: {}, inverse: n.noop, fn: n.program(15, t, x), data: x }); if (g || g === 0) { q += g } q += "</h5>";
    g = p["if"].call(r, (r && r.subtitle), { hash: {}, inverse: n.noop, fn: n.program(17, s, x), data: x }); if (g || g === 0) { q += g } return q });
this["DDG"]["templates"]["title"] = Handlebars.template(function(f, n, e, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    k = k || {}; var i = "",
        b, g, h = "function",
        j = this.escapeExpression,
        r = this;

    function c(u, t) { return "has-sub" }

    function a(y, x) { var t = "",
            u, v;
        t += '<a href="'; if (v = e.href) { u = v.call(y, { hash: {}, data: x }) } else { v = (y && y.href);
            u = typeof v === h ? v.call(y, { hash: {}, data: x }) : v } t += j(u) + '" ';
        u = e["if"].call(y, (y && y.hrefTitle), { hash: {}, inverse: r.noop, fn: r.program(4, s, x), data: x }); if (u || u === 0) { t += u } t += ">"; return t }

    function s(y, x) { var t = "",
            u, v;
        t += 'title="'; if (v = e.hrefTitle) { u = v.call(y, { hash: {}, data: x }) } else { v = (y && y.hrefTitle);
            u = typeof v === h ? v.call(y, { hash: {}, data: x }) : v } t += j(u) + '"'; return t }

    function q(u, t) { return "</a>" }

    function p(y, x) { var t = "",
            u, v;
        t += '<span class="'; if (v = e.className) { u = v.call(y, { hash: {}, data: x }) } else { v = (y && y.className);
            u = typeof v === h ? v.call(y, { hash: {}, data: x }) : v } t += j(u) + "__sub ";
        u = e["if"].call(y, (y && y.optSub), { hash: {}, inverse: r.noop, fn: r.program(9, o, x), data: x }); if (u || u === 0) { t += u } t += '">'; if (v = e.subTitle) { u = v.call(y, { hash: {}, data: x }) } else { v = (y && y.subTitle);
            u = typeof v === h ? v.call(y, { hash: {}, data: x }) : v } if (u || u === 0) { t += u } t += "</span>"; return t }

    function o(u, t) { return "opt" } i += "<"; if (g = e.tagName) { b = g.call(n, { hash: {}, data: k }) } else { g = (n && n.tagName);
        b = typeof g === h ? g.call(n, { hash: {}, data: k }) : g } i += j(b) + ' class="'; if (g = e.className) { b = g.call(n, { hash: {}, data: k }) } else { g = (n && n.className);
        b = typeof g === h ? g.call(n, { hash: {}, data: k }) : g } i += j(b) + " "; if (g = e.classNameSec) { b = g.call(n, { hash: {}, data: k }) } else { g = (n && n.classNameSec);
        b = typeof g === h ? g.call(n, { hash: {}, data: k }) : g } i += j(b) + " ";
    b = e["if"].call(n, (n && n.subTitle), { hash: {}, inverse: r.noop, fn: r.program(1, c, k), data: k }); if (b || b === 0) { i += b } i += '">';
    b = e["if"].call(n, (n && n.href), { hash: {}, inverse: r.noop, fn: r.program(3, a, k), data: k }); if (b || b === 0) { i += b } if (g = e.title) { b = g.call(n, { hash: {}, data: k }) } else { g = (n && n.title);
        b = typeof g === h ? g.call(n, { hash: {}, data: k }) : g } if (b || b === 0) { i += b } b = e["if"].call(n, (n && n.href), { hash: {}, inverse: r.noop, fn: r.program(6, q, k), data: k }); if (b || b === 0) { i += b } b = e["if"].call(n, (n && n.subTitle), { hash: {}, inverse: r.noop, fn: r.program(8, p, k), data: k }); if (b || b === 0) { i += b } i += "</"; if (g = e.tagName) { b = g.call(n, { hash: {}, data: k }) } else { g = (n && n.tagName);
        b = typeof g === h ? g.call(n, { hash: {}, data: k }) : g } i += j(b) + ">"; return i });
this["DDG"] = this["DDG"] || {};
this["DDG"]["templates"] = this["DDG"]["templates"] || {};
this["DDG"]["templates"]["about_header"] = Handlebars.template(function(f, m, e, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    i = i || {}; var g = "",
        b, k = e.helperMissing,
        h = this.escapeExpression,
        n = this;

    function c(p, o) { return "module__header--with-image" }

    function a(t, s) { var o = "",
            q, r, p;
        o += '<div class="module__header__image js-about-header-image" style="background-image:url(\'' + h((r = e.imageProxy || (t && t.imageProxy), p = { hash: {}, data: s }, r ? r.call(t, (t && t.imageURL), p) : k.call(t, "imageProxy", (t && t.imageURL), p))) + '\');"><img class="module__header__image__img" src="' + h((r = e.imageProxy || (t && t.imageProxy), p = { hash: {}, data: s }, r ? r.call(t, (t && t.imageURL), p) : k.call(t, "imageProxy", (t && t.imageURL), p))) + '" /><span class="label module__header__image__more">';
        q = (r = e.l || (t && t.l), p = { hash: {}, data: s }, r ? r.call(t, "More Images", p) : k.call(t, "l", "More Images", p)); if (q || q === 0) { o += q } o += "</span></div>"; return o } g += '<div class="module__header ';
    b = e["if"].call(m, (m && m.imageURL), { hash: {}, inverse: n.noop, fn: n.program(1, c, i), data: i }); if (b || b === 0) { g += b } g += '">';
    b = e["if"].call(m, (m && m.imageURL), { hash: {}, inverse: n.noop, fn: n.program(3, a, i), data: i }); if (b || b === 0) { g += b } g += '<div class="module__header__map js-about-header-map"></div><div class="module__header__shadow"></div></div>'; return g });
this["DDG"]["templates"]["about_infobox"] = Handlebars.template(function(g, n, f, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    f = this.merge(f, g.helpers);
    k = k || {}; var i = "",
        b, o = this,
        h = "function",
        j = this.escapeExpression;

    function e(r, q) { var p;
        p = f["if"].call(r, (r && r.label), { hash: {}, inverse: o.noop, fn: o.program(2, c, q), data: q }); if (p || p === 0) { return p } else { return "" } }

    function c(t, s) { var p = "",
            q, r;
        p += '<div class="about-info-box__info-row';
        q = f.unless.call(t, (t && t.visible), { hash: {}, inverse: o.noop, fn: o.program(3, a, s), data: s }); if (q || q === 0) { p += q } p += '"><span class="about-info-box__info-label">'; if (r = f.label) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.label);
            q = typeof r === h ? r.call(t, { hash: {}, data: s }) : r } p += j(q) + ':</span><span class="about-info-box__info-value">'; if (r = f.value) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.value);
            q = typeof r === h ? r.call(t, { hash: {}, data: s }) : r } p += j(q) + "</span></div>"; return p }

    function a(q, p) { return " is-hidden" } i += '<div class="about-info-box">';
    b = f.each.call(n, (n && n.items), { hash: {}, inverse: o.noop, fn: o.program(1, e, k), data: k }); if (b || b === 0) { i += b } i += "</div>"; return i });
this["DDG"]["templates"]["about_item"] = Handlebars.template(function(e, r, p, i, v) { this.compilerInfo = [4, ">= 1.0.0"];
    p = this.merge(p, e.helpers);
    v = v || {}; var q = "",
        g, a, c = "function",
        b = this.escapeExpression,
        o = p.helperMissing,
        n = this;

    function m(C, B) { var x = "",
            z, A, y;
        x += '<a href="'; if (A = p.AbstractURL) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.AbstractURL);
            z = typeof A === c ? A.call(C, { hash: {}, data: B }) : A } x += b(z) + '" class="module__clickable-header js-about-item-clickable-header"><div class="module__link module__link--blue module__link--two-line tx--bold">'; if (A = p.title) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.title);
            z = typeof A === c ? A.call(C, { hash: {}, data: B }) : A } x += b(z) + '</div><div class="module__link module__link--url">';
        z = (A = p.favicon || (C && C.favicon), y = { hash: {}, data: B }, A ? A.call(C, (C && C.AbstractURL), y) : o.call(C, "favicon", (C && C.AbstractURL), y)); if (z || z === 0) { x += z } if (A = p.AbstractURL) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.AbstractURL);
            z = typeof A === c ? A.call(C, { hash: {}, data: B }) : A } x += b(z) + "</div></a>"; return x }

    function k(z, y) { var x;
        x = p["if"].call(z, (z && z.Image), { hash: {}, inverse: n.noop, fn: n.program(4, j, y), data: y }); if (x || x === 0) { return x } else { return "" } }

    function j(C, B) { var x = "",
            z, A, y;
        x += '<a class="module__image" href="'; if (A = p.AbstractURL) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.AbstractURL);
            z = typeof A === c ? A.call(C, { hash: {}, data: B }) : A } x += b(z) + '" class="js-about-item-link" title="';
        z = (A = p.l || (C && C.l), y = { hash: {}, data: B }, A ? A.call(C, "More at %s ", (C && C.moreAtText), y) : o.call(C, "l", "More at %s ", (C && C.moreAtText), y)); if (z || z === 0) { x += z } x += '"><img src="'; if (A = p.Image) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.Image);
            z = typeof A === c ? A.call(C, { hash: {}, data: B }) : A } if (z || z === 0) { x += z } x += '" align="right" class="module--about__img"></a>'; return x }

    function h(B, A) { var x = "",
            y, z;
        x += '<div class="module__title js-about-item-title"><span class="module__title__link">'; if (z = p.title) { y = z.call(B, { hash: {}, data: A }) } else { z = (B && B.title);
            y = typeof z === c ? z.call(B, { hash: {}, data: A }) : z } x += b(y) + "</span></div>"; return x }

    function f(B, A) { var x = "",
            y, z;
        x += '<span class="module__title__sub">'; if (z = p.subTitle) { y = z.call(B, { hash: {}, data: A }) } else { z = (B && B.subTitle);
            y = typeof z === c ? z.call(B, { hash: {}, data: A }) : z } x += b(y) + "</span>"; return x }

    function u(C, B) { var x = "",
            z, A, y;
        x += '<a href="'; if (A = p.OfficialUrl) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.OfficialUrl);
            z = typeof A === c ? A.call(C, { hash: {}, data: B }) : A } x += b(z) + '" class="module__official-url js-about-item-link">' + b((A = p.domainWithPath || (C && C.domainWithPath), y = { hash: {}, data: B }, A ? A.call(C, (C && C.OfficialUrl), y) : o.call(C, "domainWithPath", (C && C.OfficialUrl), y))) + "</a>"; return x }

    function t(y, x) { return " module__text--no-padding" }

    function s(C, B) { var x = "",
            z, A, y;
        x += '<a href="'; if (A = p.AbstractURL) { z = A.call(C, { hash: {}, data: B }) } else { A = (C && C.AbstractURL);
            z = typeof A === c ? A.call(C, { hash: {}, data: B }) : A } x += b(z) + '" class="module__more-at-bottom is-hidden js-about-item-more-at-bottom">';
        z = (A = p.favicon || (C && C.favicon), y = { hash: {}, data: B }, A ? A.call(C, (C && C.AbstractURL), y) : o.call(C, "favicon", (C && C.AbstractURL), y)); if (z || z === 0) { x += z } z = (A = p.l || (C && C.l), y = { hash: {}, data: B }, A ? A.call(C, "More at %s ", (C && C.moreAtText), y) : o.call(C, "l", "More at %s ", (C && C.moreAtText), y)); if (z || z === 0) { x += z } x += "</a>"; return x } q += '<div class="module__body js-about-item">';
    g = p["if"].call(r, (r && r.hasClickableHeader), { hash: {}, inverse: n.noop, fn: n.program(1, m, v), data: v }); if (g || g === 0) { q += g } g = p.unless.call(r, (r && r.headerImage), { hash: {}, inverse: n.noop, fn: n.program(3, k, v), data: v }); if (g || g === 0) { q += g } g = p.unless.call(r, (r && r.hasClickableHeader), { hash: {}, inverse: n.noop, fn: n.program(6, h, v), data: v }); if (g || g === 0) { q += g } g = p["if"].call(r, (r && r.subTitle), { hash: {}, inverse: n.noop, fn: n.program(8, f, v), data: v }); if (g || g === 0) { q += g } g = p["if"].call(r, (r && r.OfficialUrl), { hash: {}, inverse: n.noop, fn: n.program(10, u, v), data: v }); if (g || g === 0) { q += g } q += '<div class="module__text';
    g = p["if"].call(r, (r && r.hasClickableHeader), { hash: {}, inverse: n.noop, fn: n.program(12, t, v), data: v }); if (g || g === 0) { q += g } q += '"><span class="js-about-item-abstr"></span><a href="'; if (a = p.AbstractURL) { g = a.call(r, { hash: {}, data: v }) } else { a = (r && r.AbstractURL);
        g = typeof a === c ? a.call(r, { hash: {}, data: v }) : a } q += b(g) + '" class="module__more-at is-hidden js-about-item-more-at-inline tx--bold">'; if (a = p.moreAtText) { g = a.call(r, { hash: {}, data: v }) } else { a = (r && r.moreAtText);
        g = typeof a === c ? a.call(r, { hash: {}, data: v }) : a } q += b(g) + "</a>";
    g = p.unless.call(r, (r && r.hasClickableHeader), { hash: {}, inverse: n.noop, fn: n.program(14, s, v), data: v }); if (g || g === 0) { q += g } q += "</div></div>"; return q });
this["DDG"]["templates"]["about_module"] = Handlebars.template(function(f, m, e, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    j = j || {}; var h = "",
        b, n = this,
        g = "function",
        i = this.escapeExpression;

    function c(q, p) { return " has-content-height" }

    function a(s, r) { var p = "",
            q;
        p += '<div class="module__toggle js-about-module-toggle"';
        q = e.unless.call(s, (s && s.hasContentHeight), { hash: {}, inverse: n.noop, fn: n.program(4, o, r), data: r }); if (q || q === 0) { p += q } p += '><div class="module__toggle--more js-about-module-more"><span class="module__toggle__chevron">v</span></div><div class="module__toggle--less js-about-module-less"><span class="module__toggle__chevron module__toggle__chevron--collapse">v</span></div></div>'; return p }

    function o(q, p) { return ' aria-hidden="true"' } h += '<div class="module module--about module--zci-' + i(((b = ((b = (m && m.meta)), b == null || b === false ? b : b.id)), typeof b === g ? b.apply(m) : b)) + " js-module--" + i(((b = ((b = (m && m.meta)), b == null || b === false ? b : b.id)), typeof b === g ? b.apply(m) : b)) + " js-about-module";
    b = e["if"].call(m, (m && m.hasContentHeight), { hash: {}, inverse: n.noop, fn: n.program(1, c, j), data: j }); if (b || b === 0) { h += b } h += '"><div class="module__content js-about-module-content"></div>';
    b = e.unless.call(m, (m && m.isMapExpanded), { hash: {}, inverse: n.noop, fn: n.program(3, a, j), data: j }); if (b || b === 0) { h += b } h += "</div>"; return h });
this["DDG"]["templates"]["about_profiles"] = Handlebars.template(function(e, m, c, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    i = i || {}; var g = "",
        a, f = "function",
        h = this.escapeExpression,
        k = c.helperMissing,
        n = this;

    function b(t, s) { var o = "",
            q, r, p;
        o += '<li class="about-profiles__item"><a class="about-profiles__link module__link js-about-profile-link" href="'; if (r = c.url) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.url);
            q = typeof r === f ? r.call(t, { hash: {}, data: s }) : r } o += h(q) + '" title="'; if (r = c.name) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.name);
            q = typeof r === f ? r.call(t, { hash: {}, data: s }) : r } o += h(q) + '"><img class="about-profiles__img" src="';
        q = (r = c.imageProxy || (t && t.imageProxy), p = { hash: {}, data: s }, r ? r.call(t, (t && t.iconURL), p) : k.call(t, "imageProxy", (t && t.iconURL), p)); if (q || q === 0) { o += q } o += '" />'; if (r = c.name) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.name);
            q = typeof r === f ? r.call(t, { hash: {}, data: s }) : r } o += h(q) + "</a></li>"; return o } g += '<ul class="about-profiles">';
    a = c.each.call(m, (m && m.links), { hash: {}, inverse: n.noop, fn: n.program(1, b, i), data: i }); if (a || a === 0) { g += a } g += "</ul>"; return g });
this["DDG"]["templates"]["ad_badge"] = Handlebars.template(function(c, j, b, h, g) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    g = g || {}; var f = "",
        a, e, k, i = b.helperMissing;
    f += '<span class="badge--ad-wrap">&nbsp;<a href="https://help.duckduckgo.com/company/advertising-and-affiliates/" class="badge--ad js-badge--ad">';
    a = (e = b.l || (j && j.l), k = { hash: {}, data: g }, e ? e.call(j, "Ad", k) : i.call(j, "l", "Ad", k)); if (a || a === 0) { f += a } f += "</a></span>"; return f });
this["DDG"]["templates"]["address_detail"] = Handlebars.template(function(f, n, e, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    k = k || {}; var i = "",
        b, g, h = "function",
        j = this.escapeExpression,
        p = this;

    function c(s, r) { return "address-detail--apple-device" }

    function a(t, s) { var r;
        r = e.each.call(t, (t && t.addressLines), { hash: {}, inverse: p.noop, fn: p.program(4, q, s), data: s }); if (r || r === 0) { return r } else { return "" } }

    function q(t, s) { var r = "";
        r += '<p class="address-detail__address js-address-detail-address">' + j((typeof t === h ? t.apply(t) : t)) + "</p>"; return r }

    function o(v, u) { var r = "",
            s, t;
        r += '<p class="address-detail__latlon js-address-detail-address">'; if (t = e.displayLatLon) { s = t.call(v, { hash: {}, data: u }) } else { t = (v && v.displayLatLon);
            s = typeof t === h ? t.call(v, { hash: {}, data: u }) : t } r += j(s) + "</p>"; return r } i += '<div class="address-detail ';
    b = e["if"].call(n, (n && n.mapkitAppleDevice), { hash: {}, inverse: p.noop, fn: p.program(1, c, k), data: k }); if (b || b === 0) { i += b } i += '"><div class="module__title address-detail__title js-address-detail-title"><div class="address-detail__links"><h1 class="address-detail__name js-address-detail-address">'; if (g = e.name) { b = g.call(n, { hash: {}, data: k }) } else { g = (n && n.name);
        b = typeof g === h ? g.call(n, { hash: {}, data: k }) : g } i += j(b) + "</h1>";
    b = e["if"].call(n, (n && n.addressLines), { hash: {}, inverse: p.noop, fn: p.program(3, a, k), data: k }); if (b || b === 0) { i += b } b = e["if"].call(n, (n && n.displayLatLon), { hash: {}, inverse: p.noop, fn: p.program(6, o, k), data: k }); if (b || b === 0) { i += b } i += "</div></div></div>"; return i });
this["DDG"]["templates"]["answerbar_tabs"] = Handlebars.template(function(e, f, b, a, c) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, e.helpers);
    c = c || {}; return '<div class="zcm"><ul class="zcm__menu zcm__constant" id="duckbar_static"></ul><ul class="zcm__menu zcm__dynamic" id="duckbar_new"><span id="duckbar_dynamic_sep" class="zcm__sep--h sep--before is-hidden"></span></ul></div>' });
this["DDG"]["templates"]["answerbar_tabs_settings"] = Handlebars.template(function(e, f, b, a, c) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, e.helpers);
    c = c || {}; return '<div class="zcm expset"><ul class="zcm__menu zcm__constant" id="duckbar_static"></ul><ul class="zcm__menu zcm__dynamic" id="duckbar_new"><span id="duckbar_dynamic_sep" class="zcm__sep--h sep--before is-hidden"></span></ul><ul class="zcm__menu js-duckbar-dropdowns" id="duckbar_dropdowns"></ul></div>' });
this["DDG"]["templates"]["directions_button"] = Handlebars.template(function(c, m, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, n, f = "function",
        h = this.escapeExpression,
        k = b.helperMissing;
    g += '<div class="dir-btn"><a class="dir-btn__link btn btn--secondary js-dir-btn-link" href="'; if (e = b.directionsURL) { a = e.call(m, { hash: {}, data: i }) } else { e = (m && m.directionsURL);
        a = typeof e === f ? e.call(m, { hash: {}, data: i }) : e } g += h(a) + '" title="'; if (e = b.directionsTitle) { a = e.call(m, { hash: {}, data: i }) } else { e = (m && m.directionsTitle);
        a = typeof e === f ? e.call(m, { hash: {}, data: i }) : e } g += h(a) + '">';
    a = (e = b.lp || (m && m.lp), n = { hash: {}, data: i }, e ? e.call(m, "maps_places", "Directions", n) : k.call(m, "lp", "maps_places", "Directions", n)); if (a || a === 0) { g += a } g += "</a></div>"; return g });
this["DDG"]["templates"]["feedback_button"] = Handlebars.template(function(e, k, c, i, h) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    h = h || {}; var g = "",
        a, f, n, j = c.helperMissing,
        m = this;

    function b(p, o) { return '<div class="feedback-btn__icon-wrap is-hidden js-feedback-icon-wrap"><a href="#" class="feedback-btn__icon ddgsi feedback-btn__icon--love js-feedback-love"></a><a href="#" class="feedback-btn__icon ddgsi feedback-btn__icon--nolove js-feedback-nolove"></a></div>' } g += '<div class="btn feedback-btn"><a href="#" class="feedback-btn__send js-feedback-start">';
    a = (f = c.lp || (k && k.lp), n = { hash: {}, data: h }, f ? f.call(k, "feedback form", "Send feedback", n) : j.call(k, "lp", "feedback form", "Send feedback", n)); if (a || a === 0) { g += a } g += "</a>";
    a = c.unless.call(k, (k && k.noFaces), { hash: {}, inverse: m.noop, fn: m.program(1, b, h), data: h }); if (a || a === 0) { g += a } g += "</div>"; return g });
this["DDG"]["templates"]["feedback_issue_list"] = Handlebars.template(function(e, j, c, i, h) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    h = h || {}; var a, f = "function",
        g = this.escapeExpression,
        k = this;

    function b(q, p) { var m = "",
            n, o;
        m += '<label class="feedback-modal__radio"><input class="js-feedback-radio feedback-modal__radio__input" type="radio" value="'; if (o = c.val) { n = o.call(q, { hash: {}, data: p }) } else { o = (q && q.val);
            n = typeof o === f ? o.call(q, { hash: {}, data: p }) : o } m += g(n) + '" name="feedback-issues"/>'; if (o = c.text) { n = o.call(q, { hash: {}, data: p }) } else { o = (q && q.text);
            n = typeof o === f ? o.call(q, { hash: {}, data: p }) : o } m += g(n) + "</label>"; return m } a = c.each.call(j, (j && j.issues), { hash: {}, inverse: k.noop, fn: k.program(1, b, h), data: h }); if (a || a === 0) { return a } else { return "" } });
this["DDG"]["templates"]["feedback_modal"] = Handlebars.template(function(f, s, q, k, t) { this.compilerInfo = [4, ">= 1.0.0"];
    q = this.merge(q, f.helpers);
    t = t || {}; var r = "",
        h, a, e, p = q.helperMissing,
        c = "function",
        b = this.escapeExpression,
        o = this;

    function n(A, z) { var u = "",
            x, y, v;
        u += '<span class="feedback-modal__heading__prompt has-category">';
        x = (y = q.lp || (A && A.lp), v = { hash: {}, data: z }, y ? y.call(A, "feedback form", "Send feedback for:", v) : p.call(A, "lp", "feedback form", "Send feedback for:", v)); if (x || x === 0) { u += x } u += '<span class="feedback-modal__heading__category"> '; if (y = q.defaultCategory) { x = y.call(A, { hash: {}, data: z }) } else { y = (A && A.defaultCategory);
            x = typeof y === c ? y.call(A, { hash: {}, data: z }) : y } u += b(x) + "</span></span>"; return u }

    function m(A, z) { var u = "",
            x, y, v;
        u += '<span class="feedback-modal__heading__prompt">';
        x = (y = q.lp || (A && A.lp), v = { hash: {}, data: z }, y ? y.call(A, "feedback form", "Send feedback for:", v) : p.call(A, "lp", "feedback form", "Send feedback for:", v)); if (x || x === 0) { u += x } u += '</span><span class="feedback-modal__heading__query">'; if (y = q.query) { x = y.call(A, { hash: {}, data: z }) } else { y = (A && A.query);
            x = typeof y === c ? y.call(A, { hash: {}, data: z }) : y } u += b(x) + "</span>"; return u }

    function j(v, u) { return '<div class="frm__label feedback-modal__label">What do you think?</div>' }

    function i(y, x) { var u = "",
            v;
        u += '<div class="frm__label feedback-modal__label js-feedback-suggestion-label"></div><div class="frm__select feedback-modal__input feedback-modal__input--dropdown"><select class="js-feedback-dropdown">';
        v = q.each.call(y, (y && y.options), { hash: {}, inverse: o.noop, fn: o.program(8, g, x), data: x }); if (v || v === 0) { u += v } u += "</select></div>"; return u }

    function g(z, y) { var u = "",
            v, x;
        u += '<option value="'; if (x = q.val) { v = x.call(z, { hash: {}, data: y }) } else { x = (z && z.val);
            v = typeof x === c ? x.call(z, { hash: {}, data: y }) : x } u += b(v) + '">'; if (x = q.text) { v = x.call(z, { hash: {}, data: y }) } else { x = (z && z.text);
            v = typeof x === c ? x.call(z, { hash: {}, data: y }) : x } u += b(v) + "</option>"; return u } r += '<div class="modal modal--popover  modal--popover--gray feedback-modal"><a href="#" class="modal__overlay  js-modal-close"></a><div class="modal__wrap modal__wrap--feedback"><div class="modal__box modal__box--feedback"><div class="modal__box__content js-feedback-form"><h5 class="feedback-modal__heading">';
    h = q["if"].call(s, (s && s.defaultCategory), { hash: {}, inverse: o.program(3, m, t), fn: o.program(1, n, t), data: t }); if (h || h === 0) { r += h } r += '</h5><div class="frm frm--feedback">';
    h = q["if"].call(s, (s && s.defaultCategory), { hash: {}, inverse: o.program(7, i, t), fn: o.program(5, j, t), data: t }); if (h || h === 0) { r += h } r += '<div class="js-feedback-issues is-invisible feedback-modal__issues is-invisible"></div><textarea placeholder="';
    h = (a = q.l || (s && s.l), e = { hash: {}, data: t }, a ? a.call(s, "Feedback", e) : p.call(s, "l", "Feedback", e)); if (h || h === 0) { r += h } r += '" class="frm__text is-hidden feedback-modal__input feedback-modal__input--text js-feedback-suggestion"></textarea><a href="#" class="feedback-modal__submit is-disabled btn btn--primary--alt js-feedback-submit">';
    h = (a = q.l || (s && s.l), e = { hash: {}, data: t }, a ? a.call(s, "Submit", e) : p.call(s, "l", "Submit", e)); if (h || h === 0) { r += h } r += '</a><a href="#" class="modal__close  js-modal-close">X</a></div></div><div class="modal__box__content js-feedback-success"><h5 class="feedback-modal__heading feedback-modal__heading--success">';
    h = (a = q.lp || (s && s.lp), e = { hash: {}, data: t }, a ? a.call(s, "feedback form", "Feedback Sent", e) : p.call(s, "lp", "feedback form", "Feedback Sent", e)); if (h || h === 0) { r += h } r += '</h5><p class="feedback-modal__message">';
    h = (a = q.l || (s && s.l), e = { hash: {}, data: t }, a ? a.call(s, "Thank you!", e) : p.call(s, "l", "Thank you!", e)); if (h || h === 0) { r += h } r += " ";
    h = (a = q.lp || (s && s.lp), e = { hash: {}, data: t }, a ? a.call(s, "feedback form", "We use feedback like this to improve DuckDuckGo. It really helps.", e) : p.call(s, "lp", "feedback form", "We use feedback like this to improve DuckDuckGo. It really helps.", e)); if (h || h === 0) { r += h } r += '</p><a href="#"  class="modal__close  js-modal-close">X</a></div></div></div></div>'; return r });
this["DDG"]["templates"]["feedback_prompt"] = Handlebars.template(function(f, m, e, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    i = i || {}; var b, g = "function",
        h = this.escapeExpression,
        k = e.helperMissing,
        n = this;

    function c(t, s) { var o = "",
            q, r, p;
        o += '<p class="feedback-prompt">'; if (r = e.promptText) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.promptText);
            q = typeof r === g ? r.call(t, { hash: {}, data: s }) : r } o += h(q) + ' <a href="#" class="feedback-prompt__link js-feedback-prompt-yes">';
        q = (r = e.l || (t && t.l), p = { hash: {}, data: s }, r ? r.call(t, "Yes", p) : k.call(t, "l", "Yes", p)); if (q || q === 0) { o += q } o += '</a><a href="#" class="feedback-prompt__link js-feedback-prompt-no">';
        q = (r = e.l || (t && t.l), p = { hash: {}, data: s }, r ? r.call(t, "No", p) : k.call(t, "l", "No", p)); if (q || q === 0) { o += q } o += "</a></p>"; return o }

    function a(t, s) { var o = "",
            q, r, p;
        o += '<p class="feedback-prompt"><a href="#" class="feedback-prompt__link js-feedback-prompt-no">';
        q = (r = e.l || (t && t.l), p = { hash: {}, data: s }, r ? r.call(t, "Feedback", p) : k.call(t, "l", "Feedback", p)); if (q || q === 0) { o += q } o += "</a></p>"; return o } b = e["if"].call(m, (m && m.showYesNo), { hash: {}, inverse: n.program(3, a, i), fn: n.program(1, c, i), data: i }); if (b || b === 0) { return b } else { return "" } });
this["DDG"]["templates"]["footer"] = Handlebars.template(function(f, o, e, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    k = k || {}; var i = "",
        b, g, q, h = "function",
        j = this.escapeExpression,
        p = this,
        n = e.helperMissing;

    function c(v, u) { var r = "",
            s, t;
        r += '<a class="footer__card js-footer-card bg-clr--white" href="'; if (t = e.url) { s = t.call(v, { hash: {}, data: u }) } else { t = (v && v.url);
            s = typeof t === h ? t.call(v, { hash: {}, data: u }) : t } r += j(s) + '" data-id='; if (t = e.id) { s = t.call(v, { hash: {}, data: u }) } else { t = (v && v.id);
            s = typeof t === h ? t.call(v, { hash: {}, data: u }) : t } r += j(s) + '><img class="footer__card__icon" src="/assets/icons/'; if (t = e.icon) { s = t.call(v, { hash: {}, data: u }) } else { t = (v && v.icon);
            s = typeof t === h ? t.call(v, { hash: {}, data: u }) : t } r += j(s) + '.svg" alt="'; if (t = e.alt) { s = t.call(v, { hash: {}, data: u }) } else { t = (v && v.alt);
            s = typeof t === h ? t.call(v, { hash: {}, data: u }) : t } r += j(s) + '" aria-hidden="true"><h3 class="footer__card__title tx-clr--slate">'; if (t = e.title) { s = t.call(v, { hash: {}, data: u }) } else { t = (v && v.title);
            s = typeof t === h ? t.call(v, { hash: {}, data: u }) : t } r += j(s) + '</h3><p class="footer__text">'; if (t = e.body) { s = t.call(v, { hash: {}, data: u }) } else { t = (v && v.body);
            s = typeof t === h ? t.call(v, { hash: {}, data: u }) : t } r += j(s) + "</p></a>"; return r }

    function a(v, u) { var r = "",
            s, t;
        r += '<a href="'; if (t = e.url) { s = t.call(v, { hash: {}, data: u }) } else { t = (v && v.url);
            s = typeof t === h ? t.call(v, { hash: {}, data: u }) : t } r += j(s) + '" class="js-footer-link" data-id='; if (t = e.id) { s = t.call(v, { hash: {}, data: u }) } else { t = (v && v.id);
            s = typeof t === h ? t.call(v, { hash: {}, data: u }) : t } r += j(s) + '><img class="footer__social-icon" src="/assets/icons/footer/'; if (t = e.icon) { s = t.call(v, { hash: {}, data: u }) } else { t = (v && v.icon);
            s = typeof t === h ? t.call(v, { hash: {}, data: u }) : t } r += j(s) + '.svg" alt="'; if (t = e.alt) { s = t.call(v, { hash: {}, data: u }) } else { t = (v && v.alt);
            s = typeof t === h ? t.call(v, { hash: {}, data: u }) : t } r += j(s) + '" aria-hidden="true"></a>'; return r } i += '<div class="footer"><div class="footer__left"><div class="footer_cards">';
    b = e.each.call(o, ((b = (o && o.model)), b == null || b === false ? b : b.cards), { hash: {}, inverse: p.noop, fn: p.program(1, c, k), data: k }); if (b || b === 0) { i += b } i += '</div></div><div class="footer__right"><div class="footer__column"><h2 class="footer__title tx-clr--slate-light">';
    b = (g = e.lp || (o && o.lp), q = { hash: {}, data: k }, g ? g.call(o, "SERP footer content", "Stay Informed", q) : n.call(o, "lp", "SERP footer content", "Stay Informed", q)); if (b || b === 0) { i += b } i += '</h2><p class="footer__text">';
    b = (g = e.lp || (o && o.lp), q = { hash: {}, data: k }, g ? g.call(o, "SERP footer content", "We don't track you, but others do.", q) : n.call(o, "lp", "SERP footer content", "We don't track you, but others do.", q)); if (b || b === 0) { i += b } i += '</p><p class="footer__text">';
    b = (g = e.lp || (o && o.lp), q = { hash: {}, data: k }, g ? g.call(o, "SERP footer content", "Learn how to protect your privacy.", q) : n.call(o, "lp", "SERP footer content", "Learn how to protect your privacy.", q)); if (b || b === 0) { i += b } i += '</p><div class="footer__links">';
    b = e.each.call(o, ((b = (o && o.model)), b == null || b === false ? b : b.links), { hash: {}, inverse: p.noop, fn: p.program(3, a, k), data: k }); if (b || b === 0) { i += b } i += "</div></div></div></div>"; return i });
this["DDG"]["templates"]["footer_mobile"] = Handlebars.template(function(e, n, c, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    j = j || {}; var h = "",
        a, f, p, g = "function",
        i = this.escapeExpression,
        m = c.helperMissing,
        o = this;

    function b(u, t) { var q = "",
            r, s;
        q += '<a href="'; if (s = c.url) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.url);
            r = typeof s === g ? s.call(u, { hash: {}, data: t }) : s } q += i(r) + '" class="js-footer-link" data-id='; if (s = c.id) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.id);
            r = typeof s === g ? s.call(u, { hash: {}, data: t }) : s } q += i(r) + '><img class="footer__social-icon" src="/assets/icons/footer/'; if (s = c.icon) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.icon);
            r = typeof s === g ? s.call(u, { hash: {}, data: t }) : s } q += i(r) + '.svg" alt="'; if (s = c.alt) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.alt);
            r = typeof s === g ? s.call(u, { hash: {}, data: t }) : s } q += i(r) + '" aria-hidden="true"></a>'; return q } h += '<div class="footer--mobile"><p class="footer__text">';
    a = (f = c.lp || (n && n.lp), p = { hash: {}, data: j }, f ? f.call(n, "SERP footer content", "We don't track you, but others do.", p) : m.call(n, "lp", "SERP footer content", "We don't track you, but others do.", p)); if (a || a === 0) { h += a } h += '</p><p class="footer__text">';
    a = (f = c.lp || (n && n.lp), p = { hash: {}, data: j }, f ? f.call(n, "SERP footer content", "Learn how to protect your privacy.", p) : m.call(n, "lp", "SERP footer content", "Learn how to protect your privacy.", p)); if (a || a === 0) { h += a } h += '</p><div class="footer__links">';
    a = c.each.call(n, ((a = (n && n.model)), a == null || a === false ? a : a.links), { hash: {}, inverse: o.noop, fn: o.program(1, b, j), data: j }); if (a || a === 0) { h += a } h += '</div><div class="js-footer-feedback-btn-wrap"></div></div>'; return h });
this["DDG"]["templates"]["forecast_detail"] = Handlebars.template(function(e, q, p, i, x) { this.compilerInfo = [4, ">= 1.0.0"];
    p = this.merge(p, e.helpers);
    x = x || {}; var g, b = "function",
        a = this.escapeExpression,
        n = this,
        o = p.helperMissing;

    function m(D, C) { var y = "",
            A, B, z;
        y += '<div class="module__top js-forecast-module-detail-top"><div class="module__place text--primary">'; if (B = p.location) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.location);
            A = typeof B === b ? B.call(D, { hash: {}, data: C }) : B } y += a(A) + '</div><div class="module__warnings"><div class="module__summary ';
        A = p["if"].call(D, (D && D.isIE11), { hash: {}, inverse: n.noop, fn: n.program(2, k, C), data: C }); if (A || A === 0) { y += A } y += ' tx-clr--slate-light">'; if (B = p.dayLong) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.dayLong);
            A = typeof B === b ? B.call(D, { hash: {}, data: C }) : B } y += a(A) + " ";
        A = p.unless.call(D, (D && D.selected), { hash: {}, inverse: n.noop, fn: n.program(4, j, C), data: C }); if (A || A === 0) { y += A } y += " &bull; "; if (B = p.summary) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.summary);
            A = typeof B === b ? B.call(D, { hash: {}, data: C }) : B } y += a(A) + "</div>";
        A = p["if"].call(D, (D && D.weatherAlert), { hash: {}, inverse: n.program(8, f, C), fn: n.program(6, h, C), data: C }); if (A || A === 0) { y += A } y += '</div><div class="module__detail module__detail--left"><img class="module__forecast-icon ';
        A = p["if"].call(D, (D && D.isIE11), { hash: {}, inverse: n.noop, fn: n.program(11, v, C), data: C }); if (A || A === 0) { y += A } y += '" src="'; if (B = p.icon) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.icon);
            A = typeof B === b ? B.call(D, { hash: {}, data: C }) : B } y += a(A) + '" aria-hidden="true"><div class="module__temperature"><div class="module__temperature-value ';
        A = p["if"].call(D, (D && D.isIE11), { hash: {}, inverse: n.noop, fn: n.program(13, u, C), data: C }); if (A || A === 0) { y += A } y += ' text--primary">'; if (B = p.temperature) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.temperature);
            A = typeof B === b ? B.call(D, { hash: {}, data: C }) : B } y += a(A) + '&deg;</div><div class="module__temperature-units ';
        A = p["if"].call(D, (D && D.isIE11), { hash: {}, inverse: n.noop, fn: n.program(15, t, C), data: C }); if (A || A === 0) { y += A } y += '"><a href="#" data-unit="f" class="module__temperature-unit js-forecast-module-detail-unit ';
        A = p.unless.call(D, (D && D.isMetric), { hash: {}, inverse: n.noop, fn: n.program(17, s, C), data: C }); if (A || A === 0) { y += A } y += '">F</a><span class="module__temperature-unit-separator">&#47;</span>    <a href="#" data-unit="c" class="module__temperature-unit js-forecast-module-detail-unit ';
        A = p["if"].call(D, (D && D.isMetric), { hash: {}, inverse: n.noop, fn: n.program(17, s, C), data: C }); if (A || A === 0) { y += A } y += '">C</a></div></div></div><div class="module__detail module__detail--right"><div class="module__humidity">';
        A = (B = p.lp || (D && D.lp), z = { hash: {}, data: C }, B ? B.call(D, "forecast", "Humidity", z) : o.call(D, "lp", "forecast", "Humidity", z)); if (A || A === 0) { y += A } y += ": "; if (B = p.humidity) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.humidity);
            A = typeof B === b ? B.call(D, { hash: {}, data: C }) : B } y += a(A) + '&#37;</div><div class="module__winds">';
        A = (B = p.lp || (D && D.lp), z = { hash: {}, data: C }, B ? B.call(D, "forecast", "Wind", z) : o.call(D, "lp", "forecast", "Wind", z)); if (A || A === 0) { y += A } y += ': <span class="module__winds module__winds--val">'; if (B = p.wind) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.wind);
            A = typeof B === b ? B.call(D, { hash: {}, data: C }) : B } y += a(A) + '</span></div><div><a href="'; if (B = p.moreLink) { A = B.call(D, { hash: {}, data: C }) } else { B = (D && D.moreLink);
            A = typeof B === b ? B.call(D, { hash: {}, data: C }) : B } y += a(A) + '" class="summary-more js-forecast-module-detail-more tx-clr--blue-dark">';
        A = (B = p.lp || (D && D.lp), z = { hash: {}, data: C }, B ? B.call(D, "expand_text", "Show More", z) : o.call(D, "lp", "expand_text", "Show More", z)); if (A || A === 0) { y += A } y += '</a></div></div></div><div class="module__bottom js-forecast-module-detail-bottom"><div class="module__detail module__detail--hours js-forecast-module-detail-hours" aria-hidden="true"></div><div class="module__detail--hours__labels module__detail--hours__labels--desktop">';
        A = p.each.call(D, ((A = ((A = (D && D.hours)), A == null || A === false ? A : A.data)), A == null || A === false ? A : A.labels), { hash: {}, inverse: n.noop, fn: n.program(19, r, C), data: C }); if (A || A === 0) { y += A } y += '</div><div class="module__detail--hours__labels module__detail--hours__labels--mobile">';
        A = p.each.call(D, ((A = (D && D.hours)), A == null || A === false ? A : A.mobileLabels), { hash: {}, inverse: n.noop, fn: n.program(19, r, C), data: C }); if (A || A === 0) { y += A } y += "</div></div>"; return y }

    function k(z, y) { return "module__summary--ie11" }

    function j(B, A) { var y = "",
            z;
        y += " " + a(((z = ((z = (B && B.hours)), z == null || z === false ? z : z.firstHour)), typeof z === b ? z.apply(B) : z)) + " "; return y }

    function h(B, A) { var y = "",
            z;
        y += '<a href="' + a(((z = ((z = (B && B.weatherAlert)), z == null || z === false ? z : z.uri)), typeof z === b ? z.apply(B) : z)) + '" class="module__weather-warning--red module__weather-warning"> <span class="ddgsi ddgsi-t-right"></span> ' + a(((z = ((z = (B && B.weatherAlert)), z == null || z === false ? z : z.title)), typeof z === b ? z.apply(B) : z)) + "</a>"; return y }

    function f(A, z) { var y;
        y = p["if"].call(A, (A && A.warning), { hash: {}, inverse: n.noop, fn: n.program(9, c, z), data: z }); if (y || y === 0) { return y } else { return "" } }

    function c(B, A) { var y = "",
            z;
        y += '<a href="' + a(((z = ((z = (B && B.warning)), z == null || z === false ? z : z.uri)), typeof z === b ? z.apply(B) : z)) + '" class="tx-clr--blue-dark module__weather-warning"> <span class="ddgsi ddgsi-t-right"></span> ' + a(((z = ((z = (B && B.warning)), z == null || z === false ? z : z.title)), typeof z === b ? z.apply(B) : z)) + "</a>"; return y }

    function v(z, y) { return "module__forecast-icon--ie11" }

    function u(z, y) { return "module__temperature-value--ie11" }

    function t(z, y) { return "module__temperature-units--ie11" }

    function s(z, y) { return "module__temperature-unit--on text--primary" }

    function r(B, A) { var y = "",
            z;
        y += '<div data-item-index="' + a(((z = (A == null || A === false ? A : A.index)), typeof z === b ? z.apply(B) : z)) + '" class="label-' + a(((z = (A == null || A === false ? A : A.index)), typeof z === b ? z.apply(B) : z)) + ' module__detail--hours__labels__item"><div class="module__detail__temp-label text-primary">' + a(((z = (B && B[0])), typeof z === b ? z.apply(B) : z)) + '</div><div class="module__detail__hour-label tx-clr--slate-light">' + a(((z = (B && B[1])), typeof z === b ? z.apply(B) : z)) + "</div></div>"; return y } g = p["with"].call(q, (q && q.items), { hash: {}, inverse: n.noop, fn: n.program(1, m, x), data: x }); if (g || g === 0) { return g } else { return "" } });
this["DDG"]["templates"]["forecast_module"] = Handlebars.template(function(g, n, f, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    f = this.merge(f, g.helpers);
    j = j || {}; var b, h = "function",
        i = this.escapeExpression,
        p = this,
        m = f.helperMissing;

    function e(v, u) { var q = "",
            s, t, r;
        q += '<div class="forecast-wrapper"><div class="module module--forecast module__container"><div class="js-forecast-module-detail"></div><div class="module__items align-days">';
        s = f.each.call(v, (v && v.days), { hash: {}, inverse: p.noop, fn: p.program(2, c, u), data: u }); if (s || s === 0) { q += s } q += '</div></div><div class="module__more-at-and-feedback js-forecast-module-detail-moreatcontainer"><p class="module__more-at ';
        s = f.unless.call(v, (v && v.isEnglishDevice), { hash: {}, inverse: p.noop, fn: p.program(5, o, u), data: u }); if (s || s === 0) { q += s } q += '">';
        s = (t = f.moreAt || (v && v.moreAt), r = { hash: { hideMoreAtText: (1), className: ("zci__more-at tx-clr--grey-light js-forecast-module-detail-moreat") }, data: u }, t ? t.call(v, (v && v.moreAtUrl), "Dark Sky", r) : m.call(v, "moreAt", (v && v.moreAtUrl), "Dark Sky", r)); if (s || s === 0) { q += s } q += '</p></div><div class="clear"></div></div>'; return q }

    function c(u, t) { var q = "",
            r, s;
        q += '<div data-item-index="'; if (s = f.index) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.index);
            r = typeof s === h ? s.call(u, { hash: {}, data: t }) : s } q += i(r) + '" class="module__items-item js-forecast-module-item ';
        r = f["if"].call(u, (u && u.selected), { hash: {}, inverse: p.noop, fn: p.program(3, a, t), data: t }); if (r || r === 0) { q += r } q += ' align-days__item"><div class="module__items-day text-primary">'; if (s = f.day) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.day);
            r = typeof s === h ? s.call(u, { hash: {}, data: t }) : s } q += i(r) + '</div><img class="module__items-icon" src="'; if (s = f.icon) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.icon);
            r = typeof s === h ? s.call(u, { hash: {}, data: t }) : s } q += i(r) + '" alt="'; if (s = f.summary) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.summary);
            r = typeof s === h ? s.call(u, { hash: {}, data: t }) : s } q += i(r) + '"><div class="module__items-unit module__items-unit--on text-primary">'; if (s = f.high) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.high);
            r = typeof s === h ? s.call(u, { hash: {}, data: t }) : s } q += i(r) + '&deg;</div><div class="module__items-unit module__items-unit--low tx-clr--slate-light">'; if (s = f.low) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.low);
            r = typeof s === h ? s.call(u, { hash: {}, data: t }) : s } q += i(r) + "&deg;</div></div>"; return q }

    function a(r, q) { return "module__items-item--selected" }

    function o(r, q) { return "module__more-at--not-en" } b = f["with"].call(n, (n && n.items), { hash: {}, inverse: p.noop, fn: p.program(1, e, j), data: j }); if (b || b === 0) { return b } else { return "" } });
this["DDG"]["templates"]["images_module"] = Handlebars.template(function(c, m, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, n, k = b.helperMissing,
        f = "function",
        h = this.escapeExpression;
    g += '<div class="module module--images"><div class="module__header module__header--link js-images-show-more">';
    a = (e = b.l || (m && m.l), n = { hash: {}, data: i }, e ? e.call(m, "Images", n) : k.call(m, "l", "Images", n)); if (a || a === 0) { g += a } g += " ";
    a = (e = b.l || (m && m.l), n = { hash: {}, data: i }, e ? e.call(m, "for", n) : k.call(m, "l", "for", n)); if (a || a === 0) { g += a } g += " <b>"; if (e = b.query) { a = e.call(m, { hash: {}, data: i }) } else { e = (m && m.query);
        a = typeof e === f ? e.call(m, { hash: {}, data: i }) : e } g += h(a) + '</b></div><div class="module--images__thumbnails js-images-thumbnails"></div><a class="js-images-show-more module__footer" href="#">';
    a = (e = b.l || (m && m.l), n = { hash: {}, data: i }, e ? e.call(m, "More Images", n) : k.call(m, "l", "More Images", n)); if (a || a === 0) { g += a } g += " ";
    a = (e = b.l || (m && m.l), n = { hash: {}, data: i }, e ? e.call(m, "for", n) : k.call(m, "l", "for", n)); if (a || a === 0) { g += a } g += " <b>"; if (e = b.query) { a = e.call(m, { hash: {}, data: i }) } else { e = (m && m.query);
        a = typeof e === f ? e.call(m, { hash: {}, data: i }) : e } g += h(a) + "</b></a></div>"; return g });
this["DDG"]["templates"]["images_module_thumbnails"] = Handlebars.template(function(f, m, e, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    i = i || {}; var a, n = this,
        g = "function",
        h = this.escapeExpression,
        k = e.helperMissing;

    function c(t, s) { var o = "",
            q, r, p;
        o += '<div class="module--images__thumbnails__tile ';
        q = e["if"].call(t, (t && t.lastOfRow), { hash: {}, inverse: n.noop, fn: n.program(2, b, s), data: s }); if (q || q === 0) { o += q } o += ' js-images-link" style="height:'; if (r = e.divHeight) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.divHeight);
            q = typeof r === g ? r.call(t, { hash: {}, data: s }) : r } o += h(q) + "px;width:"; if (r = e.divWidth) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.divWidth);
            q = typeof r === g ? r.call(t, { hash: {}, data: s }) : r } o += h(q) + 'px;" data-id="'; if (r = e.id) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.id);
            q = typeof r === g ? r.call(t, { hash: {}, data: s }) : r } o += h(q) + '"><a href="/?q='; if (r = e.rq) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.rq);
            q = typeof r === g ? r.call(t, { hash: {}, data: s }) : r } if (q || q === 0) { o += q } o += "&iax=images&ia=images&iai="; if (r = e.id) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.id);
            q = typeof r === g ? r.call(t, { hash: {}, data: s }) : r } o += h(q); if (r = e.kurl) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.kurl);
            q = typeof r === g ? r.call(t, { hash: {}, data: s }) : r } o += h(q) + '" class="module--images__thumbnails__link"><img src="' + h((r = e.imageProxy || (t && t.imageProxy), p = { hash: {}, data: s }, r ? r.call(t, (t && t.thumbnail), p) : k.call(t, "imageProxy", (t && t.thumbnail), p))) + '" alt="'; if (r = e.title) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.title);
            q = typeof r === g ? r.call(t, { hash: {}, data: s }) : r } o += h(q) + '" width="'; if (r = e.width) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.width);
            q = typeof r === g ? r.call(t, { hash: {}, data: s }) : r } o += h(q) + '" height="'; if (r = e.height) { q = r.call(t, { hash: {}, data: s }) } else { r = (t && t.height);
            q = typeof r === g ? r.call(t, { hash: {}, data: s }) : r } o += h(q) + '" class="module--images__thumbnails__image"></a></div>'; return o }

    function b(p, o) { return "is-last" } a = e.each.call(m, m, { hash: {}, inverse: n.noop, fn: n.program(1, c, i), data: i }); if (a || a === 0) { return a } else { return "" } });
this["DDG"]["templates"]["manual_user_location_modal"] = Handlebars.template(function(c, j, b, h, g) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    g = g || {}; var f = "",
        a, e, k, i = b.helperMissing;
    f += '<div class="modal modal--popover modal--popover--dark manual-user-location-modal js-popover"><div class="modal__overlay manual-user-location-modal__overlay js-modal-close"></div><div class="modal__wrap"><div class="modal__box manual-user-location-modal__content"><div class="manual-user-location-modal__content-wrapper"><div class="manual-user-location-modal__map js-manual-user-location-map"><div class="map-controls map-controls--topright js-manual-user-location-map-controls"><div class="map-control"><button class="btn btn--mapbox ddgsi js-modal-close" type="button" aria-label="';
    a = (e = b.l || (j && j.l), k = { hash: {}, data: g }, e ? e.call(j, "Click to collapse", k) : i.call(j, "l", "Click to collapse", k)); if (a || a === 0) { f += a } f += '" title="';
    a = (e = b.l || (j && j.l), k = { hash: {}, data: g }, e ? e.call(j, "Click to collapse", k) : i.call(j, "l", "Click to collapse", k)); if (a || a === 0) { f += a } f += '">&#215;</button></div></div></div><div class="manual-user-location-modal__tools"><div class="manual-user-location-modal__msg">Move map to set current location</div><div class="btn btn--primary js-manual-user-location-done-btn is-disabled">Done</div></div></div></div></div></div>'; return f });
this["DDG"]["templates"]["map_sidebar"] = Handlebars.template(function(e, k, c, i, h) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    h = h || {}; var g = "",
        a, f, n, j = c.helperMissing,
        m = this;

    function b(p, o) { return '<div class="vertical--map__sidebar__header__search"><form id="search_form" class="js-vertical-map-search search--adv search--header has-text"><input type="text" class="js-vertical-map-search-input search__input--adv" value=""></form></div>' } g += '<div class="js-vertical-map-siderbar-header-wrapper"><div class="vertical--map__sidebar__header"><div class="vertical--map__sidebar__header__content"><div class="vertical--map__sidebar__header__col"><a href="#" class="vertical--map__sidebar__header__link btn js-vertical-map-close-map js-vertical-map-back-to-serp"><span class="vertical--map__sidebar__header__link__icon ddgsi ddgsi-left"></span>';
    a = (f = c.l || (k && k.l), n = { hash: {}, data: h }, f ? f.call(k, "Search Results", n) : j.call(k, "l", "Search Results", n)); if (a || a === 0) { g += a } g += '</a><a href="#" class="vertical--map__sidebar__header__link btn js-vertical-map-back-to-list is-hidden"><span class="vertical--map__sidebar__header__link__icon ddgsi ddgsi-left"></span>';
    a = (f = c.l || (k && k.l), n = { hash: {}, data: h }, f ? f.call(k, "All Places", n) : j.call(k, "l", "All Places", n)); if (a || a === 0) { g += a } g += '</a></div><div class="vertical--map__sidebar__header__col vertical--map__sidebar__header__col--right"><a href="/" class="vertical--map__sidebar__header__logo js-vertical-map-close-map"><span class="vertical--map__sidebar__header__logo__img">DuckDuckGo</span></a></div>';
    a = c["if"].call(k, (k && k.isLocalRequery), { hash: {}, inverse: m.noop, fn: m.program(1, b, h), data: h }); if (a || a === 0) { g += a } g += "</div></div></div>"; return g });
this["DDG"]["templates"]["map_sidebar_mobile"] = Handlebars.template(function(e, f, b, a, c) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, e.helpers);
    c = c || {}; return '<div class=\'js-vertical-map-sidebar-mobile\'><div class="js-vertical-map-siderbar-mobile-wrapper"><div class="vertical--map__sidebar__header--touch__back"><div class="map-control js-vertical-map-sidebar-mobile-back-wrapper"><button class="btn ddgsi ddgsileft vertical--map__btn js-vertical-map-sidebar-mobile-close-map" type="button" aria-label="Click to collapse" title="Click to collapse">&lt;</button><button class="btn ddgsi ddgsileft vertical--map__btn is-hidden js-vertical-map-sidebar-mobile-back-to-list" type="button" aria-label="Click to collapse" title="Click to collapse">&lt;</button></div></div><div class="vertical--map__sidebar__header vertical--map__sidebar__header--mobile js-vertical-map-sidebar-mobile-handle"><div class="vertical--map__sidebar__header__handle handle js-vertical-map-sidebar-mobile-handle-bar"></div></div></div></div>' });
this["DDG"]["templates"]["mapkit_close_control"] = Handlebars.template(function(f, m, e, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    i = i || {}; var h = "",
        b, g, o, n = this,
        k = e.helperMissing;

    function c(q, p) { return "map-control__btn--safari " }

    function a(q, p) { return "map-control__btn--darkmap " } h += '<div class="map-control"><button class="btn ddgsi map-control__btn ';
    b = e["if"].call(m, (m && m.isSafari), { hash: {}, inverse: n.noop, fn: n.program(1, c, i), data: i }); if (b || b === 0) { h += b } b = e["if"].call(m, (m && m.isDarkMap), { hash: {}, inverse: n.noop, fn: n.program(3, a, i), data: i }); if (b || b === 0) { h += b } h += '" type="button" aria-label="';
    b = (g = e.l || (m && m.l), o = { hash: {}, data: i }, g ? g.call(m, "Click to collapse", o) : k.call(m, "l", "Click to collapse", o)); if (b || b === 0) { h += b } h += '" title="';
    b = (g = e.l || (m && m.l), o = { hash: {}, data: i }, g ? g.call(m, "Click to collapse", o) : k.call(m, "l", "Click to collapse", o)); if (b || b === 0) { h += b } h += '">&#215;</button></div>'; return h });
this["DDG"]["templates"]["mapkit_map"] = Handlebars.template(function(f, n, e, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    j = j || {}; var h = "",
        b, g = "function",
        i = this.escapeExpression,
        m = e.helperMissing,
        o = this;

    function c(q, p) { return "mapkit-map--frozen" }

    function a(u, t) { var p = "",
            r, s, q;
        p += '<a class="mapkit-static__legal" title="" href="https://www.apple.com/legal/internet-services/maps/legal-'; if (s = e.legalLang) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.legalLang);
            r = typeof s === g ? s.call(u, { hash: {}, data: t }) : s } p += i(r) + '.html">';
        r = (s = e.l || (u && u.l), q = { hash: {}, data: t }, s ? s.call(u, "Legal", q) : m.call(u, "l", "Legal", q)); if (r || r === 0) { p += r } p += '</a><div class="mapkit-map__click-overlay js-mapkit-map-click-overlay"></div><span class="label mapkit-map__open-cta">';
        r = (s = e.l || (u && u.l), q = { hash: {}, data: t }, s ? s.call(u, "Open Map", q) : m.call(u, "l", "Open Map", q)); if (r || r === 0) { p += r } p += "</span>"; return p } h += '<div class="mapkit-map ';
    b = e["if"].call(n, (n && n.isFrozen), { hash: {}, inverse: o.noop, fn: o.program(1, c, j), data: j }); if (b || b === 0) { h += b } h += '">';
    b = e["if"].call(n, (n && n.isFrozen), { hash: {}, inverse: o.noop, fn: o.program(3, a, j), data: j }); if (b || b === 0) { h += b } h += "</div>"; return h });
this["DDG"]["templates"]["mapkit_marker"] = Handlebars.template(function(e, m, c, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    j = j || {}; var h = "",
        a, f, g = "function",
        i = this.escapeExpression,
        n = this;

    function b(s, r) { var o = "",
            p, q;
        o += '<span class="mgl-marker__num">'; if (q = c.number) { p = q.call(s, { hash: {}, data: r }) } else { q = (s && s.number);
            p = typeof q === g ? q.call(s, { hash: {}, data: r }) : q } o += i(p) + "</span>"; return o } h += '<div class="mgl-marker mgl-marker--'; if (f = c.markerType) { a = f.call(m, { hash: {}, data: j }) } else { f = (m && m.markerType);
        a = typeof f === g ? f.call(m, { hash: {}, data: j }) : f } h += i(a) + '">';
    a = c["if"].call(m, (m && m.number), { hash: {}, inverse: n.noop, fn: n.program(1, b, j), data: j }); if (a || a === 0) { h += a } h += "</div>"; return h });
this["DDG"]["templates"]["mapkit_position_picker"] = Handlebars.template(function(e, f, b, a, c) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, e.helpers);
    c = c || {}; return '<div class="mapkit-map mapkit-position-picker js-mapkit-position-picker"><div class="mapkit-position-picker__marker mgl-marker js-mapkit-position-picker-marker"></div><div class="mapbox-gl__map mapkit-position-picker__map is-loading js-mapkit-position-picker-map"></div></div>' });
this["DDG"]["templates"]["mapkit_static_map"] = Handlebars.template(function(f, o, e, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    k = k || {}; var i = "",
        b, g, q, n = e.helperMissing,
        p = this,
        j = this.escapeExpression,
        h = "function";

    function c(s, r) { return "has-cta" }

    function a(x, v) { var r = "",
            t, u, s;
        r += '<span class="label mapkit-static__cta">';
        t = (u = e.l || (x && x.l), s = { hash: {}, data: v }, u ? u.call(x, "Open Map", s) : n.call(x, "l", "Open Map", s)); if (t || t === 0) { r += t } r += "</span>"; return r } i += '<div class="mapkit-static ';
    b = e["if"].call(o, (o && o.showCTA), { hash: {}, inverse: p.noop, fn: p.program(1, c, k), data: k }); if (b || b === 0) { i += b } i += '"><div class="mapkit-static__map" style="background-image:url(\'' + j((g = e.imageProxy || (o && o.imageProxy), q = { hash: {}, data: k }, g ? g.call(o, (o && o.url), q) : n.call(o, "imageProxy", (o && o.url), q))) + '\');"><a class="mapkit-static__legal" title="" href="https://www.apple.com/legal/internet-services/maps/legal-'; if (g = e.legalLang) { b = g.call(o, { hash: {}, data: k }) } else { g = (o && o.legalLang);
        b = typeof g === h ? g.call(o, { hash: {}, data: k }) : g } i += j(b) + '.html">';
    b = (g = e.l || (o && o.l), q = { hash: {}, data: k }, g ? g.call(o, "Legal", q) : n.call(o, "l", "Legal", q)); if (b || b === 0) { i += b } i += '</a><img class="mapkit-static__img" width="'; if (g = e.width) { b = g.call(o, { hash: {}, data: k }) } else { g = (o && o.width);
        b = typeof g === h ? g.call(o, { hash: {}, data: k }) : g } i += j(b) + '" height="'; if (g = e.height) { b = g.call(o, { hash: {}, data: k }) } else { g = (o && o.height);
        b = typeof g === h ? g.call(o, { hash: {}, data: k }) : g } i += j(b) + '" src="' + j((g = e.imageProxy || (o && o.imageProxy), q = { hash: {}, data: k }, g ? g.call(o, (o && o.url), q) : n.call(o, "imageProxy", (o && o.url), q))) + '" /></div>';
    b = e["if"].call(o, (o && o.showCTA), { hash: {}, inverse: p.noop, fn: p.program(3, a, k), data: k }); if (b || b === 0) { i += b } i += '<div class="mgl-marker mgl-marker--mapkit"></div></div>'; return i });
this["DDG"]["templates"]["mapkit_user_location"] = Handlebars.template(function(e, f, b, a, c) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, e.helpers);
    c = c || {}; return '<div class="mgl-user-loc"></div>' });
this["DDG"]["templates"]["mapkit_user_location_control"] = Handlebars.template(function(c, j, b, h, g) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    g = g || {}; var f = "",
        a, e, k, i = b.helperMissing;
    f += '<div class="map-control"><button class="btn ddgsi map-control__btn"><span class="map-control__icon"></span>';
    a = (e = b.include || (j && j.include), k = { hash: { className: ("map-control__spinner") }, data: g }, e ? e.call(j, "spinner", k) : i.call(j, "include", "spinner", k)); if (a || a === 0) { f += a } f += "</button></div>"; return f });
this["DDG"]["templates"]["maps_module"] = Handlebars.template(function(c, k, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, f = "function",
        h = this.escapeExpression;
    g += '<div class="module module--map js-module--'; if (e = b.id) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.id);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + '"><div class="module__map js-maps-module-map"><div class="map-controls map-controls--topright js-maps-module-control-topright"></div></div><div class="module__address-detail js-maps-module-detailview"></div></div>'; return g });
this["DDG"]["templates"]["module_image_header"] = Handlebars.template(function(c, r, p, i, y) { this.compilerInfo = [4, ">= 1.0.0"];
    p = this.merge(p, c.helpers);
    y = y || {}; var q = "",
        f, o = p.helperMissing,
        n = this,
        b = "function",
        a = this.escapeExpression;

    function m(A, z) { return "module__header--with-image" }

    function k(E, D) { var z = "",
            B, C, A;
        z += '<a class="module__header__image__link" href="'; if (C = p.imageURL) { B = C.call(E, { hash: {}, data: D }) } else { C = (E && E.imageURL);
            B = typeof C === b ? C.call(E, { hash: {}, data: D }) : C } z += a(B) + '" title="'; if (C = p.morePhotosText) { B = C.call(E, { hash: {}, data: D }) } else { C = (E && E.morePhotosText);
            B = typeof C === b ? C.call(E, { hash: {}, data: D }) : C } z += a(B) + '"></a><div class="module__header__image module__header__image--full js-place-header-map-link"><div class="image-tiles"><div class="image-tiles__col">';
        B = (C = p.include || (E && E.include), A = { hash: { className: ("module__header__image--big"), image: (((B = (E && E.images)), B == null || B === false ? B : B[0])) }, data: D }, C ? C.call(E, "module_image_header_item", A) : o.call(E, "include", "module_image_header_item", A)); if (B || B === 0) { z += B } z += "</div>";
        B = p["if"].call(E, ((B = (E && E.layout)), B == null || B === false ? B : B.layout_1), { hash: {}, inverse: n.program(6, h, D), fn: n.program(4, j, D), data: D }); if (B || B === 0) { z += B } z += "</div>";
        B = p.unless.call(E, ((B = (E && E.layout)), B == null || B === false ? B : B.layout_1), { hash: {}, inverse: n.noop, fn: n.program(17, s, D), data: D }); if (B || B === 0) { z += B } z += '</div><div class="module__header__shadow"></div>'; return z }

    function j(E, D) { var z = "",
            B, C, A;
        z += '<div class="image-tiles__col--blur">';
        B = (C = p.include || (E && E.include), A = { hash: { image: (((B = (E && E.images)), B == null || B === false ? B : B[0])), className: ("module__header__image--big module__header__image--blur") }, data: D }, C ? C.call(E, "module_image_header_item", A) : o.call(E, "include", "module_image_header_item", A)); if (B || B === 0) { z += B } z += '<span class="module__header__image__no-more">';
        B = (C = p.l || (E && E.l), A = { hash: {}, data: D }, C ? C.call(E, "No More Photos", A) : o.call(E, "l", "No More Photos", A)); if (B || B === 0) { z += B } z += "</span></div>"; return z }

    function h(B, A) { var z;
        z = p["if"].call(B, ((z = (B && B.layout)), z == null || z === false ? z : z.layout_4), { hash: {}, inverse: n.program(14, u, A), fn: n.program(7, g, A), data: A }); if (z || z === 0) { return z } else { return "" } }

    function g(C, B) { var z = "",
            A;
        z += '<div class="image-tiles__col--wrap"><div class="image-tiles__col__cell">';
        A = p["if"].call(C, ((A = ((A = (C && C.images)), A == null || A === false ? A : A[1])), A == null || A === false ? A : A.url), { hash: {}, inverse: n.noop, fn: n.program(8, e, B), data: B }); if (A || A === 0) { z += A } z += '</div><div class="image-tiles__col__cell">';
        A = p["if"].call(C, ((A = ((A = (C && C.images)), A == null || A === false ? A : A[2])), A == null || A === false ? A : A.url), { hash: {}, inverse: n.noop, fn: n.program(10, x, B), data: B }); if (A || A === 0) { z += A } z += '</div></div><div class="image-tiles__col">';
        A = p["if"].call(C, ((A = ((A = (C && C.images)), A == null || A === false ? A : A[3])), A == null || A === false ? A : A.url), { hash: {}, inverse: n.noop, fn: n.program(12, v, B), data: B }); if (A || A === 0) { z += A } z += "</div>"; return z }

    function e(D, C) { var A, B, z;
        A = (B = p.include || (D && D.include), z = { hash: { image: (((A = (D && D.images)), A == null || A === false ? A : A[1])), className: ("module__header__image--small") }, data: C }, B ? B.call(D, "module_image_header_item", z) : o.call(D, "include", "module_image_header_item", z)); if (A || A === 0) { return A } else { return "" } }

    function x(D, C) { var A, B, z;
        A = (B = p.include || (D && D.include), z = { hash: { image: (((A = (D && D.images)), A == null || A === false ? A : A[2])), className: ("module__header__image--small") }, data: C }, B ? B.call(D, "module_image_header_item", z) : o.call(D, "include", "module_image_header_item", z)); if (A || A === 0) { return A } else { return "" } }

    function v(D, C) { var A, B, z;
        A = (B = p.include || (D && D.include), z = { hash: { image: (((A = (D && D.images)), A == null || A === false ? A : A[3])), className: ("module__header__image--big") }, data: C }, B ? B.call(D, "module_image_header_item", z) : o.call(D, "include", "module_image_header_item", z)); if (A || A === 0) { return A } else { return "" } }

    function u(C, B) { var z = "",
            A;
        z += '<div class="image-tiles__col">';
        A = p["if"].call(C, ((A = ((A = (C && C.images)), A == null || A === false ? A : A[1])), A == null || A === false ? A : A.url), { hash: {}, inverse: n.noop, fn: n.program(15, t, B), data: B }); if (A || A === 0) { z += A } z += "</div>"; return z }

    function t(D, C) { var A, B, z;
        A = (B = p.include || (D && D.include), z = { hash: { image: (((A = (D && D.images)), A == null || A === false ? A : A[1])), className: ("module__header__image--big") }, data: C }, B ? B.call(D, "module_image_header_item", z) : o.call(D, "include", "module_image_header_item", z)); if (A || A === 0) { return A } else { return "" } }

    function s(E, D) { var z = "",
            B, C, A;
        z += '<span class="label module__header__image__more">';
        B = (C = p.l || (E && E.l), A = { hash: {}, data: D }, C ? C.call(E, "See Photos", A) : o.call(E, "l", "See Photos", A)); if (B || B === 0) { z += B } z += "</span>"; return z } q += '<div class="module__header ';
    f = p["if"].call(r, (r && r.image), { hash: {}, inverse: n.noop, fn: n.program(1, m, y), data: y }); if (f || f === 0) { q += f } q += ' module__header--map js-place-header-map">';
    f = p["if"].call(r, (r && r.layout), { hash: {}, inverse: n.noop, fn: n.program(3, k, y), data: y }); if (f || f === 0) { q += f } q += "</div>"; return q });
this["DDG"]["templates"]["module_placeholder"] = Handlebars.template(function(e, f, b, a, c) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, e.helpers);
    c = c || {}; return '<div class="module  module--placeholder"></div>' });
this["DDG"]["templates"]["news_module"] = Handlebars.template(function(c, m, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, n, f = "function",
        h = this.escapeExpression,
        k = b.helperMissing;
    g += '<div class="module module--news js-module--'; if (e = b.id) { a = e.call(m, { hash: {}, data: i }) } else { e = (m && m.id);
        a = typeof e === f ? e.call(m, { hash: {}, data: i }) : e } g += h(a) + '"><div class="module--news__left js-news-module-left ddgsi ddgsi-left is-hidden"></div><div class="module--news__right js-news-module-right ddgsi ddgsi-right is-hidden"></div><div class="js-news-module-title module__header module__header--link is-hidden">' + h(((a = ((a = (m && m.meta)), a == null || a === false ? a : a.primaryText)), typeof a === f ? a.apply(m) : a)) + '</div><div class="module--news__items js-news-module-items"></div><a href="#" class="js-news-module-more module__footer is-hidden">';
    a = (e = b.l || (m && m.l), n = { hash: {}, data: i }, e ? e.call(m, "More News", n) : k.call(m, "l", "More News", n)); if (a || a === 0) { g += a } g += "</a></div>"; return g });
this["DDG"]["templates"]["news_module_item"] = Handlebars.template(function(f, s, q, j, v) { this.compilerInfo = [4, ">= 1.0.0"];
    q = this.merge(q, f.helpers);
    v = v || {}; var r = "",
        h, a, e, p = q.helperMissing,
        b = this.escapeExpression,
        o = this,
        c = "function";

    function n(y, x) { return "has-image" }

    function m(A, z) { var x = "",
            y;
        x += '<div class="module--news__image-wrapper js-news-image-wrapper">';
        y = q["if"].call(A, (A && A.image), { hash: {}, inverse: o.program(6, i, z), fn: o.program(4, k, z), data: z }); if (y || y === 0) { x += y } x += "</div>"; return x }

    function k(B, A) { var x = "",
            z, y;
        x += '<div class="module--news__image" style="background-image:url(' + b((z = q.imageProxy || (B && B.imageProxy), y = { hash: {}, data: A }, z ? z.call(B, (B && B.image), y) : p.call(B, "imageProxy", (B && B.image), y))) + ')"></div>'; return x }

    function i(y, x) { return '<div class="module--news__placeholder js-news-img-placeholder ddgsi ddgsi-news"></div>' }

    function g(B, A) { var x = "",
            y, z;
        x += '<div class="module--news__body__content js-news-content">'; if (z = q.excerpt) { y = z.call(B, { hash: {}, data: A }) } else { z = (B && B.excerpt);
            y = typeof z === c ? z.call(B, { hash: {}, data: A }) : z } if (y || y === 0) { x += y } x += "</div>"; return x }

    function u(y, x) { return "has-relative-time" }

    function t(B, A) { var x = "",
            y, z;
        x += '<span class="sep  tile__sep"></span><span class="tile__time">'; if (z = q.relativeTimeShort) { y = z.call(B, { hash: {}, data: A }) } else { z = (B && B.relativeTimeShort);
            y = typeof z === c ? z.call(B, { hash: {}, data: A }) : z } if (y || y === 0) { x += y } x += "</span>"; return x } r += '<div class="module--news__item ';
    h = q["if"].call(s, (s && s.showImage), { hash: {}, inverse: o.noop, fn: o.program(1, n, v), data: v }); if (h || h === 0) { r += h } r += '" data-link="'; if (a = q.id) { h = a.call(s, { hash: {}, data: v }) } else { a = (s && s.id);
        h = typeof a === c ? a.call(s, { hash: {}, data: v }) : a } r += b(h) + '">';
    h = q["if"].call(s, (s && s.showImage), { hash: {}, inverse: o.noop, fn: o.program(3, m, v), data: v }); if (h || h === 0) { r += h } r += '<div class="module--news__body"><a href="'; if (a = q.id) { h = a.call(s, { hash: {}, data: v }) } else { a = (s && s.id);
        h = typeof a === c ? a.call(s, { hash: {}, data: v }) : a } r += b(h) + '" class="module--news__body__title js-news-title">'; if (a = q.title) { h = a.call(s, { hash: {}, data: v }) } else { a = (s && s.title);
        h = typeof a === c ? a.call(s, { hash: {}, data: v }) : a } if (h || h === 0) { r += h } r += "</a>";
    h = q["if"].call(s, (s && s.showImage), { hash: {}, inverse: o.program(8, g, v), fn: o.noop, data: v }); if (h || h === 0) { r += h } r += '</div><div class="module--news__footer ';
    h = q["if"].call(s, (s && s.relativeTimeShort), { hash: {}, inverse: o.noop, fn: o.program(10, u, v), data: v }); if (h || h === 0) { r += h } r += '"><span class="module--news__more-at">';
    h = (a = q.favicon || (s && s.favicon), e = { hash: {}, data: v }, a ? a.call(s, (s && s.url), e) : p.call(s, "favicon", (s && s.url), e)); if (h || h === 0) { r += h } r += '<span class="module--news__source result__url">';
    h = (a = q.ellipsis || (s && s.ellipsis), e = { hash: {}, data: v }, a ? a.call(s, (s && s.source), 20, e) : p.call(s, "ellipsis", (s && s.source), 20, e)); if (h || h === 0) { r += h } r += "</span></span>";
    h = q["if"].call(s, (s && s.relativeTimeShort), { hash: {}, inverse: o.noop, fn: o.program(12, t, v), data: v }); if (h || h === 0) { r += h } r += "</div></div>"; return r });
this["DDG"]["templates"]["no_results"] = Handlebars.template(function(f, o, e, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    k = k || {}; var i = "",
        b, g, s, h = "function",
        j = this.escapeExpression,
        n = e.helperMissing,
        r = this;

    function c(y, x) { var t = "",
            u, v;
        t += 'style="min-height:'; if (v = e.minHeight) { u = v.call(y, { hash: {}, data: x }) } else { v = (y && y.minHeight);
            u = typeof v === h ? v.call(y, { hash: {}, data: x }) : v } t += j(u) + 'px;"'; return t }

    function a(z, y) { var t = "",
            v, x, u;
        t += '<p class="no-results__web"><a class="no-results__link js-no-results-web" href="#">';
        v = (x = e.lp || (z && z.lp), u = { hash: {}, data: y }, x ? x.call(z, "noresults", "Show web results", u) : n.call(z, "lp", "noresults", "Show web results", u)); if (v || v === 0) { t += v } t += "</a></p>"; return t }

    function q(z, y) { var t = "",
            v, x, u;
        t += '<div class="no-results__tips"><p class="no-results__tips-title">';
        v = (x = e.lp || (z && z.lp), u = { hash: {}, data: y }, x ? x.call(z, "noresults", "Suggestions:", u) : n.call(z, "lp", "noresults", "Suggestions:", u)); if (v || v === 0) { t += v } t += '</p><ul class="no-results__tips-list"><li>';
        v = (x = e.lp || (z && z.lp), u = { hash: {}, data: y }, x ? x.call(z, "noresults", "Make sure all words are spelled correctly.", u) : n.call(z, "lp", "noresults", "Make sure all words are spelled correctly.", u)); if (v || v === 0) { t += v } t += "</li><li>";
        v = (x = e.lp || (z && z.lp), u = { hash: {}, data: y }, x ? x.call(z, "noresults", "Try different keywords.", u) : n.call(z, "lp", "noresults", "Try different keywords.", u)); if (v || v === 0) { t += v } t += "</li><li>";
        v = (x = e.lp || (z && z.lp), u = { hash: {}, data: y }, x ? x.call(z, "noresults", "Try more general keywords.", u) : n.call(z, "lp", "noresults", "Try more general keywords.", u)); if (v || v === 0) { t += v } t += "</li><li>";
        v = (x = e.lp || (z && z.lp), u = { hash: {}, data: y }, x ? x.call(z, "noresults", "Try fewer keywords.", u) : n.call(z, "lp", "noresults", "Try fewer keywords.", u)); if (v || v === 0) { t += v } t += "</li></ul></div>";
        v = e["if"].call(z, (z && z.showRetryMessage), { hash: {}, inverse: r.noop, fn: r.program(6, p, y), data: y }); if (v || v === 0) { t += v } return t }

    function p(z, y) { var t = "",
            v, x, u;
        t += '<p class="no-results__retry">';
        v = (x = e.lp || (z && z.lp), u = { hash: {}, data: y }, x ? x.call(z, "noresults", "%sClick here%s to try again, if you think there should be results for this search.", '<a class="no-results__link js-no-results-retry" href="#">', "</a>", u) : n.call(z, "lp", "noresults", "%sClick here%s to try again, if you think there should be results for this search.", '<a class="no-results__link js-no-results-retry" href="#">', "</a>", u)); if (v || v === 0) { t += v } t += "</p>"; return t } i += '<div class="no-results t-m" ';
    b = e["if"].call(o, (o && o.minHeight), { hash: {}, inverse: r.noop, fn: r.program(1, c, k), data: k }); if (b || b === 0) { i += b } i += '><p class="no-results__title">';
    b = (g = e.lp || (o && o.lp), s = { hash: {}, data: k }, g ? g.call(o, "noresults", "No %s found for %s%s%s.", (o && o.resultType), "<b>", (o && o.query), "</b>", s) : n.call(o, "lp", "noresults", "No %s found for %s%s%s.", (o && o.resultType), "<b>", (o && o.query), "</b>", s)); if (b || b === 0) { i += b } i += "</p>";
    b = e["if"].call(o, (o && o.showWebLink), { hash: {}, inverse: r.program(5, q, k), fn: r.program(3, a, k), data: k }); if (b || b === 0) { i += b } i += "</div>"; return i });
this["DDG"]["templates"]["place_detail"] = Handlebars.template(function(k, E, C, r, K) { this.compilerInfo = [4, ">= 1.0.0"];
    C = this.merge(C, k.helpers);
    K = K || {}; var D = "",
        n, a, B = C.helperMissing,
        c = this.escapeExpression,
        z = this,
        e = "function";

    function t(M, L) { return " module__section--minimized" }

    function s(P, O) { var L = "",
            N, M;
        L += '<img class="review__rating-stars--' + c((N = C.stripNonAlpha || (P && P.stripNonAlpha), M = { hash: {}, data: O }, N ? N.call(P, (P && P.source), M) : B.call(P, "stripNonAlpha", (P && P.source), M))) + '" src="' + c((N = C.imageProxy || (P && P.imageProxy), M = { hash: {}, data: O }, N ? N.call(P, (P && P.ratingImage), M) : B.call(P, "imageProxy", (P && P.ratingImage), M))) + '" />'; return L }

    function q(N, M) { var L;
        L = C["if"].call(N, (N && N.ratingClass), { hash: {}, inverse: z.noop, fn: z.program(6, p, M), data: M }); if (L || L === 0) { return L } else { return "" } }

    function p(P, O) { var M, N, L;
        M = (N = C.renderStars || (P && P.renderStars), L = { hash: {}, data: O }, N ? N.call(P, (P && P.ratingClass), L) : B.call(P, "renderStars", (P && P.ratingClass), L)); if (M || M === 0) { return M } else { return "" } }

    function m(Q, P) { var L = "",
            N, O, M;
        L += '<span class="review__count module__link">';
        N = (O = C.reviewCount || (Q && Q.reviewCount), M = { hash: {}, data: P }, O ? O.call(Q, (Q && Q.reviewCount), (Q && Q.reviewsURL), M) : B.call(Q, "reviewCount", (Q && Q.reviewCount), (Q && Q.reviewsURL), M)); if (N || N === 0) { L += N } L += "</span>"; return L }

    function J(P, O) { var L = "",
            M, N;
        L += '<p class="place-detail__item place-detail__subtitle">'; if (N = C.subtitle) { M = N.call(P, { hash: {}, data: O }) } else { N = (P && P.subtitle);
            M = typeof N === e ? N.call(P, { hash: {}, data: O }) : N } L += c(M) + "</p>"; return L }

    function I(P, O) { var L = "",
            M, N;
        L += '<p class="place-detail__item"><a class="module__link" href='; if (N = C.website) { M = N.call(P, { hash: {}, data: O }) } else { N = (P && P.website);
            M = typeof N === e ? N.call(P, { hash: {}, data: O }) : N } L += c(M) + ">Go to website</a></p>"; return L }

    function H(Q, P) { var L = "",
            N, O, M;
        L += '<p class="place-detail__item"><strong class="place-detail__data__label">';
        N = (O = C.lp || (Q && Q.lp), M = { hash: {}, data: P }, O ? O.call(Q, "maps_places", "Address", M) : B.call(Q, "lp", "maps_places", "Address", M)); if (N || N === 0) { L += N } L += ": </strong>"; if (O = C.address) { N = O.call(Q, { hash: {}, data: P }) } else { O = (Q && Q.address);
            N = typeof O === e ? O.call(Q, { hash: {}, data: P }) : O } L += c(N) + "</p>"; return L }

    function G(Q, P) { var L = "",
            N, O, M;
        L += '<p class="place-detail__item"><strong class="place-detail__data__label">';
        N = (O = C.lp || (Q && Q.lp), M = { hash: {}, data: P }, O ? O.call(Q, "maps_places", "Phone", M) : B.call(Q, "lp", "maps_places", "Phone", M)); if (N || N === 0) { L += N } L += ': </strong><a class="module__link js-place-detail-phone" href="tel:'; if (O = C.phone) { N = O.call(Q, { hash: {}, data: P }) } else { O = (Q && Q.phone);
            N = typeof O === e ? O.call(Q, { hash: {}, data: P }) : O } L += c(N) + '">'; if (O = C.phone) { N = O.call(Q, { hash: {}, data: P }) } else { O = (Q && Q.phone);
            N = typeof O === e ? O.call(Q, { hash: {}, data: P }) : O } L += c(N) + "</a></p>"; return L }

    function F(Q, P) { var L = "",
            N, O, M;
        L += '<p class="place-detail__item"><span class="place-detail__data__label">';
        N = (O = C.lp || (Q && Q.lp), M = { hash: {}, data: P }, O ? O.call(Q, "maps_places", "Hours", M) : B.call(Q, "lp", "maps_places", "Hours", M)); if (N || N === 0) { L += N } L += ': </span><a class="module__link js-place-detail-hours-toggle" href="#">'; if (O = C.hoursToday) { N = O.call(Q, { hash: {}, data: P }) } else { O = (Q && Q.hoursToday);
            N = typeof O === e ? O.call(Q, { hash: {}, data: P }) : O } L += c(N) + '</a></p><div class="js-place-detail-hours"></div>'; return L }

    function o(Q, P) { var L = "",
            N, O, M;
        L += '<p class="place-detail__item"><strong class="place-detail__data__label">';
        N = (O = C.lp || (Q && Q.lp), M = { hash: {}, data: P }, O ? O.call(Q, "maps_places", "Menu", M) : B.call(Q, "lp", "maps_places", "Menu", M)); if (N || N === 0) { L += N } L += ': </strong><a class="module__link" href="'; if (O = C.menuURL) { N = O.call(Q, { hash: {}, data: P }) } else { O = (Q && Q.menuURL);
            N = typeof O === e ? O.call(Q, { hash: {}, data: P }) : O } L += c(N) + '">'; if (O = C.viewOnExternalServiceText) { N = O.call(Q, { hash: {}, data: P }) } else { O = (Q && Q.viewOnExternalServiceText);
            N = typeof O === e ? O.call(Q, { hash: {}, data: P }) : O } L += c(N) + "</a></p>"; return L }

    function j(O, N) { var L = "",
            M;
        L += ' <div class="place-detail__reviews';
        M = C["if"].call(O, (O && O.canExpand), { hash: {}, inverse: z.noop, fn: z.program(23, i, N), data: N }); if (M || M === 0) { L += M } L += '"> ';
        M = C.each.call(O, (O && O.reviews), { hash: {}, inverse: z.noop, fn: z.programWithDepth(26, g, N, O), data: N }); if (M || M === 0) { L += M } L += "</div>"; return L }

    function i(N, M) { var L;
        L = C.unless.call(N, (N && N.expanded), { hash: {}, inverse: z.noop, fn: z.program(24, h, M), data: M }); if (L || L === 0) { return L } else { return "" } }

    function h(M, L) { return " is-hidden" }

    function g(R, P, Q) { var L = "",
            N, O, M;
        L += '<div class="review place-detail__reviews__review"><div class="review__user"><a ';
        N = C.unless.call(R, ((N = (R && R.user)), N == null || N === false ? N : N.image), { hash: {}, inverse: z.noop, fn: z.program(27, f, P), data: P }); if (N || N === 0) { L += N } L += 'href="';
        N = C["if"].call(R, ((N = (R && R.user)), N == null || N === false ? N : N.url), { hash: {}, inverse: z.program(31, A, P), fn: z.program(29, b, P), data: P }); if (N || N === 0) { L += N } L += '" title="' + c(((N = ((N = (R && R.user)), N == null || N === false ? N : N.userOnServiceText)), typeof N === e ? N.apply(R) : N)) + '">';
        N = C["if"].call(R, ((N = (R && R.user)), N == null || N === false ? N : N.image), { hash: {}, inverse: z.noop, fn: z.program(33, y, P), data: P }); if (N || N === 0) { L += N } L += '</a></div><div class="review__content"><p class="place-detail__rating">';
        N = C["if"].call(R, (R && R.ratingImage), { hash: {}, inverse: z.program(37, v, P), fn: z.programWithDepth(35, x, P, R, Q), data: P }); if (N || N === 0) { L += N } L += '<span class="review__rating-date">'; if (O = C.formattedDate) { N = O.call(R, { hash: {}, data: P }) } else { O = (R && R.formattedDate);
            N = typeof O === e ? O.call(R, { hash: {}, data: P }) : O } L += c(N) + '</span></p><p class="place-detail__reviews__review__text">'; if (O = C.excerpt) { N = O.call(R, { hash: {}, data: P }) } else { O = (R && R.excerpt);
            N = typeof O === e ? O.call(R, { hash: {}, data: P }) : O } L += c(N) + ' <a class="module__link" href="'; if (O = C.url) { N = O.call(R, { hash: {}, data: P }) } else { O = (R && R.url);
            N = typeof O === e ? O.call(R, { hash: {}, data: P }) : O } L += c(N) + '">';
        N = (O = C.l || (R && R.l), M = { hash: {}, data: P }, O ? O.call(R, "Read More", M) : B.call(R, "l", "Read More", M)); if (N || N === 0) { L += N } L += "</a></p></div></div>"; return L }

    function f(M, L) { return 'class="review__user__url--fallback"' }

    function b(N, M) { var L; return c(((L = ((L = (N && N.user)), L == null || L === false ? L : L.url)), typeof L === e ? L.apply(N) : L)) }

    function A(O, N) { var L, M; if (M = C.url) { L = M.call(O, { hash: {}, data: N }) } else { M = (O && O.url);
            L = typeof M === e ? M.call(O, { hash: {}, data: N }) : M } return c(L) }

    function y(Q, P) { var L = "",
            N, O, M;
        L += '<img class="review__user__image" src="' + c((O = C.imageProxy || (Q && Q.imageProxy), M = { hash: {}, data: P }, O ? O.call(Q, ((N = (Q && Q.user)), N == null || N === false ? N : N.image), M) : B.call(Q, "imageProxy", ((N = (Q && Q.user)), N == null || N === false ? N : N.image), M))) + '" width="42" height="42" />'; return L }

    function x(R, O, Q, P) { var L = "",
            N, M;
        L += '<img class="review__rating-stars--' + c((N = C.stripNonAlpha || (P && P.stripNonAlpha), M = { hash: {}, data: O }, N ? N.call(R, (P && P.source), M) : B.call(R, "stripNonAlpha", (P && P.source), M))) + " place-detail__rating__" + c((N = C.stripNonAlpha || (Q && Q.stripNonAlpha), M = { hash: {}, data: O }, N ? N.call(R, (Q && Q.source), M) : B.call(R, "stripNonAlpha", (Q && Q.source), M))) + '-stars"src="' + c((N = C.imageProxy || (R && R.imageProxy), M = { hash: {}, data: O }, N ? N.call(R, (R && R.ratingImage), M) : B.call(R, "imageProxy", (R && R.ratingImage), M))) + '" />'; return L }

    function v(O, N) { var L = "",
            M;
        L += " ";
        M = C["if"].call(O, (O && O.ratingClass), { hash: {}, inverse: z.noop, fn: z.program(6, p, N), data: N }); if (M || M === 0) { L += M } return L }

    function u(Q, P) { var L = "",
            N, O, M;
        L += '<p class="place-detail__item place-detail__more-at';
        N = C["if"].call(Q, (Q && Q.canExpand), { hash: {}, inverse: z.noop, fn: z.program(23, i, P), data: P }); if (N || N === 0) { L += N } L += " place-detail__more-at--"; if (O = C.source) { N = O.call(Q, { hash: {}, data: P }) } else { O = (Q && Q.source);
            N = typeof O === e ? O.call(Q, { hash: {}, data: P }) : O } L += c(N) + '"> <a class="module__link" href="'; if (O = C.url) { N = O.call(Q, { hash: {}, data: P }) } else { O = (Q && Q.url);
            N = typeof O === e ? O.call(Q, { hash: {}, data: P }) : O } L += c(N) + '">';
        N = (O = C.favicon || (Q && Q.favicon), M = { hash: {}, data: P }, O ? O.call(Q, (Q && Q.url), M) : B.call(Q, "favicon", (Q && Q.url), M)); if (N || N === 0) { L += N } L += " "; if (O = C.moreAtExternalServiceText) { N = O.call(Q, { hash: {}, data: P }) } else { O = (Q && Q.moreAtExternalServiceText);
            N = typeof O === e ? O.call(Q, { hash: {}, data: P }) : O } L += c(N) + "</a></p>"; return L } D += '<div class="place-detail"><div class="module__section place-detail__section';
    n = C["if"].call(E, (E && E.canExpand), { hash: {}, inverse: z.noop, fn: z.program(1, t, K), data: K }); if (n || n === 0) { D += n } D += '"><div class="place-detail__item place-detail__header-row"><h2 class="module__title place-detail__name js-place-detail-title"><a class="module__title__link" href="'; if (a = C.url) { n = a.call(E, { hash: {}, data: K }) } else { a = (E && E.url);
        n = typeof a === e ? a.call(E, { hash: {}, data: K }) : a } D += c(n) + '">'; if (a = C.name) { n = a.call(E, { hash: {}, data: K }) } else { a = (E && E.name);
        n = typeof a === e ? a.call(E, { hash: {}, data: K }) : a } D += c(n) + '</a></h2></div><p class="place-detail__item place-detail__review-count">';
    n = C["if"].call(E, (E && E.ratingImage), { hash: {}, inverse: z.program(5, q, K), fn: z.program(3, s, K), data: K }); if (n || n === 0) { D += n } n = C["if"].call(E, (E && E.reviewCount), { hash: {}, inverse: z.noop, fn: z.program(8, m, K), data: K }); if (n || n === 0) { D += n } D += "</p>";
    n = C["if"].call(E, (E && E.subtitle), { hash: {}, inverse: z.noop, fn: z.program(10, J, K), data: K }); if (n || n === 0) { D += n } n = C["if"].call(E, (E && E.website), { hash: {}, inverse: z.noop, fn: z.program(12, I, K), data: K }); if (n || n === 0) { D += n } D += '</div><div class="module__section place-detail__section place-detail__section--bordered"><div class="place-detail__data">';
    n = C["if"].call(E, (E && E.address), { hash: {}, inverse: z.noop, fn: z.program(14, H, K), data: K }); if (n || n === 0) { D += n } n = C["if"].call(E, (E && E.phone), { hash: {}, inverse: z.noop, fn: z.program(16, G, K), data: K }); if (n || n === 0) { D += n } n = C["if"].call(E, (E && E.hoursToday), { hash: {}, inverse: z.noop, fn: z.program(18, F, K), data: K }); if (n || n === 0) { D += n } n = C["if"].call(E, (E && E.menuURL), { hash: {}, inverse: z.noop, fn: z.program(20, o, K), data: K }); if (n || n === 0) { D += n } D += "</div>";
    n = C["if"].call(E, (E && E.reviews), { hash: {}, inverse: z.noop, fn: z.program(22, j, K), data: K }); if (n || n === 0) { D += n } n = C["if"].call(E, (E && E.url), { hash: {}, inverse: z.noop, fn: z.program(39, u, K), data: K }); if (n || n === 0) { D += n } D += "</div></div>"; return D });
this["DDG"]["templates"]["place_header"] = Handlebars.template(function(f, n, e, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    j = j || {}; var h = "",
        b, g = "function",
        i = this.escapeExpression,
        m = e.helperMissing,
        o = this;

    function c(q, p) { return "module__header--with-image" }

    function a(u, t) { var p = "",
            r, s, q;
        p += '<a class="module__header__image" href="'; if (s = e.imageURL) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.imageURL);
            r = typeof s === g ? s.call(u, { hash: {}, data: t }) : s } p += i(r) + '" title="'; if (s = e.morePhotosText) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.morePhotosText);
            r = typeof s === g ? s.call(u, { hash: {}, data: t }) : s } p += i(r) + '"style="background-image: url(' + i((s = e.imageProxy || (u && u.imageProxy), q = { hash: {}, data: t }, s ? s.call(u, (u && u.image), q) : m.call(u, "imageProxy", (u && u.image), q))) + ')"><img class="module__header__image__img" src="' + i((s = e.imageProxy || (u && u.imageProxy), q = { hash: {}, data: t }, s ? s.call(u, (u && u.image), q) : m.call(u, "imageProxy", (u && u.image), q))) + '" /><span class="label module__header__image__more">';
        r = (s = e.l || (u && u.l), q = { hash: {}, data: t }, s ? s.call(u, "See Photos", q) : m.call(u, "l", "See Photos", q)); if (r || r === 0) { p += r } p += "</span></a>"; return p } h += '<div class="module__header ';
    b = e["if"].call(n, (n && n.image), { hash: {}, inverse: o.noop, fn: o.program(1, c, j), data: j }); if (b || b === 0) { h += b } h += ' js-place-header">';
    b = e["if"].call(n, (n && n.image), { hash: {}, inverse: o.noop, fn: o.program(3, a, j), data: j }); if (b || b === 0) { h += b } h += '<div class="module__header__map js-place-header-map"></div><div class="module__header__shadow"></div></div>'; return h });
this["DDG"]["templates"]["place_hours"] = Handlebars.template(function(f, n, e, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    j = j || {}; var h = "",
        a, g = "function",
        i = this.escapeExpression,
        m = e.helperMissing,
        p = this;

    function c(u, t) { var r = "",
            s;
        r += '<tr class="place-hours__item ';
        s = e["if"].call(u, (u && u.isToday), { hash: {}, inverse: p.noop, fn: p.program(2, b, t), data: t }); if (s || s === 0) { r += s } r += '"><td class="place-hours__item__day">' + i(((s = (u && u.weekDay)), typeof s === g ? s.apply(u) : s)) + '</td><td class="place-hours__item__hours">';
        s = e["if"].call(u, (u && u.hours), { hash: {}, inverse: p.program(6, o, t), fn: p.program(4, q, t), data: t }); if (s || s === 0) { r += s } r += "</td></tr>"; return r }

    function b(s, r) { return "place-hours__item--current" }

    function q(t, s) { var r; return i(((r = (t && t.hours)), typeof r === g ? r.apply(t) : r)) }

    function o(v, u) { var s, t, r;
        s = (t = e.l || (v && v.l), r = { hash: {}, data: u }, t ? t.call(v, "Closed", r) : m.call(v, "l", "Closed", r)); if (s || s === 0) { return s } else { return "" } } h += '<div class="place-hours is-hidden"><span class="place-hours__close ddgsi js-place-hours-close">X</span><table><tbody>';
    a = e.each.call(n, (n && n.hours), { hash: {}, inverse: p.noop, fn: p.program(1, c, j), data: j }); if (a || a === 0) { h += a } h += "</tbody></table></div>"; return h });
this["DDG"]["templates"]["place_list_item"] = Handlebars.template(function(j, x, u, p, E) { this.compilerInfo = [4, ">= 1.0.0"];
    u = this.merge(u, j.helpers);
    E = E || {}; var v = "",
        k, a, t = u.helperMissing,
        b = this.escapeExpression,
        c = "function",
        s = this;

    function r(J, I) { var F = "",
            H, G;
        F += '<div class="place-list-item__image"style="background-image: url(' + b((H = u.imageProxy || (J && J.imageProxy), G = { hash: {}, data: I }, H ? H.call(J, (J && J.image), G) : t.call(J, "imageProxy", (J && J.image), G))) + ')"><img class="place-list-item__image__img" src="' + b((H = u.imageProxy || (J && J.imageProxy), G = { hash: {}, data: I }, H ? H.call(J, (J && J.image), G) : t.call(J, "imageProxy", (J && J.image), G))) + '" /></div>'; return F }

    function q(J, I) { var F = "",
            G, H; if (H = u.number) { G = H.call(J, { hash: {}, data: I }) } else { H = (J && J.number);
            G = typeof H === c ? H.call(J, { hash: {}, data: I }) : H } F += b(G) + ". "; return F }

    function o(J, I) { var F = "",
            G, H;
        F += '<a class="module__title__link js-place-list-item-title" href="'; if (H = u.url) { G = H.call(J, { hash: {}, data: I }) } else { H = (J && J.url);
            G = typeof H === c ? H.call(J, { hash: {}, data: I }) : H } F += b(G) + '">'; return F }

    function n(G, F) { return "</a>" }

    function i(I, H) { var F = "",
            G;
        F += '<p class="place-list-item__rating">';
        G = u["if"].call(I, (I && I.ratingImage), { hash: {}, inverse: s.program(12, C, H), fn: s.program(10, D, H), data: H }); if (G || G === 0) { F += G } G = u["if"].call(I, (I && I.reviewCount), { hash: {}, inverse: s.noop, fn: s.program(15, A, H), data: H }); if (G || G === 0) { F += G } F += "</p>"; return F }

    function D(J, I) { var F = "",
            H, G;
        F += '<img class="review__rating-stars--' + b((H = u.stripNonAlpha || (J && J.stripNonAlpha), G = { hash: {}, data: I }, H ? H.call(J, (J && J.source), G) : t.call(J, "stripNonAlpha", (J && J.source), G))) + ' place-list-item__rating__image" src="' + b((H = u.imageProxy || (J && J.imageProxy), G = { hash: {}, data: I }, H ? H.call(J, (J && J.ratingImage), G) : t.call(J, "imageProxy", (J && J.ratingImage), G))) + '" />'; return F }

    function C(H, G) { var F;
        F = u["if"].call(H, (H && H.ratingClass), { hash: {}, inverse: s.noop, fn: s.program(13, B, G), data: G }); if (F || F === 0) { return F } else { return "" } }

    function B(J, I) { var G, H, F;
        G = (H = u.renderStars || (J && J.renderStars), F = { hash: {}, data: I }, H ? H.call(J, (J && J.ratingClass), F) : t.call(J, "renderStars", (J && J.ratingClass), F)); if (G || G === 0) { return G } else { return "" } }

    function A(J, I) { var F = "",
            G, H;
        F += '<span class="review__count place-list-item__rating__count place-list-item__rating__count--'; if (H = u.source) { G = H.call(J, { hash: {}, data: I }) } else { H = (J && J.source);
            G = typeof H === c ? H.call(J, { hash: {}, data: I }) : H } F += b(G);
        G = u["if"].call(J, (J && J.showLinks), { hash: {}, inverse: s.noop, fn: s.program(16, z, I), data: I }); if (G || G === 0) { F += G } F += '">';
        G = u.unless.call(J, (J && J.showLinks), { hash: {}, inverse: s.noop, fn: s.program(18, y, I), data: I }); if (G || G === 0) { F += G } G = u["if"].call(J, (J && J.showLinks), { hash: {}, inverse: s.noop, fn: s.program(20, m, I), data: I }); if (G || G === 0) { F += G } F += "</span>"; return F }

    function z(G, F) { return " module_link" }

    function y(J, I) { var G, H, F;
        G = (H = u.reviewCount || (J && J.reviewCount), F = { hash: {}, data: I }, H ? H.call(J, (J && J.reviewCount), false, F) : t.call(J, "reviewCount", (J && J.reviewCount), false, F)); if (G || G === 0) { return G } else { return "" } }

    function m(J, I) { var G, H, F;
        G = (H = u.reviewCount || (J && J.reviewCount), F = { hash: {}, data: I }, H ? H.call(J, (J && J.reviewCount), (J && J.reviewsURL), F) : t.call(J, "reviewCount", (J && J.reviewCount), (J && J.reviewsURL), F)); if (G || G === 0) { return G } else { return "" } }

    function h(J, I) { var F = "",
            G, H;
        F += '<li class="place-list-item__info__item">'; if (H = u.subtitle) { G = H.call(J, { hash: {}, data: I }) } else { H = (J && J.subtitle);
            G = typeof H === c ? H.call(J, { hash: {}, data: I }) : H } F += b(G) + "</li>"; return F }

    function g(J, I) { var F = "",
            G, H;
        F += '<li class="place-list-item__info__item">'; if (H = u.shortAddress) { G = H.call(J, { hash: {}, data: I }) } else { H = (J && J.shortAddress);
            G = typeof H === c ? H.call(J, { hash: {}, data: I }) : H } F += b(G);
        G = u["if"].call(J, (J && J.distanceStr), { hash: {}, inverse: s.noop, fn: s.program(25, f, I), data: I }); if (G || G === 0) { F += G } F += "</li>"; return F }

    function f(J, I) { var F = "",
            G, H;
        F += " · "; if (H = u.distanceStr) { G = H.call(J, { hash: {}, data: I }) } else { H = (J && J.distanceStr);
            G = typeof H === c ? H.call(J, { hash: {}, data: I }) : H } F += b(G); return F }

    function e(K, J) { var F = "",
            H, I, G;
        F += '<li class="place-list-item__info__item">';
        H = (I = u.lp || (K && K.lp), G = { hash: {}, data: J }, I ? I.call(K, "maps_places", "Hours", G) : t.call(K, "lp", "maps_places", "Hours", G)); if (H || H === 0) { F += H } F += ": "; if (I = u.hoursToday) { H = I.call(K, { hash: {}, data: J }) } else { I = (K && K.hoursToday);
            H = typeof I === c ? I.call(K, { hash: {}, data: J }) : I } F += b(H) + "</li>"; return F } v += '<div class="module__section place-list-item js-place-list-item"> ';
    k = u["if"].call(x, (x && x.image), { hash: {}, inverse: s.noop, fn: s.program(1, r, E), data: E }); if (k || k === 0) { v += k } v += '<h2 class="place-list-item__title">';
    k = u["if"].call(x, (x && x.number), { hash: {}, inverse: s.noop, fn: s.program(3, q, E), data: E }); if (k || k === 0) { v += k } k = u["if"].call(x, (x && x.showLinks), { hash: {}, inverse: s.noop, fn: s.program(5, o, E), data: E }); if (k || k === 0) { v += k } if (a = u.name) { k = a.call(x, { hash: {}, data: E }) } else { a = (x && x.name);
        k = typeof a === c ? a.call(x, { hash: {}, data: E }) : a } v += b(k);
    k = u["if"].call(x, (x && x.showLinks), { hash: {}, inverse: s.noop, fn: s.program(7, n, E), data: E }); if (k || k === 0) { v += k } v += "</h2>";
    k = u["if"].call(x, (x && x.rating), { hash: {}, inverse: s.noop, fn: s.program(9, i, E), data: E }); if (k || k === 0) { v += k } v += '<ul class="place-list-item__info">';
    k = u["if"].call(x, (x && x.subtitle), { hash: {}, inverse: s.noop, fn: s.program(22, h, E), data: E }); if (k || k === 0) { v += k } k = u["if"].call(x, (x && x.shortAddress), { hash: {}, inverse: s.noop, fn: s.program(24, g, E), data: E }); if (k || k === 0) { v += k } k = u["if"].call(x, (x && x.hoursToday), { hash: {}, inverse: s.noop, fn: s.program(27, e, E), data: E }); if (k || k === 0) { v += k } v += "</ul></div>"; return v });
this["DDG"]["templates"]["places_module"] = Handlebars.template(function(c, k, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, f = "function",
        h = this.escapeExpression;
    g += '<div class="module module--places js-module--'; if (e = b.id) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.id);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + '"><div class="js-places-module-content"></div><div class="module__toggle js-places-module-toggle"><div class="js-places-module-more is-hidden"><span class="module__toggle__chevron">v</span></div><div class="module__toggle--less js-places-module-less"><span class="module__toggle__chevron module__toggle__chevron--collapse">v</span></div></div></div>'; return g });
this["DDG"]["templates"]["places_multiple"] = Handlebars.template(function(c, m, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, n, k = b.helperMissing,
        f = "function",
        h = this.escapeExpression;
    g += '<div class="module--places-multiple js-places-multiple"><div class="module__header"><div class="module__header__map js-places-multiple-map" /><div class="module__header__shadow"></div></div><div class="module__place-list js-places-multiple-list"></div><div class="module__places-more module__section"><span class="module__link module__link--blue module__places-more__link--more-places js-places-multiple-expand">';
    a = (e = b.l || (m && m.l), n = { hash: {}, data: i }, e ? e.call(m, "More Places", n) : k.call(m, "l", "More Places", n)); if (a || a === 0) { g += a } g += '</span><a class="module__link module__link--grey module__places-more__link--provider js-places-multiple-more-source"href="' + h(((a = ((a = ((a = (m && m.model)), a == null || a === false ? a : a.meta)), a == null || a === false ? a : a.sourceUrl)), typeof a === f ? a.apply(m) : a)) + '">';
    a = (e = b.favicon || (m && m.favicon), n = { hash: {}, data: i }, e ? e.call(m, ((a = ((a = (m && m.model)), a == null || a === false ? a : a.meta)), a == null || a === false ? a : a.sourceUrl), n) : k.call(m, "favicon", ((a = ((a = (m && m.model)), a == null || a === false ? a : a.meta)), a == null || a === false ? a : a.sourceUrl), n)); if (a || a === 0) { g += a } g += " " + h(((a = ((a = (m && m.model)), a == null || a === false ? a : a.moreAtExternalServiceText)), typeof a === f ? a.apply(m) : a)) + "</a></div></div>"; return g });
this["DDG"]["templates"]["places_single"] = Handlebars.template(function(e, f, b, a, c) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, e.helpers);
    c = c || {}; return '<div class="js-places-module-content js-places-single"></div>' });
this["DDG"]["templates"]["places_single_map"] = Handlebars.template(function(e, f, b, a, c) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, e.helpers);
    c = c || {}; return '<div class="places-single-map"></div>' });
this["DDG"]["templates"]["region_filter"] = Handlebars.template(function(f, n, e, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    k = k || {}; var i = "",
        a, g, p = this,
        h = "function",
        j = this.escapeExpression;

    function c(u, t) { var r = "",
            s;
        r += "is-active ";
        s = e["if"].call(u, (u && u.hasActiveRegion), { hash: {}, inverse: p.program(2, b, t), fn: p.noop, data: t }); if (s || s === 0) { r += s } return r }

    function b(s, r) { return "has-inactive-region" }

    function q(u, t) { var r = "",
            s;
        r += '<div class="dropdown__switch switch js-region-filter-switch ';
        s = e["if"].call(u, (u && u.hasActiveRegion), { hash: {}, inverse: p.noop, fn: p.program(5, o, t), data: t }); if (s || s === 0) { r += s } r += '"><span class="switch__knob"></span></div>'; return r }

    function o(s, r) { return "is-on" } i += '<div class="dropdown dropdown--region ';
    a = e["if"].call(n, (n && n.hasRegion), { hash: {}, inverse: p.noop, fn: p.program(1, c, k), data: k }); if (a || a === 0) { i += a } i += '">';
    a = e["if"].call(n, (n && n.hasRegion), { hash: {}, inverse: p.noop, fn: p.program(4, q, k), data: k }); if (a || a === 0) { i += a } i += '<a class="dropdown__button dropdown__button js-dropdown-button">'; if (g = e.regionName) { a = g.call(n, { hash: {}, data: k }) } else { g = (n && n.regionName);
        a = typeof g === h ? g.call(n, { hash: {}, data: k }) : g } i += j(a) + "</a></div>"; return i });
this["DDG"]["templates"]["region_filter_modal"] = Handlebars.template(function(g, m, f, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    f = this.merge(f, g.helpers);
    i = i || {}; var h = "",
        b, k = f.helperMissing,
        q = this;

    function e(s, r) { return "modal--popover modal--popover--gray" }

    function a(s, r) { return "modal--popout" }

    function p(x, v) { var r = "",
            t, u, s;
        r += '<div class="modal__header"><span class="modal__header__title">';
        t = (u = f.l || (x && x.l), s = { hash: {}, data: v }, u ? u.call(x, "Filter by region", s) : k.call(x, "l", "Filter by region", s)); if (t || t === 0) { r += t } r += '</span><a href="#"  class="modal__close  js-modal-close">X</a></div>'; return r }

    function o(x, v) { var r = "",
            t, u, s;
        r += '<div class="modal__header"><input class="frm__input  js-region-filter-input" placeholder="';
        t = (u = f.l || (x && x.l), s = { hash: {}, data: v }, u ? u.call(x, "Search", s) : k.call(x, "l", "Search", s)); if (t || t === 0) { r += t } r += '" />';
        t = f["if"].call(x, (x && x.hasRegionOrSuggested), { hash: {}, inverse: q.noop, fn: q.program(8, n, v), data: v }); if (t || t === 0) { r += t } r += "</div>"; return r }

    function n(x, v) { var r = "",
            t, u, s;
        r += '<a class="modal__header__clear sep--before js-region-filter-clear">';
        t = (u = f.l || (x && x.l), s = { hash: {}, data: v }, u ? u.call(x, "Clear All", s) : k.call(x, "l", "Clear All", s)); if (t || t === 0) { r += t } r += "</a>"; return r }

    function c(x, v) { var r = "",
            t, u, s;
        r += '<div class="modal__body__input"><input class="frm__input  js-region-filter-input" placeholder="';
        t = (u = f.l || (x && x.l), s = { hash: {}, data: v }, u ? u.call(x, "Search", s) : k.call(x, "l", "Search", s)); if (t || t === 0) { r += t } r += '" /></div>'; return r } h += '<div class="modal modal--dropdown ';
    b = f["if"].call(m, (m && m.isPopover), { hash: {}, inverse: q.program(3, a, i), fn: q.program(1, e, i), data: i }); if (b || b === 0) { h += b } h += ' modal--dropdown--region has-header js-dropdown-popout"><div class="modal__overlay  js-modal-close"></div><div class="modal__wrap"><div class="modal__box">';
    b = f["if"].call(m, (m && m.isPopover), { hash: {}, inverse: q.program(7, o, i), fn: q.program(5, p, i), data: i }); if (b || b === 0) { h += b } h += '<div class="modal__body">';
    b = f["if"].call(m, (m && m.isPopover), { hash: {}, inverse: q.noop, fn: q.program(10, c, i), data: i }); if (b || b === 0) { h += b } h += '<ol class="modal__list  js-region-filter-list"></ol></div></div></div></div>'; return h });
this["DDG"]["templates"]["region_filter_modal_items"] = Handlebars.template(function(f, n, e, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    j = j || {}; var h = "",
        b, m = e.helperMissing,
        p = this,
        g = "function",
        i = this.escapeExpression;

    function c(x, v) { var r = "",
            t, u, s;
        r += '<div class="modal__list__header">';
        t = (u = e.lp || (x && x.lp), s = { hash: {}, data: v }, u ? u.call(x, "region filter", "Recent:", s) : m.call(x, "lp", "region filter", "Recent:", s)); if (t || t === 0) { r += t } r += '<a class="modal__list__clear js-region-filter-clear no-visited" href="#">';
        t = (u = e.l || (x && x.l), s = { hash: {}, data: v }, u ? u.call(x, "Clear", s) : m.call(x, "l", "Clear", s)); if (t || t === 0) { r += t } r += "</a></div>"; return r }

    function a(v, u) { var r = "",
            s, t;
        s = e["if"].call(v, (v && v.showDivider), { hash: {}, inverse: p.noop, fn: p.program(4, q, u), data: u }); if (s || s === 0) { r += s } r += '<li class="modal__list__item"><a class="modal__list__link  ';
        s = e["if"].call(v, (v && v.selected), { hash: {}, inverse: p.noop, fn: p.program(6, o, u), data: u }); if (s || s === 0) { r += s } r += ' js-region-filter-link" data-id="'; if (t = e.id) { s = t.call(v, { hash: {}, data: u }) } else { t = (v && v.id);
            s = typeof t === g ? t.call(v, { hash: {}, data: u }) : t } r += i(s) + '" data-index="' + i(((s = (u == null || u === false ? u : u.index)), typeof s === g ? s.apply(v) : s)) + '"><span class="region-flag__wrap region-flag__wrap--small has-region"><span class="flag-xs  flag-xs-'; if (t = e.countryCode) { s = t.call(v, { hash: {}, data: u }) } else { t = (v && v.countryCode);
            s = typeof t === g ? t.call(v, { hash: {}, data: u }) : t } r += i(s) + '"></span></span>'; if (t = e.name) { s = t.call(v, { hash: {}, data: u }) } else { t = (v && v.name);
            s = typeof t === g ? t.call(v, { hash: {}, data: u }) : t } r += i(s) + "</a></li>"; return r }

    function q(s, r) { return '<li class="modal__list__divider"></li>' }

    function o(s, r) { return "is-selected" } b = e["if"].call(n, (n && n.showListHeader), { hash: {}, inverse: p.noop, fn: p.program(1, c, j), data: j }); if (b || b === 0) { h += b } b = e.each.call(n, (n && n.regions), { hash: {}, inverse: p.noop, fn: p.program(3, a, j), data: j }); if (b || b === 0) { h += b } return h });
this["DDG"]["templates"]["related_searches"] = Handlebars.template(function(e, k, c, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    i = i || {}; var g = "",
        a, f = "function",
        h = this.escapeExpression,
        m = this;

    function b(r, q) { var n = "",
            o, p;
        n += '<li><a class="result__a js-related-searches-link" title="Search for '; if (p = c.text) { o = p.call(r, { hash: {}, data: q }) } else { p = (r && r.text);
            o = typeof p === f ? p.call(r, { hash: {}, data: q }) : p } n += h(o) + '" href="'; if (p = c.url) { o = p.call(r, { hash: {}, data: q }) } else { p = (r && r.url);
            o = typeof p === f ? p.call(r, { hash: {}, data: q }) : p } n += h(o) + '">'; if (p = c.text) { o = p.call(r, { hash: {}, data: q }) } else { p = (r && r.text);
            o = typeof p === f ? p.call(r, { hash: {}, data: q }) : p } n += h(o) + "</a></li>"; return n } g += '<div class="related-searches t-m"><p class="related-searches__title">Related Searches:</p><ol class="related-searches__list">';
    a = c.each.call(k, (k && k.related), { hash: {}, inverse: m.noop, fn: m.program(1, b, i), data: i }); if (a || a === 0) { g += a } g += "</ol></div>"; return g });
this["DDG"]["templates"]["report_ads_button"] = Handlebars.template(function(c, j, b, h, g) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    g = g || {}; var f = "",
        a, e, k, i = b.helperMissing;
    f += '<div class="report-ad"><span class="report-ad__start js-report-ad-start"><i class="ddgsi-comment ddgsi"></i><a href="#" class="report-ad__link">';
    a = (e = b.lp || (j && j.lp), k = { hash: {}, data: g }, e ? e.call(j, "ads", "Report Ad", k) : i.call(j, "lp", "ads", "Report Ad", k)); if (a || a === 0) { f += a } f += "</a></span></div>"; return f });
this["DDG"]["templates"]["report_image_modal"] = Handlebars.template(function(e, n, c, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    j = j || {}; var h = "",
        a, f, p, g = "function",
        i = this.escapeExpression,
        m = c.helperMissing,
        o = this;

    function b(u, t) { var q = "",
            r, s;
        q += '<option value="'; if (s = c.val) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.val);
            r = typeof s === g ? s.call(u, { hash: {}, data: t }) : s } q += i(r) + '">'; if (s = c.text) { r = s.call(u, { hash: {}, data: t }) } else { s = (u && u.text);
            r = typeof s === g ? s.call(u, { hash: {}, data: t }) : s } q += i(r) + "</option>"; return q } h += '<div class="modal modal--popover  modal--popover--gray feedback-modal"><a href="#" class="modal__overlay js-modal-close"></a><div class="modal__wrap modal__wrap--feedback"><div class="modal__box modal__box--feedback"><div class="modal__box__content js-feedback-form"><h5 class="feedback-modal__heading"><span class="feedback-modal__heading__main">';
    a = (f = c.lp || (n && n.lp), p = { hash: {}, data: j }, f ? f.call(n, "Report image modal", "Report this image", p) : m.call(n, "lp", "Report image modal", "Report this image", p)); if (a || a === 0) { h += a } h += '</span><a href="#" class="feedback-modal__close modal__close js-modal-close">X</a></h5><div class="frm frm--feedback"><div class="feedback-modal__image"><img src="' + i((f = c.imageProxy || (n && n.imageProxy), p = { hash: {}, data: j }, f ? f.call(n, (n && n.thumbnail), p) : m.call(n, "imageProxy", (n && n.thumbnail), p))) + '"></div><div class="frm__select feedback-modal__input feedback-modal__input--dropdown"><select class="js-feedback-dropdown">';
    a = c.each.call(n, (n && n.options), { hash: {}, inverse: o.noop, fn: o.program(1, b, j), data: j }); if (a || a === 0) { h += a } h += '</select></div><textarea class="frm__text feedback-modal__input feedback-modal__input--text js-feedback-comment"></textarea><a href="#" class="feedback-modal__submit is-disabled btn btn--primary--alt js-feedback-submit">';
    a = (f = c.l || (n && n.l), p = { hash: {}, data: j }, f ? f.call(n, "Submit", p) : m.call(n, "l", "Submit", p)); if (a || a === 0) { h += a } h += '</a></div></div><div class="modal__box__content js-feedback-success"><h5 class="feedback-modal__heading feedback-modal__heading--success">';
    a = (f = c.lp || (n && n.lp), p = { hash: {}, data: j }, f ? f.call(n, "feedback form", "Feedback Sent", p) : m.call(n, "lp", "feedback form", "Feedback Sent", p)); if (a || a === 0) { h += a } h += '<a href="#" class="feedback-modal__close modal__close js-modal-close">X</a></h5><p class="feedback-modal__message">';
    a = (f = c.l || (n && n.l), p = { hash: {}, data: j }, f ? f.call(n, "Thank you!", p) : m.call(n, "l", "Thank you!", p)); if (a || a === 0) { h += a } h += " ";
    a = (f = c.lp || (n && n.lp), p = { hash: {}, data: j }, f ? f.call(n, "feedback form", "We use feedback like this to improve DuckDuckGo. It really helps.", p) : m.call(n, "lp", "feedback form", "We use feedback like this to improve DuckDuckGo. It really helps.", p)); if (a || a === 0) { h += a } h += "</p></div></div></div></div>"; return h });
this["DDG"]["templates"]["result_extras"] = Handlebars.template(function(g, n, f, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    f = this.merge(f, g.helpers);
    k = k || {}; var i = "",
        a, q = this,
        h = "function",
        j = this.escapeExpression;

    function e(v, u) { var s = "",
            t;
        s += '<span class="result__icon ';
        t = f["if"].call(v, ((t = (v && v.icon)), t == null || t === false ? t : t.hide), { hash: {}, inverse: q.noop, fn: q.program(2, b, u), data: u }); if (t || t === 0) { s += t } s += '"><a href="' + j(((t = ((t = (v && v.icon)), t == null || t === false ? t : t.siteSearchUrl)), typeof t === h ? t.apply(v) : t)) + '" title="' + j(((t = ((t = (v && v.icon)), t == null || t === false ? t : t.title)), typeof t === h ? t.apply(v) : t)) + '" class="js-result-extras-site_search"><img ';
        t = f["if"].call(v, ((t = (v && v.icon)), t == null || t === false ? t : t.lazyLoad), { hash: {}, inverse: q.noop, fn: q.program(4, r, u), data: u }); if (t || t === 0) { s += t } s += 'src="' + j(((t = ((t = (v && v.icon)), t == null || t === false ? t : t.imageUrl)), typeof t === h ? t.apply(v) : t)) + '" height="16" width="16" title="' + j(((t = ((t = (v && v.icon)), t == null || t === false ? t : t.title)), typeof t === h ? t.apply(v) : t)) + '" class="result__icon__img js-lazyload-icons"></a></span>'; return s }

    function b(t, s) { return "is-hidden" }

    function r(t, s) { return "data-" }

    function p(t, s) { return 'target="_blank"' }

    function o(u, t) { var s; return j(((s = ((s = (u && u.link)), s == null || s === false ? s : s.prefix)), typeof s === h ? s.apply(u) : s)) }

    function c(v, u) { var s = "",
            t;
        s += "/" + j(((t = ((t = (v && v.link)), t == null || t === false ? t : t.path)), typeof t === h ? t.apply(v) : t)); return s } i += '<div class="result__extras__url">';
    a = f["if"].call(n, (n && n.icon), { hash: {}, inverse: q.noop, fn: q.program(1, e, k), data: k }); if (a || a === 0) { i += a } i += '<a href="' + j(((a = ((a = (n && n.link)), a == null || a === false ? a : a.href)), typeof a === h ? a.apply(n) : a)) + '" rel="noopener" ';
    a = f["if"].call(n, ((a = (n && n.link)), a == null || a === false ? a : a.targetBlank), { hash: {}, inverse: q.noop, fn: q.program(6, p, k), data: k }); if (a || a === 0) { i += a } i += ' class="result__url js-result-extras-url"><span class="result__url__domain">';
    a = f["if"].call(n, ((a = (n && n.link)), a == null || a === false ? a : a.prefix), { hash: {}, inverse: q.noop, fn: q.program(8, o, k), data: k }); if (a || a === 0) { i += a } i += j(((a = ((a = (n && n.link)), a == null || a === false ? a : a.domain)), typeof a === h ? a.apply(n) : a)) + '</span><span class="result__url__full">';
    a = f["if"].call(n, ((a = (n && n.link)), a == null || a === false ? a : a.path), { hash: {}, inverse: q.noop, fn: q.program(10, c, k), data: k }); if (a || a === 0) { i += a } i += "</span></a></div>"; return i });
this["DDG"]["templates"]["result_extras_ad"] = Handlebars.template(function(f, m, e, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    j = j || {}; var h = "",
        a, p = this,
        g = "function",
        i = this.escapeExpression;

    function c(u, t) { var r = "",
            s;
        r += '<span class="result__icon ';
        s = e["if"].call(u, ((s = (u && u.icon)), s == null || s === false ? s : s.hide), { hash: {}, inverse: p.noop, fn: p.program(2, b, t), data: t }); if (s || s === 0) { r += s } r += '"><img ';
        s = e["if"].call(u, ((s = (u && u.icon)), s == null || s === false ? s : s.lazyLoad), { hash: {}, inverse: p.noop, fn: p.program(4, q, t), data: t }); if (s || s === 0) { r += s } r += 'src="' + i(((s = ((s = (u && u.icon)), s == null || s === false ? s : s.imageUrl)), typeof s === g ? s.apply(u) : s)) + '" height="16" width="16" class="result__icon__img js-lazyload-icons"></span>'; return r }

    function b(s, r) { return "is-hidden" }

    function q(s, r) { return "data-" }

    function o(s, r) { return 'target="_blank"' }

    function n(u, t) { var r = "",
            s;
        r += "/" + i(((s = ((s = (u && u.link)), s == null || s === false ? s : s.path)), typeof s === g ? s.apply(u) : s)); return r } h += '<div class="result__extras__url">';
    a = e["if"].call(m, (m && m.icon), { hash: {}, inverse: p.noop, fn: p.program(1, c, j), data: j }); if (a || a === 0) { h += a } h += '<a href="' + i(((a = ((a = (m && m.link)), a == null || a === false ? a : a.href)), typeof a === g ? a.apply(m) : a)) + '" rel="noopener" ';
    a = e["if"].call(m, ((a = (m && m.link)), a == null || a === false ? a : a.targetBlank), { hash: {}, inverse: p.noop, fn: p.program(6, o, j), data: j }); if (a || a === 0) { h += a } h += ' class="result__url js-result-extras-url">' + i(((a = ((a = (m && m.link)), a == null || a === false ? a : a.domain)), typeof a === g ? a.apply(m) : a));
    a = e["if"].call(m, ((a = (m && m.link)), a == null || a === false ? a : a.path), { hash: {}, inverse: p.noop, fn: p.program(8, n, j), data: j }); if (a || a === 0) { h += a } h += "</a></div>"; return h });
this["DDG"]["templates"]["result_extras_unencrypted"] = Handlebars.template(function(f, n, e, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    j = j || {}; var h = "",
        b, m = e.helperMissing,
        g = "function",
        i = this.escapeExpression,
        q = this;

    function c(v, u) { var s, t, r;
        s = (t = e.include || (v && v.include), r = { hash: { icon: ((v && v.icon)) }, data: u }, t ? t.call(v, "result_icon_lock", r) : m.call(v, "include", "result_icon_lock", r)); if (s || s === 0) { return s } else { return "" } }

    function a(s, r) { return 'target="_blank"' }

    function p(u, t) { var r = "",
            s;
        r += "/" + i(((s = ((s = (u && u.link)), s == null || s === false ? s : s.path)), typeof s === g ? s.apply(u) : s)); return r }

    function o(x, v) { var r = "",
            t, u, s;
        r += '<div class="modal modal--popout modal--popout--bottom-right tooltip js-result-extras-url-tooltip"><div class="modal__box tooltip__box"><div href="#"  class="modal__close  js-result-extras-close">X</div><div class="modal__body tooltip__body"><p><strong>';
        t = (u = e.lp || (x && x.lp), s = { hash: {}, data: v }, u ? u.call(x, "Lock icon next to HTTP search result", "This webpage does not use a secure, encrypted, connection (HTTPS).", s) : m.call(x, "lp", "Lock icon next to HTTP search result", "This webpage does not use a secure, encrypted, connection (HTTPS).", s)); if (t || t === 0) { r += t } r += "</strong></p><p>";
        t = (u = e.lp || (x && x.lp), s = { hash: {}, data: v }, u ? u.call(x, "Lock icon next to HTTP search result", "That means information sent between your device and the webpage behind this link is at increased risk of being intercepted by a third party. In rare cases this includes passwords, or payment details.", s) : m.call(x, "lp", "Lock icon next to HTTP search result", "That means information sent between your device and the webpage behind this link is at increased risk of being intercepted by a third party. In rare cases this includes passwords, or payment details.", s)); if (t || t === 0) { r += t } r += "</p></div></div></div>"; return r } h += '<div class="result__extras__url">';
    b = e["if"].call(n, (n && n.icon), { hash: {}, inverse: q.noop, fn: q.program(1, c, j), data: j }); if (b || b === 0) { h += b } h += '<a href="' + i(((b = ((b = (n && n.link)), b == null || b === false ? b : b.href)), typeof b === g ? b.apply(n) : b)) + '" rel="noopener" ';
    b = e["if"].call(n, ((b = (n && n.link)), b == null || b === false ? b : b.targetBlank), { hash: {}, inverse: q.noop, fn: q.program(3, a, j), data: j }); if (b || b === 0) { h += b } h += ' class="result__url js-result-extras-url"><span class="result__url__prefix">' + i(((b = ((b = (n && n.link)), b == null || b === false ? b : b.prefix)), typeof b === g ? b.apply(n) : b)) + "</span>" + i(((b = ((b = (n && n.link)), b == null || b === false ? b : b.domain)), typeof b === g ? b.apply(n) : b));
    b = e["if"].call(n, ((b = (n && n.link)), b == null || b === false ? b : b.path), { hash: {}, inverse: q.noop, fn: q.program(5, p, j), data: j }); if (b || b === 0) { h += b } b = e["if"].call(n, (n && n.icon), { hash: {}, inverse: q.program(7, o, j), fn: q.noop, data: j }); if (b || b === 0) { h += b } h += "</a></div>"; return h });
this["DDG"]["templates"]["result_icon_lock"] = Handlebars.template(function(e, k, c, i, h) { this.compilerInfo = [4, ">= 1.0.0"];
    c = this.merge(c, e.helpers);
    h = h || {}; var g = "",
        a, f, n, m = this,
        j = c.helperMissing;

    function b(p, o) { return "is-hidden" } g += '<span class="result__icon ';
    a = c["if"].call(k, ((a = (k && k.icon)), a == null || a === false ? a : a.hide), { hash: {}, inverse: m.noop, fn: m.program(1, b, h), data: h }); if (a || a === 0) { g += a } g += ' js-result-extras-icon"><svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path class="lock" d="m10.1043723 3.8577266c-.5403886-.53142272-1.28129439-.8592123-2.09868378-.8592123-1.65398524 0-2.99480519 1.34214799-2.99480519 2.99777145h-.00395417v.99925715h1.96296111l-4.95381213 4.9590817v-4.9590817h.9982684v-.99925715c0-2.75937243 2.23469992-4.99628575 4.99134198-4.99628575 1.36869159 0 2.60871448.55144169 3.51042998 1.44447865zm2.9298958 3.1378163h.9610308v7.9940572h-8.94659344zm.7967496-3.8391033c.290582.29078144.2906695.76199285.0001955 1.05288217l-10.60699271 10.62215773c-.29007727.290492-.76072165.2908282-1.05121366.0007509-.00018538-.0001851-.00037066-.0003703-.00055584-.0005556-.29058204-.2907814-.29066953-.7619929-.0001955-1.0528822l10.60699271-10.6221577c.2900773-.29049201.7607217-.29082821 1.0512137-.00075094.0001853.00018512.0003706.00037033.0005558.00055564z" fill="#222"/></svg><div class="modal modal--popout modal--popout--bottom-right tooltip js-result-extras-tooltip"><div class="modal__box tooltip__box"><a href="#"  class="modal__close  js-result-extras-close">X</a><div class="modal__body tooltip__body"><p><strong>';
    a = (f = c.lp || (k && k.lp), n = { hash: {}, data: h }, f ? f.call(k, "Lock icon next to HTTP search result", "This webpage does not use a secure, encrypted, connection (HTTPS).", n) : j.call(k, "lp", "Lock icon next to HTTP search result", "This webpage does not use a secure, encrypted, connection (HTTPS).", n)); if (a || a === 0) { g += a } g += "</strong></p><p>";
    a = (f = c.lp || (k && k.lp), n = { hash: {}, data: h }, f ? f.call(k, "Lock icon next to HTTP search result", "That means information sent between your device and the webpage behind this link is at increased risk of being intercepted by a third party. In rare cases this includes passwords, or payment details.", n) : j.call(k, "lp", "Lock icon next to HTTP search result", "That means information sent between your device and the webpage behind this link is at increased risk of being intercepted by a third party. In rare cases this includes passwords, or payment details.", n)); if (a || a === 0) { g += a } g += "</p></div></div></div></span>"; return g });
this["DDG"]["templates"]["result_snippet"] = Handlebars.template(function(h, i, e, b, f) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, h.helpers);
    f = f || {}; var a = "",
        c, g = "function";
    a += '<div class="result__snippet js-result-snippet">';
    c = ((c = ((c = (i && i.model)), c == null || c === false ? c : c.organicResultSnippet)), typeof c === g ? c.apply(i) : c); if (c || c === 0) { a += c } a += "</div>"; return a });
this["DDG"]["templates"]["result_snippet_ad"] = Handlebars.template(function(f, m, e, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    j = j || {}; var h = "",
        a, g = "function",
        i = this.escapeExpression,
        n = this;

    function c(s, q, r) { var o = "",
            p;
        o += '<a href="' + i(((p = ((p = (r && r.model)), p == null || p === false ? p : p.href)), typeof p === g ? p.apply(s) : p)) + '" rel="noopener" ';
        p = e["if"].call(s, ((p = (r && r.model)), p == null || p === false ? p : p.targetBlank), { hash: {}, inverse: n.noop, fn: n.program(2, b, q), data: q }); if (p || p === 0) { o += p } o += ">";
        p = (typeof s === g ? s.apply(s) : s); if (p || p === 0) { o += p } o += "</a><br>"; return o }

    function b(p, o) { return 'target="_blank"' } h += '<div class="result__snippet js-result-snippet">';
    a = e.each.call(m, ((a = (m && m.model)), a == null || a === false ? a : a.snippets), { hash: {}, inverse: n.noop, fn: n.programWithDepth(1, c, j, m), data: j }); if (a || a === 0) { h += a } h += "</div>"; return h });
this["DDG"]["templates"]["safe_search"] = Handlebars.template(function(f, m, e, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    i = i || {}; var h = "",
        b, g, o, k = e.helperMissing,
        n = this;

    function c(t, s) { var q, r, p;
        q = (r = e.l || (t && t.l), p = { hash: {}, data: s }, r ? r.call(t, "Safe search blocked results for %s.", (t && t.searchTerm), p) : k.call(t, "l", "Safe search blocked results for %s.", (t && t.searchTerm), p)); if (q || q === 0) { return q } else { return "" } }

    function a(t, s) { var q, r, p;
        q = (r = e.l || (t && t.l), p = { hash: {}, data: s }, r ? r.call(t, "Safe search blocked some results for %s.", (t && t.searchTerm), p) : k.call(t, "l", "Safe search blocked some results for %s.", (t && t.searchTerm), p)); if (q || q === 0) { return q } else { return "" } } h += '<div class="msg msg--serp"><span class="msg__label js-safe-search">';
    b = e["if"].call(m, (m && m.noResults), { hash: {}, inverse: n.program(3, a, i), fn: n.program(1, c, i), data: i }); if (b || b === 0) { h += b } h += '</span><span class="msg__btn-wrap"><span class="msg__label">';
    b = (g = e.l || (m && m.l), o = { hash: {}, data: i }, g ? g.call(m, "Turn off:", o) : k.call(m, "l", "Turn off:", o)); if (b || b === 0) { h += b } h += '</span><a href="#" class="btn  msg__btn  js-safe-search-temp">';
    b = (g = e.l || (m && m.l), o = { hash: {}, data: i }, g ? g.call(m, "temporarily", o) : k.call(m, "l", "temporarily", o)); if (b || b === 0) { h += b } h += '</a><a href="/settings" class="btn  msg__btn  js-safe-search-perm">';
    b = (g = e.l || (m && m.l), o = { hash: {}, data: i }, g ? g.call(m, "permanently", o) : k.call(m, "l", "permanently", o)); if (b || b === 0) { h += b } h += "</a></span></div>"; return h });
this["DDG"]["templates"]["settings_dropdown"] = Handlebars.template(function(c, j, b, h, g) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    g = g || {}; var f = "",
        a, e, k, i = b.helperMissing;
    f += '<li class="zcm__item"><div class="dropdown dropdown--settings"><a class="zcm__link dropdown__button js-dropdown-button">';
    a = (e = b.lp || (j && j.lp), k = { hash: {}, data: g }, e ? e.call(j, "feedback form", "Settings", k) : i.call(j, "lp", "feedback form", "Settings", k)); if (a || a === 0) { f += a } f += "</a></div><li>"; return f });
this["DDG"]["templates"]["settings_dropdown_modal"] = Handlebars.template(function(f, s, q, j, v) { this.compilerInfo = [4, ">= 1.0.0"];
    q = this.merge(q, f.helpers);
    v = v || {}; var r = "",
        h, a, e, c = "function",
        b = this.escapeExpression,
        o = this,
        p = q.helperMissing;

    function n(y, x) { return "modal--popover modal--popover--gray" }

    function m(A, z) { var x = "",
            y;
        x += "modal--popout ";
        y = q["if"].call(A, (A && A.position), { hash: {}, inverse: o.program(6, i, z), fn: o.program(4, k, z), data: z }); if (y || y === 0) { x += y } return x }

    function k(B, A) { var x = "",
            y, z;
        x += "modal--popout--"; if (z = q.position) { y = z.call(B, { hash: {}, data: A }) } else { z = (B && B.position);
            y = typeof z === c ? z.call(B, { hash: {}, data: A }) : z } x += b(y); return x }

    function i(y, x) { return "modal--popout--bottom" }

    function g(y, x) { return "has-header" }

    function u(B, A) { var x = "",
            y, z;
        x += '<div class="modal__header"><span class="modal__header__title">'; if (z = q.header) { y = z.call(B, { hash: {}, data: A }) } else { z = (B && B.header);
            y = typeof z === c ? z.call(B, { hash: {}, data: A }) : z } x += b(y) + "</span>";
        y = q["if"].call(B, (B && B.isPopover), { hash: {}, inverse: o.noop, fn: o.program(11, t, A), data: A }); if (y || y === 0) { x += y } x += "</div>"; return x }

    function t(y, x) { return '<a href="#" class="modal__close  js-modal-close">X</a>' } r += '<div class="modal--dropdown modal--dropdown--settings modal ';
    h = q["if"].call(s, (s && s.isPopover), { hash: {}, inverse: o.program(3, m, v), fn: o.program(1, n, v), data: v }); if (h || h === 0) { r += h } r += " ";
    h = q["if"].call(s, (s && s.header), { hash: {}, inverse: o.noop, fn: o.program(8, g, v), data: v }); if (h || h === 0) { r += h } r += ' js-dropdown-popout"><div class="modal__overlay js-modal-close"></div><div class="modal__wrap"><div class="modal__box">';
    h = q["if"].call(s, (s && s.header), { hash: {}, inverse: o.noop, fn: o.program(10, u, v), data: v }); if (h || h === 0) { r += h } r += '<div class="modal__body" class="settings-dropdown js-settings-dropdown"><div class="settings-dropdown--section js-settings-dropdown-appearance"><h3 class="settings-dropdown--header">';
    h = (a = q.l || (s && s.l), e = { hash: {}, data: v }, a ? a.call(s, "Appearance", e) : p.call(s, "l", "Appearance", e)); if (h || h === 0) { r += h } r += ' <a href="#" class="settings-dropdown--header--link js-settings-dropdown-reset-appearance">Reset</a></h3></div><div class="settings-dropdown--section js-settings-dropdown-general"><h3 class="settings-dropdown--header">';
    h = (a = q.l || (s && s.l), e = { hash: {}, data: v }, a ? a.call(s, "General", e) : p.call(s, "l", "General", e)); if (h || h === 0) { r += h } r += ' <a href="#" class="settings-dropdown--header--link js-settings-dropdown-reset-general">Reset</a></h3></div><a href="/settings" class="settings-dropdown--button">';
    h = (a = q.lp || (s && s.lp), e = { hash: {}, data: v }, a ? a.call(s, "additional", "More", e) : p.call(s, "lp", "additional", "More", e)); if (h || h === 0) { r += h } r += " ";
    h = (a = q.lp || (s && s.lp), e = { hash: {}, data: v }, a ? a.call(s, "feedback form", "Settings", e) : p.call(s, "lp", "feedback form", "Settings", e)); if (h || h === 0) { r += h } r += "</a></div></div></div></div>"; return r });
this["DDG"]["templates"]["site_query"] = Handlebars.template(function(f, s, q, k, u) { this.compilerInfo = [4, ">= 1.0.0"];
    q = this.merge(q, f.helpers);
    u = u || {}; var r = "",
        h, a, e, p = q.helperMissing,
        c = "function",
        b = this.escapeExpression,
        o = this;

    function n(A, z) { var x, y, v;
        x = (y = q.l || (A && A.l), v = { hash: {}, data: z }, y ? y.call(A, "Showing results excluding", v) : p.call(A, "l", "Showing results excluding", v)); if (x || x === 0) { return x } else { return "" } }

    function m(A, z) { var x, y, v;
        x = (y = q.l || (A && A.l), v = { hash: {}, data: z }, y ? y.call(A, "Showing results from", v) : p.call(A, "l", "Showing results from", v)); if (x || x === 0) { return x } else { return "" } }

    function j(x, v) { return " msg__sites--mobile" }

    function i(A, y, z) { var v = "",
            x;
        v += '<span class="msg__site">';
        x = q["if"].call(A, (z && z.hasMultipleSites), { hash: {}, inverse: o.program(10, t, y), fn: o.program(8, g, y), data: y }); if (x || x === 0) { v += x } v += "</span>"; return v }

    function g(A, z) { var v = "",
            x, y;
        v += '<a href="/?q='; if (y = q.clearQuery) { x = y.call(A, { hash: {}, data: z }) } else { y = (A && A.clearQuery);
            x = typeof y === c ? y.call(A, { hash: {}, data: z }) : y } if (x || x === 0) { v += x } v += '" class="msg__clear-filter  js-site-query-clear">'; if (y = q.site) { x = y.call(A, { hash: {}, data: z }) } else { y = (A && A.site);
            x = typeof y === c ? y.call(A, { hash: {}, data: z }) : y } v += b(x) + ' <span class="msg__clear-filter-x">X</span></a>'; return v }

    function t(z, y) { var v, x; if (x = q.site) { v = x.call(z, { hash: {}, data: y }) } else { x = (z && z.site);
            v = typeof x === c ? x.call(z, { hash: {}, data: y }) : x } return b(v) } r += '<div class="msg  msg--serp  msg--site"><div class="msg__wrap"><span class="msg__text">';
    h = q["if"].call(s, (s && s.isExcluding), { hash: {}, inverse: o.program(3, m, u), fn: o.program(1, n, u), data: u }); if (h || h === 0) { r += h } r += ':</span><span class="msg__sites ';
    h = q["if"].call(s, (s && s.forceBreak), { hash: {}, inverse: o.noop, fn: o.program(5, j, u), data: u }); if (h || h === 0) { r += h } r += '">';
    h = q.each.call(s, (s && s.sites), { hash: {}, inverse: o.noop, fn: o.programWithDepth(7, i, u, s), data: u }); if (h || h === 0) { r += h } r += '<a href="/?q='; if (a = q.queryEncoded) { h = a.call(s, { hash: {}, data: u }) } else { a = (s && s.queryEncoded);
        h = typeof a === c ? a.call(s, { hash: {}, data: u }) : a } if (h || h === 0) { r += h } r += '" class="msg__all  js-site-query-clear"><span class="hide--screen-s">';
    h = (a = q.l || (s && s.l), e = { hash: {}, data: u }, a ? a.call(s, "All Results", e) : p.call(s, "l", "All Results", e)); if (h || h === 0) { r += h } r += '</span><span class="hide  show--screen-s">';
    h = (a = q.l || (s && s.l), e = { hash: {}, data: u }, a ? a.call(s, "All", e) : p.call(s, "l", "All", e)); if (h || h === 0) { r += h } r += "</span></a></span></div></div>"; return r });
this["DDG"]["templates"]["sitelinks"] = Handlebars.template(function(f, n, e, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    j = j || {}; var h = "",
        a, p = this,
        g = "function",
        i = this.escapeExpression,
        m = e.helperMissing;

    function c(x, v) { var r = "",
            t, u, s;
        t = e["if"].call(x, (v == null || v === false ? v : v.first), { hash: {}, inverse: p.noop, fn: p.program(2, b, v), data: v }); if (t || t === 0) { r += t } t = e["if"].call(x, (x && x.nextRow), { hash: {}, inverse: p.noop, fn: p.program(4, q, v), data: v }); if (t || t === 0) { r += t } r += '<td class="js-sitelink sitelinks_td highlight_d" id="'; if (u = e.id) { t = u.call(x, { hash: {}, data: v }) } else { u = (x && x.id);
            t = typeof u === g ? u.call(x, { hash: {}, data: v }) : u } r += i(t) + '" data-domain="'; if (u = e.domainName) { t = u.call(x, { hash: {}, data: v }) } else { u = (x && x.domainName);
            t = typeof u === g ? u.call(x, { hash: {}, data: v }) : u } r += i(t) + '"><div> <h3 class="sitelinks__title"><a class="result__a" href="'; if (u = e.targetUrl) { t = u.call(x, { hash: {}, data: v }) } else { u = (x && x.targetUrl);
            t = typeof u === g ? u.call(x, { hash: {}, data: v }) : u } r += i(t) + '">'; if (u = e.text) { t = u.call(x, { hash: {}, data: v }) } else { u = (x && x.text);
            t = typeof u === g ? u.call(x, { hash: {}, data: v }) : u } if (t || t === 0) { r += t } r += '</a></h3><div class="result__snippet sitelinks__snippet--unbold sitelinks__snippet--trim hide--screen-s">';
        t = (u = e.ellipsis || (x && x.ellipsis), s = { hash: {}, data: v }, u ? u.call(x, (x && x.snippet), 56, s) : m.call(x, "ellipsis", (x && x.snippet), 56, s)); if (t || t === 0) { r += t } r += "</div></div></td>";
        t = e["if"].call(x, (v == null || v === false ? v : v.last), { hash: {}, inverse: p.noop, fn: p.program(6, o, v), data: v }); if (t || t === 0) { r += t } return r }

    function b(s, r) { return '<tr class="sitelinks__tr">' }

    function q(s, r) { return '</tr><tr class="sitelinks__tr">' }

    function o(s, r) { return "</tr>" } h += '<div class="sitelinks"><table class="sitelinks__table">';
    a = e.each.call(n, (n && n.links), { hash: {}, inverse: p.noop, fn: p.program(1, c, j), data: j }); if (a || a === 0) { h += a } h += "</table></div>"; return h });
this["DDG"]["templates"]["spelling_dym"] = Handlebars.template(function(c, j, b, h, g) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    g = g || {}; var f = "",
        a, e, k, i = b.helperMissing;
    f += '<div id="did_you_mean" class="msg  msg--result  msg--spelling">';
    a = (e = b.l || (j && j.l), k = { hash: {}, data: g }, e ? e.call(j, "Did you mean %s?", '<a class="js-spelling-suggestion-link"></a>', k) : i.call(j, "l", "Did you mean %s?", '<a class="js-spelling-suggestion-link"></a>', k)); if (a || a === 0) { f += a } f += "</div>"; return f });
this["DDG"]["templates"]["spelling_irf"] = Handlebars.template(function(c, j, b, h, g) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    g = g || {}; var f = "",
        a, e, k, i = b.helperMissing;
    f += '<div id="did_you_mean" class="msg  msg--result  msg--spelling"><div class="msg__wrap"><span class="msg__line">';
    a = (e = b.l || (j && j.l), k = { hash: {}, data: g }, e ? e.call(j, "Including results for %s.", '<a class="js-spelling-suggestion-link"></a>', k) : i.call(j, "l", "Including results for %s.", '<a class="js-spelling-suggestion-link"></a>', k)); if (a || a === 0) { f += a } f += '</span><span class="msg__line  msg__line--small">';
    a = (e = b.l || (j && j.l), k = { hash: {}, data: g }, e ? e.call(j, "Search only for %s?", '<a class="js-spelling-recourse-link"></a>', k) : i.call(j, "l", "Search only for %s?", '<a class="js-spelling-recourse-link"></a>', k)); if (a || a === 0) { f += a } f += "</span></div></div>"; return f });
this["DDG"]["templates"]["spelling_nmrc"] = Handlebars.template(function(c, j, b, h, g) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    g = g || {}; var f = "",
        a, e, k, i = b.helperMissing;
    f += '<div id="did_you_mean" class="msg  msg--result  msg--spelling"><div class="msg__wrap"><span class="msg__line">';
    a = (e = b.l || (j && j.l), k = { hash: {}, data: g }, e ? e.call(j, "Not many results contain %s.", '<span class="js-spelling-suggestion-link"></span>', k) : i.call(j, "l", "Not many results contain %s.", '<span class="js-spelling-suggestion-link"></span>', k)); if (a || a === 0) { f += a } f += '</span><span class="msg__line  msg__line--small">';
    a = (e = b.l || (j && j.l), k = { hash: {}, data: g }, e ? e.call(j, "Search only for %s?", '<a class="js-spelling-recourse-link"></a>', k) : i.call(j, "l", "Search only for %s?", '<a class="js-spelling-recourse-link"></a>', k)); if (a || a === 0) { f += a } f += "</span></div></div>"; return f });
this["DDG"]["templates"]["twitter_easter_egg"] = Handlebars.template(function(b, j, a, h, g) { this.compilerInfo = [4, ">= 1.0.0"];
    a = this.merge(a, b.helpers);
    g = g || {}; var e = "",
        c, k, i = a.helperMissing,
        f = this.escapeExpression;
    e += '<img class="header__praise js-logo-praise" src="' + f((c = a.imageProxy || (j && j.imageProxy), k = { hash: {}, data: g }, c ? c.call(j, "/assets/spread/praise.png", k) : i.call(j, "imageProxy", "/assets/spread/praise.png", k))) + '" /><img class="header__avatar js-logo-avatar" src="' + f((c = a.imageProxy || (j && j.imageProxy), k = { hash: {}, data: g }, c ? c.call(j, (j && j.image), k) : i.call(j, "imageProxy", (j && j.image), k))) + '" />'; return e });
this["DDG"]["templates"]["user_location_button"] = Handlebars.template(function(a, o, m, f, s) { this.compilerInfo = [4, ">= 1.0.0"];
    m = this.merge(m, a.helpers);
    s = s || {}; var n = "",
        c, k = m.helperMissing,
        j = this;

    function i(A, z) { var u = "",
            x, y, v;
        u += '<a class="btn btn--primary user-loc-btn__btn user-loc-btn__btn--waiting user-loc-btn__btn--first">';
        x = (y = m.include || (A && A.include), v = { hash: { className: ("user-loc-btn__spinner spinner--dark") }, data: z }, y ? y.call(A, "spinner", v) : k.call(A, "include", "spinner", v)); if (x || x === 0) { u += x } u += '<span>Waiting For Location...</span></a><a class="btn user-loc-btn__btn js-user-loc-btn-cancel">Cancel</a>'; return u }

    function h(y, x) { var u = "",
            v;
        u += '<a class="btn ';
        v = m.unless.call(y, (y && y.highlightManualLocationButton), { hash: {}, inverse: j.noop, fn: j.program(4, g, x), data: x }); if (v || v === 0) { u += v } u += " user-loc-btn__btn user-loc-btn__btn--first js-user-loc-btn-";
        v = m["if"].call(y, (y && y.update), { hash: {}, inverse: j.program(8, b, x), fn: j.program(6, e, x), data: x }); if (v || v === 0) { u += v } u += '">';
        v = m["if"].call(y, (y && y.update), { hash: {}, inverse: j.program(12, r, x), fn: j.program(10, t, x), data: x }); if (v || v === 0) { u += v } u += "</a>";
        v = m["if"].call(y, (y && y.update), { hash: {}, inverse: j.noop, fn: j.program(14, q, x), data: x }); if (v || v === 0) { u += v } v = m["if"].call(y, (y && y.showManualLocationButton), { hash: {}, inverse: j.noop, fn: j.program(16, p, x), data: x }); if (v || v === 0) { u += v } return u }

    function g(v, u) { return "btn--primary" }

    function e(v, u) { return "update" }

    function b(v, u) { return "enable" }

    function t(v, u) { return "Update" }

    function r(v, u) { return "Enable Location" }

    function q(v, u) { return '<a class="btn user-loc-btn__btn js-user-loc-btn-clear">Clear</a>' }

    function p(y, x) { var u = "",
            v;
        u += '<a class="btn ';
        v = m["if"].call(y, (y && y.highlightManualLocationButton), { hash: {}, inverse: j.noop, fn: j.program(4, g, x), data: x }); if (v || v === 0) { u += v } u += ' user-loc-btn__btn js-user-loc-btn-manual">Set Manually</a>'; return u } n += '<div class="user-loc-btn">';
    c = m["if"].call(o, (o && o.waiting), { hash: {}, inverse: j.program(3, h, s), fn: j.program(1, i, s), data: s }); if (c || c === 0) { n += c } n += "</div>"; return n });
this["DDG"]["templates"]["user_location_cta"] = Handlebars.template(function(c, j, b, h, g) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    g = g || {}; var f = "",
        a, e, k, i = b.helperMissing;
    f += '<div class="user-loc-cta"><span class="user-loc-cta__dismiss ddgsi js-user-loc-cta-dismiss">×</span><div class="js-user-loc-cta-initial"><img class="user-loc-cta__icon" src="/assets/pul-cta.svg" /><p class="user-loc-title">Find results closer to you.</p><p class="user-loc-subtitle user-loc-subtitle--cta">Try enabling anonymous location for more accurate results. <span class="user-loc-link js-user-loc-cta-show-more">Show More</span></p><div class="user-loc-cta__more js-user-loc-cta-more is-hidden">';
    a = (e = b.include || (j && j.include), k = { hash: {}, data: g }, e ? e.call(j, "user_location_info", k) : i.call(j, "include", "user_location_info", k)); if (a || a === 0) { f += a } f += "</div></div></div>"; return f });
this["DDG"]["templates"]["user_location_error"] = Handlebars.template(function(f, m, e, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    j = j || {}; var h = "",
        a, g = "function",
        i = this.escapeExpression,
        p = this;

    function c(u, t) { var r = "",
            s;
        r += '<p class="user-loc-error__header ';
        s = e["if"].call(u, (u && u.small), { hash: {}, inverse: p.noop, fn: p.program(2, b, t), data: t }); if (s || s === 0) { r += s } r += '">Browser location unavailable.</p><p class="user-loc-error__text">Set your location manually, or ensure Location Services is enabled. <a class="user-loc-link js-user-loc-error-help" href="https://help.duckduckgo.com/results/local-results';
        s = e["if"].call(u, (u && u.isMobile), { hash: {}, inverse: p.noop, fn: p.program(4, q, t), data: t }); if (s || s === 0) { r += s } r += '/" target="_blank" rel="noopener">Help</a></p>';
        s = e["if"].call(u, (u && u.instructions), { hash: {}, inverse: p.noop, fn: p.program(6, o, t), data: t }); if (s || s === 0) { r += s } return r }

    function b(s, r) { return "user-loc-error__header--small" }

    function q(s, r) { return "-mobile" }

    function o(u, t) { var r = "",
            s;
        r += '<ol class="user-loc-error__fix">';
        s = e.each.call(u, (u && u.instructions), { hash: {}, inverse: p.noop, fn: p.program(7, n, t), data: t }); if (s || s === 0) { r += s } r += "</ol>"; return r }

    function n(t, s) { var r = "";
        r += '<li class="user-loc-error__fix__step">' + i((typeof t === g ? t.apply(t) : t)) + "</li>"; return r } h += '<div class="user-loc-error">';
    a = e["if"].call(m, (m && m.error), { hash: {}, inverse: p.noop, fn: p.program(1, c, j), data: j }); if (a || a === 0) { h += a } h += "</div>"; return h });
this["DDG"]["templates"]["user_location_filter_dropdown"] = Handlebars.template(function(c, j, b, h, g) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    g = g || {}; var f = "",
        a, e, k, i = b.helperMissing;
    f += '<div class="dropdown dropdown--location"><a href="#" class="dropdown__button js-dropdown-button">';
    a = (e = b.ellipsis || (j && j.ellipsis), k = { hash: {}, data: g }, e ? e.call(j, (j && j.buttonContent), 30, k) : i.call(j, "ellipsis", (j && j.buttonContent), 30, k)); if (a || a === 0) { f += a } f += "</a></div>"; return f });
this["DDG"]["templates"]["user_location_filter_modal"] = Handlebars.template(function(g, o, f, n, m) { this.compilerInfo = [4, ">= 1.0.0"];
    f = this.merge(f, g.helpers);
    m = m || {}; var j = "",
        b, h, i = "function",
        k = this.escapeExpression,
        r = this;

    function e(u, t) { return "modal--popover modal--popover--gray" }

    function a(x, v) { var t = "",
            u;
        t += "modal--popout ";
        u = f["if"].call(x, (x && x.position), { hash: {}, inverse: r.program(6, q, v), fn: r.program(4, s, v), data: v }); if (u || u === 0) { t += u } return t }

    function s(y, x) { var t = "",
            u, v;
        t += "modal--popout--"; if (v = f.position) { u = v.call(y, { hash: {}, data: x }) } else { v = (y && y.position);
            u = typeof v === i ? v.call(y, { hash: {}, data: x }) : v } t += k(u); return t }

    function q(u, t) { return "modal--popout--bottom" }

    function p(u, t) { return "has-header" }

    function c(u, t) { return '<a href="#"  class="modal__close  js-modal-close">X</a>' } j += '<div class="modal--dropdown modal--dropdown--'; if (h = f.key) { b = h.call(o, { hash: {}, data: m }) } else { h = (o && o.key);
        b = typeof h === i ? h.call(o, { hash: {}, data: m }) : h } j += k(b) + " modal ";
    b = f["if"].call(o, (o && o.isPopover), { hash: {}, inverse: r.program(3, a, m), fn: r.program(1, e, m), data: m }); if (b || b === 0) { j += b } j += " ";
    b = f["if"].call(o, (o && o.header), { hash: {}, inverse: r.noop, fn: r.program(8, p, m), data: m }); if (b || b === 0) { j += b } j += ' js-dropdown-popout"><div class="modal__overlay  js-modal-close"></div><div class="modal__wrap"><div class="modal__box modal__box--user-location">';
    b = f["if"].call(o, (o && o.isPopover), { hash: {}, inverse: r.noop, fn: r.program(10, c, m), data: m }); if (b || b === 0) { j += b } j += '<div class="modal__body modal__body--user-location"><p class="user-loc-filter-modal__title">Anonymous location enabled.</p><p class="user-loc-filter-modal__snippet">Location information is stored only on your device. <a class="user-loc-filter-modal__info  user-loc-link" href="https://help.duckduckgo.com/privacy/anonymous-localized-results/" target="_blank" rel="noopener">More Info</a></p><div class="user-loc-filter-modal__btn js-user-loc-filter-modal-btn"></div></div></div></div></div>'; return j });
this["DDG"]["templates"]["user_location_info"] = Handlebars.template(function(e, f, b, a, c) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, e.helpers);
    c = c || {}; return '<p class="user-loc-extra-info">DuckDuckGo is private by design. When you enable location, it is stored on your local device only. When you search, your device then sends it to us, we use it to improve results for that search, and then we promptly throw it away, such that you remain anonymous. Learn more about how we designed this technology to protect your privacy <a class="user-loc-link" href="https://help.duckduckgo.com/privacy/anonymous-localized-results/" target="_blank" rel="noopener">here</a>.</p>' });
this["DDG"]["templates"]["user_location_survey"] = Handlebars.template(function(f, m, e, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    i = i || {}; var h = "",
        b, g, o, k = e.helperMissing,
        n = this;

    function c(q, p) { return '<a class="user-loc-survey-reason__button btn js-user-loc-survey-retry-manual">Set Manually</a>' }

    function a(q, p) { return "-mobile" } h += '<form class="frm user-loc-survey"><p class="user-loc-subtitle">You\'ve chosen not to set your location.</p><p class="user-loc-title">Before you go, please help us understand why:</p><ul><li><input type="radio" name="user-loc-survey-reason" id="user-loc-survey-reason-privacy" class="js-user-loc-survey-reason" value="privacy"><label for="user-loc-survey-reason-privacy" class="user-loc-survey-reason__label">I\'m uncomfortable using my location.</label><div class="user-loc-survey-reason__extra is-hidden js-user-loc-survey-reason-extra js-user-loc-survey-privacy-extra">';
    b = (g = e.include || (m && m.include), o = { hash: {}, data: i }, g ? g.call(m, "user_location_info", o) : k.call(m, "include", "user_location_info", o)); if (b || b === 0) { h += b } h += '<a class="user-loc-survey-reason__button btn btn--primary js-user-loc-survey-retry-precise">Enable Location</a>';
    b = e["if"].call(m, (m && m.showManualLocationButton), { hash: {}, inverse: n.noop, fn: n.program(1, c, i), data: i }); if (b || b === 0) { h += b } h += '</div></li><li><input type="radio" name="user-loc-survey-reason" id="user-loc-survey-reason-good" class="js-user-loc-survey-reason" value="good"><label for="user-loc-survey-reason-good" class="user-loc-survey-reason__label">Results are good enough.</label></li><li><input type="radio" name="user-loc-survey-reason" id="user-loc-survey-reason-broken" class="js-user-loc-survey-reason" value="broken"><label for="user-loc-survey-reason-broken" class="user-loc-survey-reason__label">It\'s not working.</label><div class="user-loc-survey-reason__extra is-hidden js-user-loc-survey-reason-extra js-user-loc-survey-broken-extra"><p class="user-loc-extra-info">Set your location manually, or ensure Location Services is enabled. <a class="user-loc-link" href="https://help.duckduckgo.com/results/local-results';
    b = e["if"].call(m, (m && m.isMobile), { hash: {}, inverse: n.noop, fn: n.program(3, a, i), data: i }); if (b || b === 0) { h += b } h += '/" target="_blank" rel="noopener">Help</a></p><a class="user-loc-survey-reason__button btn btn--primary js-user-loc-survey-retry-precise">Enable Location</a>';
    b = e["if"].call(m, (m && m.showManualLocationButton), { hash: {}, inverse: n.noop, fn: n.program(1, c, i), data: i }); if (b || b === 0) { h += b } h += '</div></li><li><input type="radio" name="user-loc-survey-reason" id="user-loc-survey-reason-other" class="js-user-loc-survey-reason" value="other"><label for="user-loc-survey-reason-other" class="user-loc-survey-reason__label">Other.</label></li></ul><button type="submit" class="btn is-disabled js-user-loc-survey-button">Submit</button></form>'; return h });
this["DDG"]["templates"]["vertical_link_item"] = Handlebars.template(function(f, s, q, k, z) { this.compilerInfo = [4, ">= 1.0.0"];
    q = this.merge(q, f.helpers);
    z = z || {}; var r = "",
        h, a, e, p = q.helperMissing,
        b = this.escapeExpression,
        o = this,
        c = "function";

    function n(B, A) { return " highlight" }

    function m(B, A) { return " result--img" }

    function j(B, A) { return " result--url-above-snippet" }

    function i(D, C) { var A = "",
            B;
        A += '<div class="result__image js-result-image-wrapper">';
        B = q["if"].call(D, ((B = (D && D.model)), B == null || B === false ? B : B.image), { hash: {}, inverse: o.program(10, y, C), fn: o.program(8, g, C), data: C }); if (B || B === 0) { A += B } A += "</div>"; return A }

    function g(F, E) { var A = "",
            C, D, B;
        A += '<div class="result__image__img" style="background-image:url(' + b((D = q.imageProxy || (F && F.imageProxy), B = { hash: {}, data: E }, D ? D.call(F, ((C = (F && F.model)), C == null || C === false ? C : C.image), B) : p.call(F, "imageProxy", ((C = (F && F.model)), C == null || C === false ? C : C.image), B))) + ')"></div>'; return A }

    function y(C, B) { var A;
        A = q["if"].call(C, ((A = (C && C.model)), A == null || A === false ? A : A.fetch_image), { hash: {}, inverse: o.noop, fn: o.program(11, x, B), data: B }); if (A || A === 0) { return A } else { return "" } }

    function x(B, A) { return '<div class="result__image__plc ddgsi ddgsi-news js-result-img-placeholder"></div>' }

    function v(D, C) { var A = "",
            B;
        A += '<div class="result__snippet">';
        B = ((B = ((B = (D && D.model)), B == null || B === false ? B : B.excerpt)), typeof B === c ? B.apply(D) : B); if (B || B === 0) { A += B } A += "</div>"; return A }

    function u(B, A) { return "is-hidden" }

    function t(D, C) { var A = "",
            B;
        A += '<span class="result__extras__sep">|</span><span class="result__timestamp">' + b(((B = ((B = (D && D.model)), B == null || B === false ? B : B.relative_time)), typeof B === c ? B.apply(D) : B)) + "</span>"; return A } r += '<div class="result result--' + b(((h = ((h = (s && s.answer)), h == null || h === false ? h : h.id)), typeof h === c ? h.apply(s) : h)) + " ";
    h = q["if"].call(s, ((h = (s && s.model)), h == null || h === false ? h : h.highlighted), { hash: {}, inverse: o.noop, fn: o.program(1, n, z), data: z }); if (h || h === 0) { r += h } h = q["if"].call(s, ((h = (s && s.model)), h == null || h === false ? h : h.showImage), { hash: {}, inverse: o.noop, fn: o.program(3, m, z), data: z }); if (h || h === 0) { r += h } h = q["if"].call(s, (s && s.urlAboveSnippet), { hash: {}, inverse: o.noop, fn: o.program(5, j, z), data: z }); if (h || h === 0) { r += h } r += '" data-link="' + b(((h = ((h = (s && s.model)), h == null || h === false ? h : h.url)), typeof h === c ? h.apply(s) : h)) + '"><div class="result__body">';
    h = q["if"].call(s, ((h = (s && s.model)), h == null || h === false ? h : h.showImage), { hash: {}, inverse: o.noop, fn: o.program(7, i, z), data: z }); if (h || h === 0) { r += h } r += '<h2 class="result__title"><a class="result__a" rel="noopener" href="' + b(((h = ((h = (s && s.model)), h == null || h === false ? h : h.url)), typeof h === c ? h.apply(s) : h)) + '">';
    h = ((h = ((h = (s && s.model)), h == null || h === false ? h : h.title)), typeof h === c ? h.apply(s) : h); if (h || h === 0) { r += h } r += '</a><a class="result__check" rel="noopener" href="' + b(((h = ((h = (s && s.model)), h == null || h === false ? h : h.url)), typeof h === c ? h.apply(s) : h)) + '"><span class="result__check__tt">';
    h = (a = q.l || (s && s.l), e = { hash: {}, data: z }, a ? a.call(s, "Your browser indicates if you've visited this link", e) : p.call(s, "l", "Your browser indicates if you've visited this link", e)); if (h || h === 0) { r += h } r += "</span></a></h2>";
    h = q["if"].call(s, (s && s.urlAboveSnippet), { hash: {}, inverse: o.program(13, v, z), fn: o.noop, data: z }); if (h || h === 0) { r += h } r += '<div class="result__extras"><div class="result__extras__url"><span class="result__icon ';
    h = q["if"].call(s, (s && s.favicons), { hash: {}, inverse: o.program(15, u, z), fn: o.noop, data: z }); if (h || h === 0) { r += h } r += '">';
    h = (a = q.favicon || (s && s.favicon), e = { hash: {}, data: z }, a ? a.call(s, ((h = (s && s.model)), h == null || h === false ? h : h.favicon_url), e) : p.call(s, "favicon", ((h = (s && s.model)), h == null || h === false ? h : h.favicon_url), e)); if (h || h === 0) { r += h } r += '</span><a class="result__url" href="' + b(((h = ((h = (s && s.model)), h == null || h === false ? h : h.url)), typeof h === c ? h.apply(s) : h)) + '" rel="noopener">';
    h = ((h = ((h = (s && s.model)), h == null || h === false ? h : h.source)), typeof h === c ? h.apply(s) : h); if (h || h === 0) { r += h } r += "</a>";
    h = q["if"].call(s, ((h = (s && s.model)), h == null || h === false ? h : h.relative_time), { hash: {}, inverse: o.noop, fn: o.program(17, t, z), data: z }); if (h || h === 0) { r += h } r += "</div></div>";
    h = q["if"].call(s, (s && s.urlAboveSnippet), { hash: {}, inverse: o.noop, fn: o.program(13, v, z), data: z }); if (h || h === 0) { r += h } r += "</div></div>"; return r });
this["DDG"]["templates"]["vertical_links"] = Handlebars.template(function(c, k, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, f = "function",
        h = this.escapeExpression;
    g += '<div class="vertical vertical--'; if (e = b.id) { a = e.call(k, { hash: {}, data: i }) } else { e = (k && k.id);
        a = typeof e === f ? e.call(k, { hash: {}, data: i }) : e } g += h(a) + ' is-hidden"><div class="serp__top-right js-vertical-top-right"></div><div class="serp__bottom-right js-vertical-bottom-right"></div><div class="cw"><div class="serp__results"><div class="results--main"><div class="search-filters-wrap"><div class="search-filters js-vertical-filters"></div></div><div class="results--message"></div><div class="results js-vertical-results"></div></div><div class="results--sidebar js-vertical-sidebar"><div class="sidebar-modules js-vertical-sidebar-modules"></div></div></div></div></div>'; return g });
this["DDG"]["templates"]["vertical_load_more"] = Handlebars.template(function(c, k, b, i, h) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    h = h || {}; var g = "",
        a, e, m, j = b.helperMissing,
        f = "function";
    g += '<div class="result result--more js-result-more"><a class="result--more__btn btn btn--full">';
    a = (e = b.l || (k && k.l), m = { hash: {}, data: h }, e ? e.call(k, "Load More", m) : j.call(k, "l", "Load More", m)); if (a || a === 0) { g += a } g += "</a>"; if (e = b.loader) { a = e.call(k, { hash: {}, data: h }) } else { e = (k && k.loader);
        a = typeof e === f ? e.call(k, { hash: {}, data: h }) : e } if (a || a === 0) { g += a } g += "</div>"; return g });
this["DDG"]["templates"]["vertical_map"] = Handlebars.template(function(g, o, f, m, k) { this.compilerInfo = [4, ">= 1.0.0"];
    f = this.merge(f, g.helpers);
    k = k || {}; var i = "",
        b, h = "function",
        j = this.escapeExpression,
        n = f.helperMissing,
        s = this;

    function e(u, t) { return "is-hidden" }

    function a(x, v) { var t = "",
            u;
        t += "vertical--map--sidebar-" + j(((u = ((u = (x && x.model)), u == null || u === false ? u : u.sidebarLayout)), typeof u === h ? u.apply(x) : u)); return t }

    function r(u, t) { return '<div class="map-controls map-controls--topcenter"><div class="btn btn--primary is-hidden js-vertical-map-requery">Search this area</div></div>' }

    function q(x, v) { var t = "",
            u;
        t += '<div class="vertical--map__sidebar js-vertical-map-sidebar ';
        u = f["if"].call(x, ((u = (x && x.model)), u == null || u === false ? u : u.isLocalRequery), { hash: {}, inverse: s.noop, fn: s.program(8, p, v), data: v }); if (u || u === 0) { t += u } t += '"><div class="vertical--map__sidebar__wrapper"><div class="vertical--map__sidebar__results js-vertical-map-results-container"><div class="vertical--map__sidebar__results__inner js-vertical-map-results"></div>';
        u = f["if"].call(x, ((u = (x && x.model)), u == null || u === false ? u : u.isMoreAtVisible), { hash: {}, inverse: s.noop, fn: s.program(10, c, v), data: v }); if (u || u === 0) { t += u } t += '</div><div class="vertical--map__sidebar__detail js-vertical-map-detail"></div></div><div class="map-control vertical--map__sidebar__toggle js-vertical-map-toggle"><button class="btn ddgsi ddgsileft vertical--map__btn js-vertical-map-toggle-button">&lt;</button></div></div>'; return t }

    function p(u, t) { return "has-requery" }

    function c(z, y) { var t = "",
            v, x, u;
        t += '<div class="module__section module__section--simple js-vertical-map-more"><a class="module__link module__places-more__link module__places-more__link--' + j(((v = ((v = ((v = (z && z.model)), v == null || v === false ? v : v.meta)), v == null || v === false ? v : v.sourceName)), typeof v === h ? v.apply(z) : v)) + ' js-vertical-map-more-link"href="' + j(((v = ((v = ((v = (z && z.model)), v == null || v === false ? v : v.meta)), v == null || v === false ? v : v.sourceUrl)), typeof v === h ? v.apply(z) : v)) + '">';
        v = (x = f.favicon || (z && z.favicon), u = { hash: {}, data: y }, x ? x.call(z, ((v = ((v = (z && z.model)), v == null || v === false ? v : v.meta)), v == null || v === false ? v : v.sourceUrl), u) : n.call(z, "favicon", ((v = ((v = (z && z.model)), v == null || v === false ? v : v.meta)), v == null || v === false ? v : v.sourceUrl), u)); if (v || v === 0) { t += v } t += " " + j(((v = ((v = (z && z.model)), v == null || v === false ? v : v.moreAtExternalServiceText)), typeof v === h ? v.apply(z) : v)) + "</a></div>"; return t } i += '<div class="vertical vertical--map ';
    b = f.unless.call(o, ((b = (o && o.model)), b == null || b === false ? b : b.isMapExpanded), { hash: {}, inverse: s.noop, fn: s.program(1, e, k), data: k }); if (b || b === 0) { i += b } i += " ";
    b = f["if"].call(o, ((b = (o && o.model)), b == null || b === false ? b : b.isMapSidebarVisible), { hash: {}, inverse: s.noop, fn: s.program(3, a, k), data: k }); if (b || b === 0) { i += b } i += " vertical--map--" + j(((b = ((b = (o && o.model)), b == null || b === false ? b : b.nameId)), typeof b === h ? b.apply(o) : b)) + ' js-vertical-map"><div class="vertical--map__map js-vertical-map-map">';
    b = f["if"].call(o, ((b = (o && o.model)), b == null || b === false ? b : b.isLocalRequery), { hash: {}, inverse: s.noop, fn: s.program(5, r, k), data: k }); if (b || b === 0) { i += b } i += '<div class="map-controls map-controls--topright js-vertical-map-control-topright"></div></div>';
    b = f["if"].call(o, ((b = (o && o.model)), b == null || b === false ? b : b.isMapSidebarVisible), { hash: {}, inverse: s.noop, fn: s.program(7, q, k), data: k }); if (b || b === 0) { i += b } i += "</div>"; return i });
this["DDG"]["templates"]["vertical_separator"] = Handlebars.template(function(f, n, e, k, j) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    j = j || {}; var h = "",
        b, g = "function",
        i = this.escapeExpression,
        m = e.helperMissing,
        r = this;

    function c(t, s) { return "result--sep--hr" }

    function a(t, s) { return "has-pagenum" }

    function q(v, u) { var s = "",
            t;
        t = e["if"].call(v, (v && v.line), { hash: {}, inverse: r.program(8, o, u), fn: r.program(6, p, u), data: u }); if (t || t === 0) { s += t } s += "</div>"; return s }

    function p(x, v) { var s = "",
            t, u;
        s += '<div class="result__pagenum  result__pagenum--side">'; if (u = e.pageNumber) { t = u.call(x, { hash: {}, data: v }) } else { u = (x && x.pageNumber);
            t = typeof u === g ? u.call(x, { hash: {}, data: v }) : u } s += i(t) + "</div>"; return s }

    function o(y, x) { var s = "",
            u, v, t;
        s += '<div class="result__pagenum">';
        u = (v = e.l || (y && y.l), t = { hash: {}, data: x }, v ? v.call(y, "Page %s", (y && y.pageNumber), t) : m.call(y, "l", "Page %s", (y && y.pageNumber), t)); if (u || u === 0) { s += u } s += "</div>"; return s } h += '<div class="result result--sep ';
    b = e["if"].call(n, (n && n.line), { hash: {}, inverse: r.noop, fn: r.program(1, c, j), data: j }); if (b || b === 0) { h += b } h += " ";
    b = e["if"].call(n, (n && n.pageNumber), { hash: {}, inverse: r.noop, fn: r.program(3, a, j), data: j }); if (b || b === 0) { h += b } h += ' js-result-sep">';
    b = e["if"].call(n, (n && n.pageNumber), { hash: {}, inverse: r.noop, fn: r.program(5, q, j), data: j }); if (b || b === 0) { h += b } h += "</div>"; return h });
this["DDG"]["templates"]["web_attribution"] = Handlebars.template(function(c, m, b, j, i) { this.compilerInfo = [4, ">= 1.0.0"];
    b = this.merge(b, c.helpers);
    i = i || {}; var g = "",
        a, e, n, k = b.helperMissing,
        f = "function",
        h = this.escapeExpression;
    g += '<div id="powered_by" class="results--powered"><a href="https://help.duckduckgo.com/results/sources/" target="_blank">';
    a = (e = b.l || (m && m.l), n = { hash: {}, data: i }, e ? e.call(m, "In partnership with", n) : k.call(m, "l", "In partnership with", n)); if (a || a === 0) { g += a } g += '</a><a class="results--powered_badge-link" href="/?q='; if (e = b.src) { a = e.call(m, { hash: {}, data: i }) } else { e = (m && m.src);
        a = typeof e === f ? e.call(m, { hash: {}, data: i }) : e } g += h(a) + '" target="_blank"><span class="results--powered__badge  badge--'; if (e = b.src) { a = e.call(m, { hash: {}, data: i }) } else { e = (m && m.src);
        a = typeof e === f ? e.call(m, { hash: {}, data: i }) : e } g += h(a) + '"></span></a></div>'; return g });
this["DDG"]["templates"]["welcome_message"] = Handlebars.template(function(f, j, e, i, h) { this.compilerInfo = [4, ">= 1.0.0"];
    e = this.merge(e, f.helpers);
    h = h || {}; var g = "",
        b, k = this;

    function c(n, m) { return '<svg width="457px" height="158px" viewBox="0 0 457 158" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="welcome__bg"><title>welcome-message</title><g id="welcome-message" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Desktop" transform="translate(-538.000000, -22.000000)"><g id="SERP-Banner"><g id="Background"><g id="illustration" transform="translate(461.000000, 22.000000)"><g class="balloons"><g id="balloon" transform="translate(495.351351, 43.000000)"><path d="M22.952183,130.333535 L21.039501,130.333535 L21.039501,119.153931 C21.039501,116.719262 20.3327651,115.040411 19.5849064,113.266007 C18.7949688,111.39414 17.97921,109.456342 17.97921,106.635642 C17.97921,103.821631 18.7691476,101.8867 19.5323077,100.015788 C20.2591268,98.2385181 20.9438669,96.5577555 20.9438669,94.1192643 C20.9438669,91.6845951 20.237131,90.0057436 19.4892723,88.2303844 C18.7002911,86.359473 17.8835759,84.4226306 17.8835759,81.6019307 C17.8835759,78.7754977 18.7261123,76.8376998 19.5409148,74.9629663 C20.3107692,73.1895181 21.039501,71.5125777 21.039501,69.0836416 C21.039501,66.6394173 20.3758004,64.9576992 19.6719335,63.1766068 C18.9336383,61.308562 18.1704782,59.3764972 18.1704782,56.5672636 L18.1704782,50.0697164 L20.0831601,50.0697164 L20.0831601,56.5672636 C20.0831601,59.011488 20.7468607,60.6941616 21.4507277,62.4742984 C22.1890229,64.3423432 22.952183,66.274408 22.952183,69.0836416 C22.952183,71.9100747 22.1096466,73.8497836 21.2958004,75.7245171 C20.5249896,77.4970097 19.7962578,79.1729947 19.7962578,81.6019307 C19.7962578,84.0356443 20.5029938,85.7144959 21.2518087,87.4898551 C22.04079,89.361722 22.8565489,91.2966533 22.8565489,94.1192643 C22.8565489,96.9332755 22.0666112,98.8682068 21.3034511,100.737207 C20.5775884,102.517344 19.8918919,104.196196 19.8918919,106.635642 C19.8918919,109.071267 20.5986279,110.749163 21.3464865,112.523567 C22.1354678,114.395434 22.952183,116.333231 22.952183,119.153931 L22.952183,130.333535 Z" id="Fill-144" fill="#FFFFFF"></path><path d="M19.1268191,-3.55271368e-14 C8.03326403,-3.55271368e-14 -5.68434189e-14,8.02638182 -5.68434189e-14,19.1104329 L-5.68434189e-14,21.2125805 C-5.68434189e-14,29.2389623 4.01663202,33.2521533 8.03326403,37.2653442 L17.1185031,46.2472476 L16.7359667,46.2472476 C15.3970894,46.2472476 14.3451143,47.2983214 14.3451143,48.6360517 C14.3451143,49.973782 15.3970894,51.0248559 16.7359667,51.0248559 L22.4740125,51.0248559 C23.8128898,51.0248559 24.8648649,49.973782 24.8648649,48.6360517 C24.8648649,47.2983214 23.8128898,46.2472476 22.4740125,46.2472476 L21.1351351,46.2472476 L30.2203742,37.2653442 C34.2370062,33.2521533 38.2536383,29.2389623 38.2536383,21.2125805 L38.2536383,19.1104329 C38.2536383,8.02638182 30.2203742,-3.55271368e-14 19.1268191,-3.55271368e-14" id="Fill-146" fill="#C5D3DC"></path><path d="M18.5533971,41.0874307 C14.5367651,37.0742398 10.5201331,33.0610489 10.5201331,25.0346671 L10.5201331,21.0214762 C10.5201331,9.93742511 18.5533971,3.82208658 29.6469522,3.82208658 C30.1251227,3.82208658 30.6032931,3.82208658 31.0814636,3.91763875 C27.828948,1.43328247 23.8132723,1.0658141e-14 19.1272017,1.0658141e-14 C8.03364657,1.0658141e-14 0.000382536383,8.02638182 0.000382536383,19.1104329 L0.000382536383,21.2125805 C0.000382536383,29.2389623 4.01701455,33.2521533 8.03364657,37.2653442 L17.1188857,46.2472476 L21.1345613,46.2472476 L22.474395,44.9095173 L18.5533971,41.0874307 Z" id="Fill-148" fill="#FFFFFF"></path><path d="M31.5592516,15.6704594 C31.5592516,17.2948462 30.5072765,18.5370244 29.1683992,18.5370244 C27.8295218,18.5370244 26.7775468,17.2948462 26.7775468,15.6704594 L26.7775468,13.7594161 C26.7775468,12.1350293 27.8295218,10.8928512 29.1683992,10.8928512 C30.5072765,10.8928512 31.5592516,12.1350293 31.5592516,13.7594161 L31.5592516,15.6704594 Z" id="Fill-150" fill="#FFFFFF"></path></g><g id="balloon" transform="translate(400.000000, 8.000000)"><path d="M28.6902287,14.3333024 C28.6902287,6.02026413 22.6652807,0.000477760823 14.3451143,0.000477760823 C6.02494802,0.000477760823 -8.8817842e-15,6.02026413 -8.8817842e-15,14.3333024 L-8.8817842e-15,17.3900162 C-8.8817842e-15,23.4107581 3.06029106,26.4674718 6.02494802,29.5251411 L12.8149688,36.3103003 L15.8752599,36.3103003 L22.6652807,29.5251411 C25.7255717,26.4674718 28.6902287,23.5063102 28.6902287,17.3900162 L28.6902287,14.3333024 Z" id="Fill-152" fill="#C5D3DC"></path><path d="M14.3451143,7.10542736e-14 C15.3014553,7.10542736e-14 16.2577963,0.0955521645 17.2141372,0.286656494 C10.4241164,1.52883463 5.73804574,7.07086017 5.73804574,14.3328247 L5.73804574,17.3904939 C5.73804574,23.4102803 8.7983368,26.4679496 11.7629938,29.5256188 L17.2141372,34.9720922 L15.8752599,36.3098225 L12.8149688,36.3098225 L6.02494802,29.5256188 C2.96465696,26.4679496 -3.55271368e-15,23.5058325 -3.55271368e-15,17.3904939 L-3.55271368e-15,14.3328247 C-3.55271368e-15,6.11533853 6.02494802,7.10542736e-14 14.3451143,7.10542736e-14 M17.5966736,90.9656606 L15.6839917,90.9656606 C15.6839917,89.1989011 15.1627859,87.9624561 14.6109771,86.6533914 C14.010395,85.2277531 13.3887734,83.7533832 13.3887734,81.6015485 C13.3887734,79.4573579 13.9836175,77.9848991 14.5583784,76.5621273 C15.0872349,75.2501961 15.5883576,74.0118401 15.5883576,72.2364809 C15.5883576,70.4716324 15.0671518,69.2361429 14.515343,67.9270782 C13.9147609,66.5004844 13.2931393,65.025159 13.2931393,62.8733243 C13.2931393,60.7214895 13.9147609,59.2471196 14.515343,57.8205258 C15.0671518,56.5114611 15.5883576,55.2740606 15.5883576,53.5092121 C15.5883576,51.735764 15.0872349,50.4964524 14.5583784,49.1845212 C13.9836175,47.7607939 13.3887734,46.2892906 13.3887734,44.1451 L13.3887734,39.1763875 L15.3014553,39.1763875 L15.3014553,44.1451 C15.3014553,45.9175927 15.802578,47.1569042 16.3314345,48.4688355 C16.9052391,49.8935182 17.5010395,51.3650216 17.5010395,53.5092121 C17.5010395,55.6610469 16.8794179,57.1354168 16.2788358,58.5620106 C15.727027,59.8710752 15.2058212,61.1075203 15.2058212,62.8733243 C15.2058212,64.6391283 15.727027,65.8755733 16.2788358,67.1846379 C16.8794179,68.6102762 17.5010395,70.0846461 17.5010395,72.2364809 C17.5010395,74.3816269 16.9061954,75.8540858 16.3314345,77.2778131 C15.802578,78.5887888 15.3014553,79.8281003 15.3014553,81.6015485 C15.3014553,83.3673525 15.8226611,84.6037975 16.3744699,85.9119066 C16.975052,87.3385005 17.5966736,88.8138259 17.5966736,90.9666161" id="Fill-154" fill="#FFFFFF"></path><path d="M18.1704782,38.1252181 C18.1704782,37.1696964 17.4054054,36.3106825 16.3534304,36.3106825 L12.3367983,36.3106825 C11.3804574,36.3106825 10.5197505,37.0741443 10.5197505,38.1252181 L10.5197505,38.3163224 C10.5197505,39.2718441 11.2848233,40.1327691 12.3367983,40.1327691 L16.3534304,40.1327691 C17.3097713,40.1327691 18.1704782,39.3673962 18.1704782,38.3163224 L18.1704782,38.1252181 Z" id="Fill-156" fill="#C5D3DC"></path><path d="M22.952183,14.3333024 C22.952183,15.3843762 22.0914761,16.2443457 21.039501,16.2443457 C19.987526,16.2443457 19.1268191,15.3843762 19.1268191,14.3333024 L19.1268191,13.3777808 C19.1268191,12.3257515 19.987526,11.4667375 21.039501,11.4667375 C22.0914761,11.4667375 22.952183,12.3257515 22.952183,13.3777808 L22.952183,14.3333024 Z" id="Fill-158" fill="#FFFFFF"></path></g></g><g id="footer-illustration"><path d="M239.799,9.54 C239.268608,9.54015418 238.777621,9.26001237 238.507885,8.803331 C238.238149,8.34664962 238.229827,7.78142501 238.486,7.317 L241.785,1.317 C242.043303,0.847374382 242.532527,0.551225437 243.068386,0.540109607 C243.604246,0.528993776 244.10533,0.804599819 244.382886,1.26310961 C244.660443,1.72161939 244.672303,2.29337438 244.414,2.763 L241.114,8.763 C240.850546,9.24279964 240.346371,9.54070356 239.799,9.54 Z M223.299,10.74 C222.638432,10.7394359 222.055877,10.3070868 221.864,9.675 L219.864,3.075 C219.623756,2.28191911 220.071919,1.4442439 220.865,1.20400004 C221.658081,0.963756175 222.495756,1.41191912 222.736,2.205 L224.736,8.805 C224.873793,9.25972882 224.787991,9.7528526 224.504704,10.1343148 C224.221416,10.5157771 223.774147,10.7404626 223.299,10.74 Z M208.699,19.44 C208.455,19.44 208.207,19.38 207.978,19.254 L201.978,15.955 C201.257567,15.5532884 200.996668,14.6452545 201.393984,13.9223881 C201.791299,13.1995216 202.697727,12.9330957 203.423,13.326 L209.423,16.626 C210.022775,16.9562261 210.322824,17.6506754 210.152223,18.3137553 C209.981623,18.9768352 209.383675,19.4402435 208.699,19.44 Z" class="high-five" fill="#FFFFFF" fill-rule="nonzero"></path><g id="Clipped" transform="translate(177.000000, 66.000000)" fill="#FFB652" fill-rule="nonzero"><path d="M42.7,0.24 L33.1,2.14 L37.5,28.94 L7.1,28.94 C3.5,28.94 0.6,31.84 0.6,35.44 C0.6,39.04 3.5,41.94 7.1,41.94 L43.1,41.94 C46.7,41.94 49.6,39.04 49.6,35.44 C49.5,34.94 42.7,0.24 42.7,0.24" id="Path"></path></g><g id="Clipped" transform="translate(175.000000, 94.000000)" fill="#CC872A" fill-rule="nonzero"><path d="M27.5,7.44 C27.5,11.04 24.6,13.94 21,13.94 L7,13.94 C3.4,13.94 0.5,11.04 0.5,7.44 C0.5,3.84 3.4,0.94 7,0.94 L21,0.94 C24.6,0.94 27.5,3.84 27.5,7.44" id="Path"></path></g><g id="Clipped" transform="translate(89.000000, 134.000000)" fill="#DE5833" fill-rule="nonzero"><polygon id="Path" points="15.2 0.34 18.5 7.64 3.7 13.74 0.8 6.64"></polygon></g><g id="Clipped" transform="translate(77.000000, 139.000000)" fill="#DE5833" fill-rule="nonzero"><path d="M14.3,0.84 C17.3,-0.46 20.8,1.04 22.1,4.04 C23.4,7.04 21.9,10.54 18.9,11.84 L8.8,16.04 C5.8,17.34 2.3,15.84 1,12.84 C-0.3,9.84 1.2,6.34 4.2,5.04 L14.3,0.84 Z" id="Path"></path></g><g id="Clipped" transform="translate(167.000000, 55.000000)" fill="#230545" fill-rule="nonzero"><path d="M32.5,11.94 C32.5,18.04 27.6,22.94 21.5,22.94 L11.5,22.94 C5.4,22.94 0.5,18.04 0.5,11.94 C0.5,5.84 5.4,0.94 11.5,0.94 L21.5,0.94 C27.6,0.94 32.5,5.84 32.5,11.94" id="Path"></path></g><g id="Clipped" transform="translate(206.000000, 51.000000)" fill="#DE5833" fill-rule="nonzero"><polygon id="Path" points="0.986 2.47 8.832 0.907 11.758 15.619 3.912 17.18"></polygon></g><g id="Clipped" transform="translate(204.000000, 36.000000)" fill="#DE5833" fill-rule="nonzero"><path d="M12.8,5.34 C12.2,2.14 9,0.04 5.7,0.64 C2.5,1.24 0.3,4.44 1,7.64 L3.2,18.44 C3.8,21.64 7,23.74 10.2,23.14 C13.4,22.54 15.6,19.34 14.9,16.14 L12.8,5.34 Z" id="Path"></path></g><g id="Clipped" transform="translate(154.000000, 94.000000)" fill="#FFB652" fill-rule="nonzero"><path d="M44.494,17.915 L39.501,6.532 C38.303,3.436 34.509,0.94 31.214,0.94 L8.548,0.94 C4.555,0.94 0.56,4.935 0.56,9.428 C0.56,11.924 0.56,12.922 1.06,14.42 L13.541,44.974 L9.547,48.968 C7.35,51.164 4.854,56.057 4.055,59.951 C3.256,63.845 2.557,66.94 2.557,66.94 L40.5,66.94 L40.5,30.097 C44.294,27.5 45.493,22.407 44.494,17.915" id="Path"></path></g><g id="Clipped" transform="translate(162.000000, 94.000000)" fill="#FFFFFF" fill-rule="nonzero"><path d="M0.6,0.94 L8.4,8.84 C9.6,10.04 11.8,10.94 13.5,10.94 L18.3,10.94 C19.9,10.94 21.5,9.64 21.5,7.94 L21.5,0.94" id="Path"></path></g><g id="Clipped" transform="translate(152.000000, 50.000000)" fill="#230545" fill-rule="nonzero"><path d="M39.5,19.64 C39.5,29.74 31.3,37.94 21.2,37.94 L18.8,37.94 C8.7,37.94 0.5,29.74 0.5,19.64 L0.5,19.24 C0.5,9.14 8.7,0.94 18.8,0.94 L21.2,0.94 C31.3,0.94 39.5,9.14 39.5,19.24 L39.5,19.64 Z" id="Path"></path></g><g id="Clipped" transform="translate(120.000000, 58.000000)" fill="#230545" fill-rule="nonzero"><path d="M37.5,11.44 C37.5,5.34 32.5,0.34 26.5,0.34 C20.5,0.34 15.5,4.94 15.5,11.34 L15.5,17.24 C15.5,23.14 10.8,27.94 5.2,27.94 L0.5,27.94 C0.5,35.94 6.9,36.94 10.2,36.94 L19.7,36.94 C29,36.94 37.5,29.04 37.5,19.54 L37.5,11.44 L37.5,11.44 Z" id="Path"></path></g><g id="Clipped" transform="translate(165.000000, 62.000000)" fill="#DE5833" fill-rule="nonzero"><path d="M22.3,0.94 L14.9,0.94 C10.9,0.94 7.5,4.44 7.5,8.54 L7.5,11.94 L7.4,11.94 C6.8,10.64 5.5,9.74 4,9.74 C2,9.74 0.3,11.34 0.3,13.44 C0.3,15.34 1.7,16.84 3.5,17.04 L3.5,32.94 C3.5,35.14 5.3,36.94 7.5,36.94 L12.5,36.94 C14.7,36.94 16.5,35.14 16.5,32.94 L16.5,27.94 L19.7,27.94 C25.09,27.94 29.5,23.53 29.5,18.14 L29.5,8.54 C29.6,4.44 26.3,0.94 22.3,0.94" id="Path"></path></g><g id="Clipped" transform="translate(177.000000, 80.000000)" fill="#FFFFFF" fill-rule="nonzero"><path d="M0.5,0.94 L0.5,1.94 C0.5,4.14 2.4,5.94 4.6,5.94 L6.4,5.94 C8.6,5.94 10.5,4.24 10.5,1.94 L10.5,0.94 L0.5,0.94 Z" id="Path"></path></g><g id="Clipped" transform="translate(102.000000, 96.000000)" fill="#FFB652" fill-rule="nonzero"><path d="M62.7,2.74 C60.2,0.24 56,0.24 53.5,2.74 L27.4,28.14 L0.8,39.14 L5.2,49.84 L36.6,36.94 C36.8,36.84 37.1,36.74 37.3,36.64 C38.1,36.34 38.9,35.84 39.6,35.14 L62.7,12.04 C65.2,9.44 65.2,5.34 62.7,2.74" id="Path"></path></g><g id="Clipped" transform="translate(146.000000, 69.000000)" fill="#230545" fill-rule="nonzero"><path d="M46.5,2.699 C46.5,3.423 45.879,3.939 45.259,3.939 L44.741,3.939 C44.017,3.939 43.5,3.319 43.5,2.699 L43.5,2.181 C43.5,1.458 44.121,0.94 44.741,0.94 L45.259,0.94 C45.983,0.94 46.5,1.56 46.5,2.18 L46.5,2.699 Z M37.5,2.699 C37.5,3.423 36.879,3.939 36.259,3.939 L35.741,3.939 C35.017,3.939 34.5,3.319 34.5,2.699 L34.5,2.181 C34.5,1.458 35.121,0.94 35.741,0.94 L36.259,0.94 C36.983,0.94 37.5,1.56 37.5,2.18 L37.5,2.699 Z M10.5,91.94 L0.4,139.94 L16.8,143.94 L34.7,91.94 L10.5,91.94 Z" id="Shape"></path></g><g id="Clipped" transform="translate(202.000000, 12.000000)"></g><g id="Clipped" transform="translate(177.000000, 123.000000)" fill="#CC872A" fill-rule="nonzero"><path d="M9.5,0.94 L3.5,0.94 C1.8,0.94 0.5,1.94 0.5,3.94 L12.5,3.94 C12.5,1.94 11.2,0.94 9.5,0.94" id="Path"></path></g><g id="Clipped" transform="translate(247.000000, 13.000000)" fill="#FFC680" fill-rule="nonzero"><path d="M15.5,8.44 C16.2,4.94 14,1.44 10.4,0.74 C6.8,0.04 3.5,2.34 2.8,5.84 L0.4,17.74 C-0.3,21.24 1.9,24.74 5.5,25.44 C9.1,26.14 12.4,23.84 13.1,20.34 L15.5,8.44 Z" id="Path"></path></g><g id="Clipped" transform="translate(253.000000, 80.000000)" fill="#6FBF5C" fill-rule="nonzero"><path d="M54.5,13.94 C52.4,11.84 48.1,9.94 44.8,9.94 L27,9.94 C24.7,9.94 22.6,10.44 20.7,11.44 L10.1,0.84 L0,10.94 L12.3,23.14 L12.6,23.44 C12.6,23.74 12.5,24.14 12.5,24.44 L12.5,79.94 L55.5,79.94 L55.5,35.94 L62.5,41.94 L72.5,31.94 L54.5,13.94 L54.5,13.94 Z" id="Path"></path></g><g id="Clipped" transform="translate(242.000000, 30.000000)" fill="#FFC680" fill-rule="nonzero"><path d="M0.5,44.94 C-0.5,49.94 1.1,50.84 1.8,51.64 L11,60.94 L21.1,50.84 L11,41.14 L18.3,2.54 L8.5,0.54 L0.5,44.94 Z M40.4,19.94 L36.6,19.94 C34.1865299,19.94 31.8719093,20.8987472 30.1653283,22.6053283 C28.4587472,24.3119093 27.5,26.6265299 27.5,29.04 L27.5,43.64 C27.5,48.7762482 31.6637518,52.94 36.8,52.94 L40.5,52.94 C46,52.94 50.5,48.44 50.5,42.94 L50.5,30.04 C50.5,24.485 45.955,19.94 40.4,19.94 L40.4,19.94 Z" id="Shape"></path></g><g id="Clipped" transform="translate(289.000000, 69.000000)" fill="#230545" fill-rule="nonzero"><path d="M11.5,8.44 C11.5,11.44 9,13.94 6,13.94 C3,13.94 0.5,11.44 0.5,8.44 L0.5,6.44 C0.5,3.44 3,0.94 6,0.94 C9,0.94 11.5,3.44 11.5,6.44 L11.5,8.44 Z" id="Path"></path></g><g id="Clipped" transform="translate(279.000000, 66.000000)" fill="#FFC680" fill-rule="nonzero"><path d="M0.5,0.94 L0.5,24.94 C0.5,27.74 2.7,29.94 5.5,29.94 L11.5,29.94 C14.3,29.94 16.5,27.74 16.5,24.94 L16.5,0.94 L0.5,0.94 Z" id="Path"></path></g><g id="Clipped" transform="translate(260.000000, 42.000000)" fill="#230545" fill-rule="nonzero"><path d="M33.5,24.04 L33.5,30.15 C33.5,32.516 34.907,34.739 37.141,35.519 C40.89,36.828 44.5,33.945 44.5,30.341 L44.5,23.341 C45.5,21.841 46.5,19.94 46.5,17.74 L46.5,11.14 C46.5,6.64 42.8,2.94 38.3,2.94 C36.8,2.94 35.3,3.34 34.1,4.14 L33.5,3.64 C32.4,2.34 29.5,0.94 26.4,0.94 L11.9,0.94 C8.7,0.94 6.3,2.94 6.1,5.94 L5.916,5.94 C2.907,5.94 0.5,8.64 0.5,11.54 L0.5,11.74 C0.5,13.1191257 1.04785557,14.4417661 2.02304474,15.4169553 C2.99823391,16.3921444 4.32087425,16.94 5.7,16.94 L14.844,16.94 C16.95,16.94 18.755,15.84 19.658,14.04 C22.266,18.14 25.677,20.24 30.591,20.94 L33.5,24.04 L33.5,24.04 Z" id="Path"></path></g><g id="Clipped" transform="translate(290.000000, 61.000000)" fill="#FFC680" fill-rule="nonzero"><path d="M4.4,0.24 C6.8300529,0.24 8.8,2.2099471 8.8,4.64 C8.8,7.0700529 6.8300529,9.04 4.4,9.04 C1.9699471,9.04 0,7.0700529 0,4.64 C0,2.2099471 1.9699471,0.24 4.4,0.24" id="Path"></path></g><g id="Clipped" transform="translate(267.000000, 59.000000)" fill="#230545" fill-rule="nonzero"><path d="M19.5,0.94 L19.5,8.34 C19.5,11.34 16.986,12.94 14.071,12.94 L3.3,12.94 C2.55739383,12.94 1.84520287,13.2349992 1.32010101,13.760101 C0.794999153,14.2852029 0.5,14.9973938 0.5,15.74 L0.5,17.64 C0.5,23.54 4.32,27.94 9.749,27.94 L14.885,27.94 C20.077,27.94 24.5,23.44 24.5,17.64 L24.5,0.94 L19.5,0.94 Z" id="Path"></path></g><g id="Clipped" transform="translate(273.000000, 77.000000)" fill="#FFFFFF" fill-rule="nonzero"><path d="M0.5,0.94 L0.5,1.64 C0.5,3.84 2.6,4.94 4.7,4.94 L6.5,4.94 C8.7,4.94 10.5,3.74 10.5,1.64 L10.5,0.94 L0.5,0.94 Z" id="Path"></path></g><g id="Clipped" transform="translate(268.000000, 62.000000)" fill="#230545" fill-rule="nonzero"><path d="M12.5,2.699 C12.5,3.423 11.879,3.939 11.259,3.939 L10.741,3.939 C10.018,3.939 9.5,3.319 9.5,2.699 L9.5,2.181 C9.5,1.458 10.121,0.94 10.741,0.94 L11.259,0.94 C11.982,0.94 12.5,1.56 12.5,2.18 L12.5,2.699 Z M3.5,2.699 C3.5,3.423 2.879,3.939 2.259,3.939 L1.741,3.939 C1.018,3.939 0.5,3.319 0.5,2.699 L0.5,2.181 C0.5,1.458 1.121,0.94 1.741,0.94 L2.259,0.94 C2.982,0.94 3.5,1.56 3.5,2.18 L3.5,2.699 Z" id="Shape"></path></g><g id="Clipped" transform="translate(315.000000, 111.000000)" fill="#FFC680" fill-rule="nonzero"><path d="M23.5,19.74 C23.5,14.94 22.2,13.24 19.8,10.84 L10.5,0.94 L0.5,10.94 L13.5,24.14 L13.5,49.44 C11.5,50.54 9.5,52.74 9.5,55.14 L9.5,67.34 C9.5,70.94 13,73.94 16.6,73.94 C20.3,73.94 23.5,70.14 23.5,66.44 L23.5,19.74 L23.5,19.74 Z" id="Path"></path></g><g id="Clipped" transform="translate(299.000000, 115.000000)" fill="#5A9C4B" fill-rule="nonzero"><path d="M7,0.94 C3.4,0.94 0.5,3.84 0.5,7.44 L0.5,44.94 L9.5,44.94 L9.5,0.94 L7,0.94 Z" id="Path"></path></g></g></g></g></g></g></g></svg>' }

    function a(n, m) { return '<img class="welcome__bg" src="assets/welcome-illustration.svg" role="presentation"/>' } g += '<section class="welcome"><div class="welcome__inner-wrap"><h1 class="welcome__heading">You have the DuckDuckGo extension!</h1><p class="welcome__snippet">What does that mean?</p><ul><li>Your searches use DuckDuckGo for anonymity.</li><li>Trackers are blocked on websites you visit.</li><li>Websites are encrypted (HTTPS) when possible.</li></ul><a href="#" class="welcome__dismiss welcome__dismiss--x ddgsi js-welcome-dismiss">X</a></div>';
    b = e["if"].call(j, (j && j.inlineIllustration), { hash: {}, inverse: k.program(3, a, h), fn: k.program(1, c, h), data: h }); if (b || b === 0) { g += b } g += "</section>"; return g });