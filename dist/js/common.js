$(document).ready(function () {
    var processData = getProgressData();
    var lastData = getLastData();
    var $processSideBar = $('#process-sidebar');
    var $card;
    var $panel;
    var $table = $('#table');
    var $accordion = $('#accordion');
    var $tableResult = $table.find('.table-result');
    var i;

    var $branchName = $('#branch-name');
    var $infoSuccess = $('#info-success');
    var $infoFailed = $('#info-failed');
    var $infoMissing = $('#info-missing');
    var $infoTotal = $('#info-total');

    var $searchInput = $('#search');
    var $groupByErrorCheckbox = $('#group-by-error');

    var cardHtml =
        '<div class="card" class="hidden"> ' +
        '<div class="card-block"> ' +
        '<h3 class="card-title">' +
        '<span class="card-user-name"></span>' +
        '<span class="pull-right"> ' +
        '<img class="card-user-avatar" src="" alt="">' +
        ' </span> ' +
        '</h3> ' +
        '<p class="card-text">Lorem ipsum dolor sit amet.</p> ' +
        '<div class="progress"> ' +
        '<div class="progress-bar progress-bar-striped active" ' +
        'role="progressbar" ' +
        'aria-valuenow="10" ' +
        'aria-valuemin="0" ' +
        'aria-valuemax="10" ' +
        'style="width:100%">' +
        'Testing <span class="card-process-data">135/1080</span> ' +
        '</div> ' +
        '</div> ' +
        '<a href="#" class="btn btn-danger stop-session" id="">Stop</a> ' +
        '</div> ' +
        '</div>';

    var panelHtml =
        '<div class="panel panel-default"> ' +
        '<div class="panel-heading"> ' +
        '<h4 class="panel-title"> ' +
        '<a data-toggle="collapse" href="" class="collapsed" aria-expanded="false"> ' +
        '<span class="icons"> <i class="ac ac-plus"></i> <i class="ac ac-minus"></i> </span> ' +
        '<span class="panel-text">Collapsible Group Item #1 </span> ' +
        '</a> ' +
        '</h4> ' +
        '</div> ' +
        '<div id="" class="panel-collapse collapse"> ' +
        '<div class="panel-body">Lorem ipsum dolor sit amet. </div> ' +
        '</div> ' +
        '</div>';

    var app = {
        sideBarProcess: {
            init: initSideBarProcess,
            update: initSideBarProcess
        },
        tableProcess: {
            init: initTableProcess
        },
        accordion: {
            init: createAccordion
        }
    };

    // init
    app.sideBarProcess.init();
    app.tableProcess.init();
    app.accordion.init();


    $groupByErrorCheckbox.on('change', function() {
        if ($(this)[0].checked) {
            $accordion.show();
            $table.hide();
        } else {
            $accordion.hide();
            $table.show();
        }
    });

    function createAccordion() {
        var info = lastData[0]['info'];
        var failed = lastData[0]['failed'];
        var reasonArr = [];

        for (i = 0; i < failed.length; i++) {
            if (reasonArr.indexOf(failed[i]['reason']) == -1) {
                reasonArr.push(failed[i]['reason']);
            }
        }

        // добавить соответсивте через объект. Соответствующая строка равна соответствующему id
        for (i = 0; i < reasonArr.length; i++) {
            $accordion.append(panelHtml);
            $panel = $accordion.find('.panel').last();
            $panel.find('.panel-text').text(reasonArr[i]).attr('data-reason', reasonArr[i]);
        }

        for (i = 0; i < failed.length; i++) {
            $panel = $accordion.find('[data-reason="' + failed[i].reason + '"]').closest('.panel');
            $panel.find('[data-toggle="collapse"]').attr('href', 1);
            $panel.find('.collapse').attr('id', 1);
        }

    }

    // filter event
    $searchInput.on('change', function () {
        var filter = $(this).val().toLowerCase().trim();
        var isCoincidence = false;

        if (filter) {
            $tableResult.find('tr').each(function () {
                var $that = $(this);

                $(this).find('.filter-text').each(function () {

                    if (!isCoincidence) {
                        if (~$(this).text().toLowerCase().indexOf(filter)) {
                            isCoincidence = true;
                            $that.show();
                        } else {
                            $that.hide();
                        }
                    }
                });

                isCoincidence = false;

            });
        } else {
            $tableResult.find("tr").show();
        }
    }).bind('focus', function () {
        $tableResult.find('tr').first().find('.filter-text').each(function () {
            $tableResult.closest('table').find('thead th').eq($(this).index()).addClass('active-filter');
        });
    }).bind('blur', function () {
        $tableResult.find('tr').first().find('.filter-text').each(function () {
            $tableResult.closest('table').find('thead th').eq($(this).index()).removeClass('active-filter');
        });
    });

    function initTableProcess() {
        var info = lastData[0]['info'];
        var failed = lastData[0]['failed'];

        // set branch name
        $branchName.text(lastData['branchName']);
        // set count sessions to info block
        if (info.hasOwnProperty('success')) {
            $infoSuccess.text(info['success']);
        } else {
            $infoSuccess.closest('p').hide();
        }

        if (info.hasOwnProperty('failed')) {
            $infoFailed.text(info['failed']);
        } else {
            $infoFailed.closest('p').hide();
        }

        if (info.hasOwnProperty('missing')) {
            $infoMissing.text(info['missing']);
        } else {
            $infoMissing.closest('p').hide();
        }

        if (info.hasOwnProperty('total')) {
            $infoTotal.text(info['total']);
        } else {
            $infoTotal.closest('p').hide();
        }

        for (i = 0; i < failed.length; i++) {
            $tableResult.append(
                '<tr>' +
                '<td>' + i + '</td>' +
                '<td class="filter-text">' + failed[i]['name'] + '</td>' +
                '<td>' + failed[i]['reason'] + '</td>' +
                '<td class="filter-text">' + getTags(failed[i]['tags']) + '</td>' +
                '<td>' + '<a href="">zip</a>' + '</td>' +
                '<td>' + '<a href="">play</a>' + '</td>' +
                '</tr>'
            );
        }
    }

    function initSideBarProcess(update) {
        var info;
        var name;
        var avatar;
        var id;

        if (!update) {

            for (i = 0; i < processData.length; i++) {
                name = processData[i]['authorLogin'];
                avatar = processData[i]['avatar'];
                info = processData[i]['info'];
                id = processData[i]['sessionId'];

                // add card to sidebar
                $processSideBar.append(cardHtml);

                $card = $processSideBar.find('.card').last();

                // set name
                $card.find('.card-user-name').text(name);
                // set avatar
                $card.find('.card-user-avatar').attr({
                        'src': avatar,
                        'alt': 'Developer Avatar | ' + name
                    }
                );

                // set progress bar settings
                $card.find('.progress-bar').attr({
                    'aria-valuenow': info['completedTests'],
                    'aria-valuemax': info['total']
                });

                // set progress bar text
                $card.find('.card-process-data').text(info['completedTests'] + '/' + info['total']);

                // set id-session for stop button
                $card.find('.stop-session').attr('id', id);

                // reset active if not first el
                if (i > 0) {
                    $card.find('.progress-bar').removeClass('active');
                    $card.find('.stop-session').removeClass('btn-danger').addClass('btn-warning');
                }

                // show card
                $card.removeClass('hidden');
            }

        } else {
            info = processData[0]['info'];
            $card = $('.card').first();
            if (processData[0].sessionId == $card.find('.stop-session').attr('id')) {
                // set progress bar settings
                $card.find('.progress-bar').attr({
                    'aria-valuenow': info['completedTests'],
                    'aria-valuemax': info['total']
                });

                // set progress bar text
                $card.find('.card-process-data').text(info['completedTests'] + '/' + info['total']);
            } else {
                activeProcessBlock($card.next('.card'));
                $card.remove();
                app.sideBarProcess.init(true);
            }
        }
    }

    function getTags(arr) {
        return arr.map(function (item) {
            return '<span class="chosen-tag">' + item + '</span>'
        }).join(' ');
    }

    function activeProcessBlock(el) {
        $(el).find('.progress-bar').addClass('active');
        $(el).find('.stop-session').removeClass('btn-warning').addClass('btn-danger');
    }
});