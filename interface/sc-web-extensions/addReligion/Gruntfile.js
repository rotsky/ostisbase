module.exports = function (grunt) {
    const addReligionDirPath = '/home/rotsky/ostis-example-app-0.5.0/interface/sc-web-extensions/addReligion/';

    const scWebDirPath = '/home/rotsky/ostis-example-app-0.5.0/ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            addReligion: {
                src: [addReligionDirPath + 'src/*.js'],
                dest: addReligionDirPath + 'static/js/addReligion.js'
            },
        },
        copy: {
            addReligionJs: {
                cwd: addReligionDirPath + 'static/js/',
                src: 'addReligion.js',
                dest: clientJsDirPath + 'addReligion/',
                expand: true,
                flatten: true
            },
            addReligionCss: {
                cwd: addReligionDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            addReligionHtml: {
                cwd: addReligionDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            
        },
        watch: {
            addReligionJs: {
                files: addReligionDirPath + 'src/**',
                tasks: ['concat:addReligion', 'copy:addReligionJs'],
            },
            addReligionCss: {
                files: addReligionDirPath + 'static/css/**',
                tasks: ['copy:addReligionCss'],
            },
            addReligionHtml: {
                files: [addReligionDirPath + 'static/html/**'],
                tasks: ['copy:addReligionHtml'],
            },
        },
        exec: {
            updateCssAndJs: 'sh scripts/update_css_and_js.sh'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', ['concat', 'copy', 'exec:updateCssAndJs', 'watch']);
    grunt.registerTask('build', ['concat', 'copy', 'exec:updateCssAndJs']);

};
