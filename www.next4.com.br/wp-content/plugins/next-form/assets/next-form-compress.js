let NextForm = !1;
! function(s) {
    NextForm = {
        debug: !1,
        errors: [],
        checkCaptcha: !1,
        getDataForm: !1,
        organicData: !1,
        nextLog: function(e, t) {
            this.debug && console.info("%c " + e, "color:#24ea00; background:#022f05; font-size:16px;", t)
        },
        nextWarning: function(e, t) {
            this.debug && console.warn("%c " + e, "color:#5f7b3c; background:#ececa3; font-size:14px;", t)
        },
        setLoadForm: function(e) {
            var t = new CustomEvent("setLoadForm", {
                detail: {
                    formulario: e
                }
            });
            e[0].dispatchEvent(t), this.nextLog("Executou setLoadForm", e)
        },
        setEndSuccessForm: function(e, t) {
            var a = new CustomEvent("setEndSuccessForm", {
                detail: {
                    formulario: t,
                    data: e
                }
            });
            t[0].dispatchEvent(a), this.nextLog("Executou setEndSuccessForm", [e, t])
        },
        setInitSuccessAJAX: function(e, t) {
            var a = new CustomEvent("setInitSuccessAJAX", {
                detail: {
                    formulario: t,
                    data: e
                }
            });
            t[0].dispatchEvent(a), this.nextLog("Executou setInitSuccessAJAX", [e, t])
        },
        setFinishSuccessForm: function(e, t) {
            var a = new CustomEvent("setFinishSuccessForm", {
                detail: {
                    formulario: t,
                    data: e
                }
            });
            t[0].dispatchEvent(a), this.nextLog("Executou setFinishSuccessForm", [e, t])
        },
        setFinishSuccessAJAX: function(e, t) {
            var a = new CustomEvent("setFinishSuccessForm", {
                detail: {
                    formulario: t,
                    data: e
                }
            });
            t[0].dispatchEvent(a), this.nextLog("Executou setFinishSuccessAJAX", [e, t])
        },
        setErrorPush: function(e, t, a) {},
        afterPostErrors: function(e, t) {
            var a = new CustomEvent("afterPostErrors", {
                detail: {
                    formulario: e,
                    error: t
                }
            });
            e[0].dispatchEvent(a), this.nextLog("Executou afterPostErrors", [e, t])
        },
        initTelInter: function(e) {
            e.mask("+55 (00) 0000-0000", {
                onKeyPress: function(e, t, a, o) {
                    e = e.match(/^\+55 \(\d{2}\) 9/) ? "+55 (00) 00000-0000" : "+55 (00) 0000-0000";
                    s(a).mask(e, o)
                }
            })
        },
        interSpmaskBehavior: function(e) {
            return 15 === e.replace(/\D/g, "").length ? "+55 (00) 00000-0000" : "+55 (00) 0000-00009"
        },
        maskoptionsinter: {
            onKeyPress: function(e, t, a, o) {
                a.mask(sysTel.spmaskBehavior.apply({}, arguments), o)
            }
        },
        removemaskinter: function(e) {
            return e.unmask()
        },
        loadLib: function() {
            s("[data-nxflag]").length && s("[data-nxflag]").each(function() {
                var a = s(s(this).data("nxflag")),
                    e = s(this).find(".uk-nav li a");
                NextForm.initTelInter(a), e.each(function() {
                    s(this).on("click", function(e) {
                        e.preventDefault();
                        var t = s(this).data("value"),
                            e = s(this).data("flag");
                        "BR" === e ? NextForm.initTelInter(a) : NextForm.removemaskinter(a), a.val(t + " "), s(this).closest("[data-flaglist]").find("button").html('<span uk-drop-parent-icon></span> <span class="fi fi-' + e.toLowerCase() + '"></span>'), UIkit.dropdown(s(this).closest("[data-nxflag]")).hide(0), a.focus()
                    })
                })
            }), s("[data-nxmoney]").length && s.each(s("[data-nxmoney]"), function(e, t) {
                let a = s(this);
                a.mask("#.##0,00", {
                    reverse: !0
                })
            }), s("[data-nxmask]").length && s.each(s("[data-nxmask]"), function(e, t) {
                let a = s(this);
                var o = a.data("nxmask");
                a.mask(o)
            }), s("[data-nxtel]").mask("(00) 0000-0000");

            function n(e) {
                return 11 === e.replace(/\D/g, "").length ? "(00) 00000-0000" : "(00) 0000-00009"
            }
            var e = {
                onKeyPress: function(e, t, a, o) {
                    a.mask(n.apply({}, arguments), o)
                }
            };
            s("[data-nxcel]").mask(n, e), NextForm.loadCaptcha(), NextForm.organic()
        },
        loadCaptcha: function(t) {
            $captha = s("[data-nxcaptcha]"), $captha && "undefined" != typeof $captha && (NextForm.checkCaptcha = !0, s.post($captha.data("url"), {
                action: "ajax_captcha"
            }, function(e) {
                $captha.attr("src", "data:image/png;base64, " + e.img), t && t.attr("disabled", !1)
            }))
        },
        tagManagerUtmOrigem: function() {
            var e = document.referrer;
            let t = '{"origem":""}';
            try {
                var a = new URL(e).hostname;
                t = '{"origem":"' + a.replace(/^www\./, "") + '"}'
            } catch (e) {
                t = '{"origem":"' + document.referrer + '"}'
            }
            return "crm_" + btoa(encodeURIComponent(t))
        },
        getCookie: function(e) {
            var a = e + "=",
                o = document.cookie.split(";");
            for (let t = 0; t < o.length; t++) {
                let e = o[t];
                for (;
                    " " == e.charAt(0);) e = e.substring(1);
                if (0 == e.indexOf(a)) return e.substring(a.length, e.length)
            }
            return ""
        },
        loadUtms: function() {
            var a = {
                utm_source: "traffic_source",
                utm_medium: "traffic_medium",
                utm_campaign: "traffic_campaign",
                utm_term: "traffic_value",
                src: "traffic_value",
                gclid: "gclid"
            };
            let o = {
                gclid: sessionStorage.getItem("gclid"),
                traffic_source: sessionStorage.getItem("traffic_source"),
                traffic_medium: sessionStorage.getItem("traffic_medium"),
                traffic_campaign: sessionStorage.getItem("traffic_campaign"),
                traffic_value: sessionStorage.getItem("traffic_value"),
                traffic_content: sessionStorage.getItem("traffic_content")
            };
            if (null !== sessionStorage.getItem("cf_url_captada") && "" != sessionStorage.getItem("cf_url_captada") || sessionStorage.setItem("cf_url_captada", window.location.href), null === o.traffic_source) {
                var e = window.location.search;
                const n = new URLSearchParams(e);
                Object.keys(a).forEach(function(e) {
                    var t = a[e];
                    o[t] = n.has(e) ? n.get(e) : "", 0 < o[t].length && sessionStorage.setItem(t, o[t])
                }), null === sessionStorage.getItem("cf_url_captada") && null === sessionStorage.getItem("traffic_source") ? sessionStorage.setItem("cf_url_captada", "Não foi possível rastrear a origem, pode ser AdBlock") : null !== sessionStorage.getItem("traffic_source") && sessionStorage.setItem("cf_check_data_url", "Origem de UTM passado por url")
            }
            NextForm.observerCookie()
        },
        observerCookie: function() {
            if (null === sessionStorage.getItem("traffic_source") || sessionStorage.getItem("traffic_source").length <= 1) {
                const a = new MutationObserver(() => {
                    var e = NextForm.getCookie("__trf.src"),
                        t = NextForm.getCookie("rdtrk");
                    e ? (sessionStorage.setItem("traffic_source", e), sessionStorage.setItem("cf_check_data_url", "Utm source detectado por rastreador RD"), t && (sessionStorage.setItem("client_tracking_id", t), sessionStorage.setItem("cf_check_data_url", "Utm source detectado pelo rastreador RD e client tracking id fornecido pelo RD")), NextForm.organic(), a.disconnect()) : null === sessionStorage.getItem("crm_source") && (sessionStorage.setItem("crm_source", NextForm.tagManagerUtmOrigem()), sessionStorage.setItem("cf_check_data_url", "Utm source detectado por tag manager referrer"), NextForm.organic())
                });
                a.observe(document, {
                    subtree: !0,
                    childList: !0,
                    attributes: !0
                })
            }
        },
        rdstation: function(e, t, o, n, r) {
            if (void 0 !== o.url) {
                let a = [];
                a.push({
                    name: "identificador",
                    value: t
                }), a.push({
                    name: "token_rdstation",
                    value: e
                }), s.each(n, function(e, t) {
                    a.push({
                        name: t.name,
                        value: s(t.selector).val()
                    })
                }), "undefined" != typeof RdIntegration ? RdIntegration.post(a, function() {
                    console.log("disparado", a), window.location.href = o.url
                }) : (console.log("rd não foi vinculado"), window.location.href = o.url)
            }
            if (void 0 !== o.url_view_inline) {
                let a = [];
                a.push({
                    name: "identificador",
                    value: t
                }), a.push({
                    name: "token_rdstation",
                    value: e
                }), s.each(n, function(e, t) {
                    a.push({
                        name: t.name,
                        value: s(t.selector).val()
                    })
                }), "undefined" != typeof RdIntegration ? RdIntegration.post(a, function() {
                    console.log("disparado", a), s(r).html(o.url_view_inline)
                }) : s(r).html(o.url_view_inline)
            }
        },
        organic: function() {
            let a = [];
            var o = sessionStorage.getItem("crm_source");
            s.each(s("[data-nextform]").find("[data-nextraffic]"), function(e, t) {
                name_field = s(this).data("nextraffic"), value_session = sessionStorage.getItem(name_field), name_field.includes("_source") && null === value_session && (value_session = o), a.push({
                    name: name_field,
                    value: value_session
                }), s(this).val(value_session)
            }), NextForm.organicData = a
        },
        sendAjax: function(e, t, o, a) {
            var n = o.data("nextform");
            NextForm.getDataForm.append("action", t), NextForm.getDataForm.append("sendForm", n.sendForm), s.ajax({
                type: o.prop("method"),
                data: NextForm.getDataForm,
                url: e,
                dataType: "JSON",
                contentType: !1,
                processData: !1,
                cache: !1,
                beforeSend: function() {
                    NextForm.setLoadForm(o), s.each(o.find("[data-nexterror]"), function(e, t) {
                        s(this).html(""), s(this).hide()
                    }), o.find("[data-nextgeneral]").html(""), o.find("[data-nextgeneral]").hide()
                },
                success: function(e) {
                    NextForm.setEndSuccessForm(e, o), NextForm.nextLog("tipo de data:", typeof e), NextForm.nextLog("retorno da data", e), void 0 !== e.errors_form ? (s.each(e.errors_form, function(e, t) {
                        var a = Object.keys(t);
                        o.find('[data-nexterror="' + a[0] + '"]').html(t[a[0]] + "<br />"), o.find('[data-nexterror="' + a[0] + '"]').show("slow"), NextForm.setErrorPush(o, a[0], t[a[0]])
                    }), o.find("[data-nextloader]").remove(), 1 == NextForm.checkCaptcha && NextForm.loadCaptcha(!1), NextForm.afterPostErrors(o, e.errors_form)) : void 0 !== e.error ? (o.find("[data-nextgeneral]").html(e.error), o.find("[data-nextgeneral]").show("slow"), 1 == NextForm.checkCaptcha && NextForm.loadCaptcha(!1), o.find("[data-nextloader]").remove(), NextForm.afterPostErrors(o, e.error)) : void 0 !== e.html && ((0 != a && "" != a ? o.find(a) : o).html(e.html), NextForm.loadLib()), NextForm.setFinishSuccessForm(e, o), o.find("[data-nextformsend]").removeClass("uk-disabled")
                },
                error: function(e, t, a) {
                    console.error("Erro encontrado no AJAX:", {
                        status: e.status,
                        statusText: e.statusText,
                        readyState: e.readyState,
                        responseText: e.responseText,
                        ajaxOptions: t,
                        thrownError: a
                    }), console.log("erros encontrados", [e, t, a])
                }
            })
        }
    }, s(document).on("change", "[data-selectenable]", function(e) {
        let t = s(this);
        var a = t.data("selectenable");
        let o = s(t.data("content"));
        a === t.val() && (console.log("agora vai"), o.show("slow"))
    }), s(document).on("change", "[data-nextturn]", function(e) {
        let t = s(this);
        var o = t.val();
        s.each(s("[data-turnon]"), function(e, t) {
            let a = s(this);
            a.data("turnon") == o && a.css({
                display: "block"
            }), a.data("turnoff") == o && a.css({
                display: "none"
            })
        })
    }), s(document).on("click", "[data-nexteventload]", function(e) {
        let t = s(this);
        t.closest("[data-nextsection]").append(s("<div/>", {
            class: "next-loader",
            "data-nextloader": !0
        }).append(s("<div/>", {
            class: "loader"
        })))
    }), s(document).on("click", "[data-nextformsend]", function(e) {
        e.preventDefault(), s("[data-nextform]").data("proccess", "submit"), s(this).addClass("uk-disabled"), s(this).closest("form").trigger("submit")
    }), s(document).on("submit", "[data-nextform]", function(e) {
        var t = new FormData(this),
            a = s(this);
        e.preventDefault();
        e = a.data("nextformurl");
        return NextForm.getDataForm = t, 0 == NextForm.errors.length && "submit" == a.data("proccess") && NextForm.sendAjax(e, "send_form", a, !1), !1
    }), s(document).on("click", "[data-nextbuttonajax]", function(e) {
        e.preventDefault();
        var t = s(this),
            a = t.data("nextbuttonajax"),
            o = s("" != a.contentselector ? a.contentselector : "#" + a.id_form),
            n = o.find("input,select,textarea"),
            e = 0;
        "" == a.contentselector && (e = o.data("nextform").sendForm);
        n = {
            action: a.action,
            id_form: a.id_form,
            sendForm: e,
            form: n.serializeArray()
        };
        s.ajax({
            method: "POST",
            data: n,
            url: t.prop("href"),
            dataType: "json",
            beforeSend: function() {
                NextForm.setLoadForm(o), s.each(o.find("[data-nexterror]"), function(e, t) {
                    s(this).html(""), s(this).hide()
                }), o.find("[data-nextgeneral]").html(""), o.find("[data-nextgeneral]").hide()
            },
            success: function(e) {
                NextForm.setInitSuccessAJAX(e, o), void 0 !== e.errors_form ? s.each(e.errors_form, function(e, t) {
                    var a = Object.keys(t);
                    o.find('[data-nexterror="' + a[0] + '"]').html(t[a[0]] + "<br />"), o.find('[data-nexterror="' + a[0] + '"]').show("slow")
                }) : void 0 !== e.error ? (o.find("[data-nextgeneral]").html(e.error), o.find("[data-nextgeneral]").show("slow")) : void 0 !== e.html && (o.html(e.html), NextForm.loadLib()), NextForm.setFinishSuccessAJAX(e, o)
            }
        })
    }), s(document).on("click", "[data-nextformnext]", function(e) {
        e.preventDefault();
        var t = s(this),
            a = t.closest("[data-nextform]");
        a.data("proccess", "nosubmit"), a.trigger("submit");
        e = a.data("nextformurl");
        return NextForm.getDataForm.append("nextpage", t.data("nextformnext")), 0 == NextForm.errors.length && NextForm.sendAjax(e, "nextform_next", a, "[data-nextsection]"), !1
    }), s(document).on("click", "[data-nextformprev]", function(e) {
        e.preventDefault();
        var t = s(this),
            a = t.closest("[data-nextform]");
        a.data("proccess", "nosubmit"), a.trigger("submit");
        e = a.data("nextformurl");
        return NextForm.getDataForm.append("prevpage", t.data("nextformprev")), 0 == NextForm.errors.length && NextForm.sendAjax(e, "nextform_prev", a, "[data-nextsection]"), !1
    }), s(document).on("click", "[data-nxclickcpc]", function(e) {
        e.preventDefault(), btn = s(this), btn.attr("disabled", !0), NextForm.loadCaptcha(btn)
    }), s(document).on("blur", "[data-nextcep]", function(e) {
        e.preventDefault(), el = s(this), fields = el.data("nextcep"), 3 < el.val().length && (fieldtratada = el.val().replace("-", ""), s.each(fields, function(e, t) {
            s(t.field).attr("disabled", !0)
        }), s.get("https://viacep.com.br/ws/" + fieldtratada + "/json/", function(a) {
            s.each(fields, function(e, t) {
                console.log("campo, viacep", [t.field, a]), s(t.field).val(a[t.cep]), s(t.field).attr("disabled", !1)
            })
        }))
    }), NextForm.loadUtms()
}(jQuery);