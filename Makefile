run::
	. venv/bin/activate; python src/manage.py runserver 0.0.0.0:8000;
run-prd::
	. venv/bin/activate; python src/manage.py runserver 0.0.0.0:8000 --settings=settings.production;
