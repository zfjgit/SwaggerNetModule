const groupController = () => {
    console.debug('group controller...');
    const groupCtrls = {};

    const parentDiv = $('.opblock-tag-section:first').parent('span').parent('div');

    const tagDiv = $('.opblock-tag-section');
    for (let i = 0; i < tagDiv.length; i++) {
        const div = tagDiv[i];
        const parentSpan = $(div).parent('span');

        $(div).find('.opblock-tag').css('font-size', '16px');

        const pathSpan = $(div).find('.opblock-summary-path:first');
        const path = $(pathSpan).attr('data-path');

        const paths = path.split('/');
        
        let j = 0;
        for (const p of paths) {
            if (p.trim().length > 0) {
                j++;
            }
        }

        if (j > 2 ) {
            // Group
            const group = paths[1];
            if (groupCtrls[group] === undefined) {
                groupCtrls[group] = [];
            }
            groupCtrls[group].push(parentSpan);
        } else {
            // Common
            if (groupCtrls['Common'] === undefined) {
                groupCtrls['Common'] = [];
            }
            groupCtrls['Common'].push(parentSpan);
        }
    }

    for (const key of Object.keys(groupCtrls)) {
        const groupCtrl = groupCtrls[key];
        const group = $('<div class="opblock-tag-section opblock-group" data-group="' + key + '"></div>');
        const groupTitle = $('<h4 class="opblock-tag opblock-group-title" data-group="' + key + '" style="display:flex;justify-content:space-between;"></h4>');
        const groupTitleSpan = $('<span>' + key + '</span>');
        const groupExpandBtn = $('<button class="expand-group expand-operation" data-group="' + key + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="arrow" width="20" height="20" aria-hidden="true" focusable="false"><path d="M 17.418 14.908 C 17.69 15.176 18.127 15.176 18.397 14.908 C 18.667 14.64 18.668 14.207 18.397 13.939 L 10.489 6.109 C 10.219 5.841 9.782 5.841 9.51 6.109 L 1.602 13.939 C 1.332 14.207 1.332 14.64 1.602 14.908 C 1.873 15.176 2.311 15.176 2.581 14.908 L 10 7.767 L 17.418 14.908 Z"></path></svg></button>');

        const groupContent = $('<div class="opblock-tag-content opblock-group-content" id="group-content-' + key + '" show="true"></div>');

        groupTitle.append(groupTitleSpan);
        groupTitle.append(groupExpandBtn);

        group.append(groupTitle);

        for (const ctrl of groupCtrl) {
            groupContent.append(ctrl);
        }

        group.append(groupContent);

        parentDiv.append(group);
    }

    $('.opblock-group-title').on('click', function (e) {
        const group = $(e.currentTarget).attr('data-group');
        if ($('#group-content-' + group).attr('show') == 'true') {
            $('#group-content-' + group).attr('show', 'false');
            $('#group-content-' + group).slideUp();
            $(e.currentTarget).attr('title', '显示模块接口');
            $(e.currentTarget).find('.expand-group').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="arrow" width="20" height="20" aria-hidden="true" focusable="false"><path d="M17.418 6.109c.272-.268.709-.268.979 0s.271.701 0 .969l-7.908 7.83c-.27.268-.707.268-.979 0l-7.908-7.83c-.27-.268-.27-.701 0-.969.271-.268.709-.268.979 0L10 13.25l7.418-7.141z"></path></svg>');
        } else {
            $('#group-content-' + group).attr('show', 'true');
            $('#group-content-' + group).slideDown();
            $(e.currentTarget).attr('title', '隐藏模块接口');
            $(e.currentTarget).find('.expand-group').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="arrow" width="20" height="20" aria-hidden="true" focusable="false"><path d="M 17.418 14.908 C 17.69 15.176 18.127 15.176 18.397 14.908 C 18.667 14.64 18.668 14.207 18.397 13.939 L 10.489 6.109 C 10.219 5.841 9.782 5.841 9.51 6.109 L 1.602 13.939 C 1.332 14.207 1.332 14.64 1.602 14.908 C 1.873 15.176 2.311 15.176 2.581 14.908 L 10 7.767 L 17.418 14.908 Z"></path></svg>');
        }
    });

    $('.opblock-group-title').trigger('click');
}

const loadlayer = () => {
    console.debug('layer loading...');

    const layjs = document.createElement('script');
    layjs.type = 'text/javascript';
    layjs.src = 'https://cdn.bootcdn.net/ajax/libs/layer/3.5.0/layer.js';

    document.head.appendChild(layjs);

    layjs.onload = () => {
        layer.ready(() => {
            layer.msg('Welcome to WebApi!');

            const loadIdx = layer.load(1);
            groupController();
            layer.close(loadIdx);
        });
    }
}

const loadjq = () => {
    console.debug('jquery loading...');

    const jqjs = document.createElement('script');
    jqjs.type = 'text/javascript';
    jqjs.src = 'https://cdn.bootcdn.net/ajax/libs/jquery/1.9.1/jquery.js';
    document.head.appendChild(jqjs);

    jqjs.onload = () => {
        $(document).ready(() => {
            loadlayer();
        });
    };
}

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    loadjq();
} else {
    document.addEventListener("DOMContentLoaded", loadjq);
}

